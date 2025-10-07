"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPaymentResponseDetails } from "@/lib/api/requestBooking";

export default function PaymentResponsePage() {
  const params = useParams();
  const router = useRouter();

  const requestId = Array.isArray(params.requestId)
    ? params.requestId[0]
    : params.requestId;
  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (!requestId || !orderId) {
      router.push("/home");
      return;
    }

    getPaymentResponseDetails(requestId, orderId)
      .then((data) => setResponse(data))
      .catch((err) => {
        console.error("Error fetching payment response:", err);
        router.push("/home");
      });
  }, [requestId, orderId, router]);

  if (!response)
    return <div className="p-10 text-center">Loading response...</div>;

  const status = response.paymentStatus?.toLowerCase();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow">
        <h1
          className={`mb-4 text-center text-2xl font-bold ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status === "success" ? "PAYMENT SUCCESS ✅" : "PAYMENT FAILED ❌"}
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Thank you for booking Airport Porter Service.
          <br />A confirmation email has been sent to your registered email ID.
        </p>

        <table className="mx-auto mb-6 text-left text-sm text-gray-700">
          <tbody>
            <tr>
              <td className="pr-4 font-medium">Booking ID:</td>
              <td>{response.requestId}</td>
            </tr>
            <tr>
              <td className="pr-4 font-medium">Transaction Ref:</td>
              <td>{response.orderId}</td>
            </tr>
            <tr>
              <td className="pr-4 font-medium">Guest Name:</td>
              <td>{response.guestName}</td>
            </tr>
            <tr>
              <td className="pr-4 font-medium">Service Airport:</td>
              <td>{response.airportName}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            REBOOK
          </button>
        </div>
      </div>
    </div>
  );
}
