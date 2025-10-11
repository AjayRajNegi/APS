"use client";

import {
  getRazorPaymentDetails,
  updateRazorPaymentDetails,
  saveFailedTransactionDetails,
} from "@/lib/api/requestBooking";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentInProgressPage() {
  const router = useRouter();
  const params = useParams();

  const reqId = Array.isArray(params.requestId)
    ? params.requestId[0]
    : params.requestId;
  const ordId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  const requestId = decodeURIComponent(reqId || "");
  const orderId = decodeURIComponent(ordId || "");

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasChecked = useRef(false);

  // Route protection
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const fromServicePage = sessionStorage.getItem("fromServicePage");
    if (!fromServicePage) {
      router.replace("/");
    } else {
      setIsAuthorized(true);
      sessionStorage.removeItem("fromServicePage");
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;
    if (!requestId || !orderId) {
      router.push("/");
      return;
    }

    // Load Razorpay script
    const loadRazorpayScript = async () =>
      new Promise<boolean>((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const initPayment = async () => {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway. Please refresh the page.");
        return;
      }

      try {
        const data = await getRazorPaymentDetails(requestId, orderId);
        if (!data?.[0]) {
          router.push("/");
          return;
        }

        const info = data[0];

        if (info.PaymentStatus !== 4 && info.PaymentFailId === 0) {
          const options = {
            key: "rzp_live_kqH36Q7RmIIwDx",
            amount: info.amount,
            currency: info.currency,
            name: info.name,
            description: info.description,
            image:
              "https://www.airportporterservice.com/assert/images/airportlogo.png",
            order_id: info.orderId,
            prefill: {
              name: info.name,
              email: info.email,
              contact: info.contactNumber,
            },
            theme: { color: "#F37254" },
            handler: (response: any) => {
              window.dispatchEvent(
                new CustomEvent("payment.success", { detail: response }),
              );
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();

          razorpay.on("payment.failed", (response: any) => {
            window.dispatchEvent(
              new CustomEvent("payment.failedData", { detail: response }),
            );
          });
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error initializing Razorpay:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [isAuthorized, requestId, orderId, router]);

  // Success Handler
  useEffect(() => {
    const handleSuccess = async (event: any) => {
      const payload = {
        requestId,
        orderId,
        rzp_paymentid: event.detail.razorpay_payment_id,
        rzp_orderid: event.detail.razorpay_order_id,
        razorpay_signature: event.detail.razorpay_signature,
      };

      try {
        const res = await updateRazorPaymentDetails(payload);
        if (typeof res === "string" && res.toLowerCase() === "updated") {
          router.push(
            `/payment-response/${encodeURIComponent(requestId)}/${encodeURIComponent(orderId)}`,
          );
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Payment update failed:", error);
        router.push(
          `/payment-response/${encodeURIComponent(requestId)}/${encodeURIComponent(orderId)}`,
        );
      }
    };

    const handleFailed = async (event: any) => {
      const err = event.detail.error;
      const payload = {
        requestId,
        razorOrderId: orderId,
        code: err.code,
        description: err.description,
        source: err.source,
        step: err.step,
        reason: err.reason,
        order_id: err.order_id,
        payment_id: err.metadata?.payment_id,
      };

      try {
        const res = await saveFailedTransactionDetails(payload);
        if (typeof res === "string" && res.toLowerCase() === "updated") {
          router.push(
            `/payment-response/${encodeURIComponent(requestId)}/${encodeURIComponent(orderId)}`,
          );
        } else {
          router.push("/");
        }
      } catch {
        router.push(
          `/payment-response/${encodeURIComponent(requestId)}/${encodeURIComponent(orderId)}`,
        );
      }
    };

    window.addEventListener("payment.success", handleSuccess);
    window.addEventListener("payment.failedData", handleFailed);

    return () => {
      window.removeEventListener("payment.success", handleSuccess);
      window.removeEventListener("payment.failedData", handleFailed);
    };
  }, [requestId, orderId, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#f7f9fa]">
      {loading ? (
        <p>Initializing payment... please wait.</p>
      ) : (
        <p>Processing your payment...</p>
      )}
    </div>
  );
}
