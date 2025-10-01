"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  getAirportPorterDetail,
  GetPlanInculsionDetail,
} from "@/lib/api/requestBooking";
import { getDropdownList5 } from "@/lib/api/common";

type GuestDetail = {
  name: string;
  age?: number;
};

type ServiceRequestForm = {
  flightNo: string;
  flightHours: string;
  flightMinutes: string;
  plan: string;
  cardDisplayName: string;
  couponCode: string;
  guestDetails: GuestDetail[];
};

export default function ServiceRequest({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const requestID = decodeURIComponent(slug);

  const router = useRouter();

  const [requestDetails, setRequestDetails] = useState<any>(null);
  const [planList, setPlanList] = useState<any[]>([]);
  const [chkTerms, setChkTerms] = useState(false);
  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  const [priceWithGST, setPriceWithGST] = useState(0);
  const [perPersonPrice, setPerPersonPrice] = useState(0);
  const [totalVATAmount, setTotalVATAmount] = useState(0);
  const [perPersonVATAmount, setPerPersonVATAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState(0);
  const [couponType, setCouponType] = useState("");
  const [inclusionData, setInclusionData] = useState<any>(null);
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [pricingTable, setPricingTable] = useState();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceRequestForm>({
    defaultValues: {
      flightNo: "",
      flightHours: "0",
      flightMinutes: "0",
      plan: "",
      cardDisplayName: "",
      couponCode: "",
      guestDetails: [{ name: "" }],
    },
  });

  const selectedPlan = watch("plan");

  const { fields, append } = useFieldArray({
    control,
    name: "guestDetails",
  });

  // Fetches the requestDetails on page load
  useEffect(() => {
    if (!requestID) {
      router.push("/home");
      return;
    }

    getAirportPorterDetail(requestID, 1).then((res) => {
      if (res && res[0]) {
        setRequestDetails(res[0]);
        console.log("requestDetails", res[0]);
        bindPlan(res[0]);
      }
    });

    getDropdownList5("PlanList", "", "", requestID, "").then((res) => {
      const formattedList = res.map((item) => ({
        id: item.Id,
        name: item.Name,
        encyptID: item.EncyptID,
      }));
      setPlanList(formattedList);
    });
  }, [requestID]);

  useEffect(() => {
    if (selectedPlan) {
      GetPlanInculsionDetail(selectedPlan, requestID).then((res) => {
        setPricingTable(res[1]);
      });
      console.log(selectedPlan, "asdf ", requestID);
    }
  }, [selectedPlan, requestID]);

  console.log("Hello", planList, "Hello", pricingTable);

  const bindPlan = (details: any) => {
    if (!details) return;
    // Example logic — replace with real
    setPlanList(details.planOptions ?? []);
    setGrandTotalAmount(details.basePrice ?? 0);
    setPriceWithGST(details.priceWithGST ?? 0);
    setPerPersonPrice(details.perPersonPrice ?? 0);
    setTotalVATAmount(details.totalVAT ?? 0);
  };

  // === Form submit ===
  const onSubmit = (data: ServiceRequestForm) => {
    console.log("Form Submitted:", data);
    // call booking API, navigate, etc.
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Service Request
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Flight No */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Flight No
          </label>
          <input
            {...register("flightNo", { required: true })}
            className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {errors.flightNo && (
            <p className="mt-1 text-sm text-red-500">Flight No required</p>
          )}
        </div>

        {/* Flight Hours */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Flight Hours
          </label>
          <input
            type="number"
            {...register("flightHours")}
            className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Flight Minutes */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Flight Minutes
          </label>
          <input
            type="number"
            {...register("flightMinutes")}
            className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Plan */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Plan
          </label>
          <select
            {...register("plan", { required: true })}
            className="w-full rounded-lg border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="">Select</option>
            {planList.map((p) => (
              <option key={p.id} value={p.encyptID}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Coupon Code */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            {...register("couponCode")}
            className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Guest Details */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Guest Details
          </h2>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <input
                key={field.id}
                {...register(`guestDetails.${index}.name`)}
                placeholder="Guest Name"
                className="w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Add Guest
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="frs-fifth">
        <div id="price-break-up-content">
          <h5>Price Breakup</h5>
          <hr />
          <table>
            <tr>
              <td>Price Per Porter (Adult)</td>
              <td className="table-float-data">perPersonPrice</td>
            </tr>
            <tr>
              <td>No. of Porter (Adult)</td>
              <td className="table-float-data">numberofGuest</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td className="table-float-data">currentTotalAmount</td>
            </tr>
            <tr>
              <td>GST (18%)</td>
              <td className="table-float-data">totalVATAmount</td>
            </tr>
            <tr>
              <td>Discount couponCode</td>
              <td className="table-float-data">discountAmount</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td className="table-float-data">grandTotalAmount</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
