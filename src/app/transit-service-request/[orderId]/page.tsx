"use client";

export const dynamic = "force-dynamic";

import {
  getAirportPorterDetail,
  GetPlanInculsionDetailForTransit,
  savePorterRequestDetails,
} from "@/lib/api/requestBooking";
import React, { useEffect, useState } from "react";
import { getDropdownList4 } from "@/lib/api/common";
import { ArrowRight, InfoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

interface AirportDetails {
  RequestId: string;
  AirportCode: string;
  Terminal: string;
  ServiceType: string;
  PhoneNumber: string;
  TravelDate: string;
  AirportName: string;
  City: string;
  Country: string;
  Origin: string;
  OriginAirportName: string;
  Destination: string;
  DestinationAirportName: string;
  AirportType: string;
  TravelSector: string;
}

interface FormValues {
  originFlightDate: string;
  originFlightNo: string;
  originFlightHours: string;
  originFlightMinutes: string;
  destinationFlightDate: string;
  destinationFlightNo: string;
  destinationFlightHours: string;
  destinationFlightMinutes: string;
  plan: string;
  cardDisplayName?: string;
  couponCode?: string;
  guestDetails: {
    title: string;
    firstName: string;
    lastName: string;
    age: string;
    pnr: string;
    phoneNumber: string;
    mobileCode: string;
    email: string;
  }[];
}

export default function ServiceRequest() {
  const params = useParams();
  const orderId = Array.isArray(params.orderId)
    ? params.orderId.join("/")
    : params.orderId || "";
  const requestID = decodeURIComponent(orderId || "");
  const router = useRouter();

  const [planList, setPlanList] = useState<any[]>([]);
  const [inclusionData, setInclusionData] = useState<any>(null);
  const [isInclusionOpen, setIsInclusionOpen] = useState(false);
  const [discountDivDisable] = useState(false);
  const [details, setDetails] = useState<AirportDetails | null>(null);
  const [priceList, setPriceList] = useState<any[]>([]);

  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  const [perPersonPrice, setPerPersonPrice] = useState(0);
  const [totalVATAmount, setTotalVATAmount] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [couponValue, setCouponValue] = useState(0);

  const hours = Array.from({ length: 24 }).map((_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      originFlightNo: "",
      originFlightHours: "00",
      originFlightMinutes: "00",
      destinationFlightNo: "",
      destinationFlightHours: "00",
      destinationFlightMinutes: "00",
      plan: "",
      cardDisplayName: "",
      couponCode: "",
      guestDetails: [
        {
          title: "",
          firstName: "",
          lastName: "",
          age: "",
          pnr: "",
          phoneNumber: "",
          mobileCode: "",
          email: "",
        },
      ],
    },
  });

  const selectedPlan = watch("plan");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guestDetails",
  });

  const guestDetails = useWatch({
    control,
    name: "guestDetails",
  });

  // Route protection
  useEffect(() => {
    const hasRun = sessionStorage.getItem("serviceEffectRan");
    if (hasRun) return;

    sessionStorage.setItem("serviceEffectRan", "true");

    const fromServicePage = sessionStorage.getItem("fromForm");
    if (!fromServicePage) {
      router.replace("/");
    } else {
      sessionStorage.removeItem("fromForm");
      sessionStorage.setItem("fromServicePage", "true");
    }
  }, [router]);

  // Fetch initial data
  useEffect(() => {
    if (!requestID) {
      router.push("/home");
      return;
    }
    getAirportPorterDetail(requestID, 2).then((res) => {
      if (res && res[0]) {
        setDetails(res[0]);
      }
    });
  }, [requestID, router]);

  // Fetches airport
  useEffect(() => {
    if (!details) return;
    getDropdownList4(
      "TransitPlanList",
      `${details?.Country}`,
      `${details?.AirportCode}`,
      `${details?.AirportType}`,
    ).then((res: any) => {
      const formatted = (res || []).map((item: any) => ({
        id: item.Id,
        name: item.Name,
        encyptID: item.EncyptID,
      }));
      setPlanList((prev) => (formatted.length ? formatted : prev));
    });
    console.log(details.AirportType, details.AirportName);
  }, [details]);

  // Fetches inclusion data and price list
  useEffect(() => {
    if (selectedPlan && details) {
      GetPlanInculsionDetailForTransit(selectedPlan).then((res) => {
        try {
          if (Array.isArray(res) && res.length > 0) {
            const data = res[0];
            setInclusionData({
              Inclusion: data.Inclusion ?? "",
            });
            setPriceList(res);
            if (data.Price) {
              setPerPersonPrice(data.Price);
            }
            if (data.PriceWithGST) {
              setCurrentTotalAmount(data.PriceWithGST);
            }
          } else {
            console.warn("Unexpected plan inclusion response:", res);
          }
        } catch (error) {
          console.error("Failed to process plan details:", error);
        }
      });
    }
  }, [selectedPlan, requestID]);

  // update placard name automatically from first guest
  useEffect(() => {
    const firstGuest = guestDetails?.[0];
    if (firstGuest) {
      const displayName =
        `${firstGuest.firstName || ""} ${firstGuest.lastName || ""}`.trim();
      setValue("cardDisplayName", displayName, { shouldValidate: true });
    }
  }, [guestDetails, setValue]);

  // recalc totals when numberOfGuest or perPersonPrice changes
  useEffect(() => {
    const total = (perPersonPrice || 0) * (numberOfGuest || 0);
    setCurrentTotalAmount(total);
    const vat = +(total * 0.18).toFixed(2);
    setTotalVATAmount(vat);
    setGrandTotalAmount(+(total + vat - (couponValue || 0)).toFixed(2));
  }, [perPersonPrice, numberOfGuest, couponValue]);

  const addGuest = () =>
    append({
      title: "",
      firstName: "",
      lastName: "",
      age: "",
      pnr: "",
      phoneNumber: "",
      mobileCode: "",
      email: "",
    });
  const removeGuest = (index: number) => remove(index);

  const openInclusionDetails = () => setIsInclusionOpen(true);
  const closeInclusion = () => setIsInclusionOpen(false);

  const applyDiscount = () => {
    // demo: simple flat discount logic, replace with API call
    const code = (watch("couponCode") || "").trim();
    if (!code) return;
    // naive validation
    if (code === "FLAT10") {
      setCouponValue(10);
    } else if (code === "PERCENT5") {
      setCouponValue((perPersonPrice * numberOfGuest + totalVATAmount) * 0.05);
    } else {
      // invalid coupon
      setCouponValue(0);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const firstGuest = data.guestDetails?.[0] || {};

      const objData = {
        RequestId: requestID,
        FlightNo: data.originFlightNo,
        FlightTimeHour: data.originFlightHours,
        FlightTimeMinute: data.originFlightMinutes,
        GuestFirstName: firstGuest.firstName,
        GuestLastName: firstGuest.lastName,
        GuestEmailId: firstGuest.email,
        GuestContactNo: firstGuest.phoneNumber,
        GuestAge: firstGuest.age,
        NumberPorterRequired: numberOfGuest,
        Price: grandTotalAmount,
        Plan: data.plan,
        PNR: firstGuest.pnr,
        Title: firstGuest.title,
        CouponCode: data.couponCode,
        DiscountAmount: couponValue,
        cardDisplayName: data.cardDisplayName,
        TravelDate: data.originFlightDate,
        DestinationTravelDate: data.destinationFlightDate,
        DestinationFlightNo: data.destinationFlightNo,
        AdultGuestDetail: data.guestDetails,
        DestinationFlightTimeHour: data.destinationFlightHours,
        DestinationFlightTimeMinute: data.destinationFlightMinutes,
        IsTransit: true,
        Action: 2,
      };

      const response = await savePorterRequestDetails(objData);
      if (response && response[0]) {
        const result = response[0];
        if (result.ErrorNumber === "8") {
          alert("No service allowed for this request.");
        } else if (result.ErrorNumber === "2") {
          const a = encodeURIComponent(result.EncyptID);
          const b = encodeURIComponent(result.RazorOrderId);
          router.push(`/payment/${a}/${b}`);
          console.log(a, "\n", b);
        } else {
          alert("Problem performing request. Please try again!");
        }
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-2 max-w-[1350px] rounded-2xl border-[1px] border-neutral-200 bg-white p-6 shadow-xl md:my-10">
      {details ? (
        <h1 className="from-aps-500 to-aps-400/70 border-aps-600 mb-6 rounded-2xl border-[1px] bg-gradient-to-b p-4 text-center text-base font-bold text-white shadow-lg text-shadow-2xs md:text-2xl">
          <span className="text-2xl md:text-3xl">{details.AirportName}</span>{" "}
          <br /> {details.TravelSector} Service ({details.TravelDate})
        </h1>
      ) : (
        <p>Loading...</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Origin Airport Details */}
        <h1 className="text-xl text-shadow-2xs">Origin Airport Details:</h1>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-5">
          {details ? (
            <h3 className="mb-2 text-sm font-bold text-red-600">
              {details.OriginAirportName}
            </h3>
          ) : (
            <h3 className="mb-2">Loading...</h3>
          )}
          {/* Date */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium">
              Date of Travel <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("originFlightDate", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.originFlightDate && (
              <p className="mt-1 text-sm text-red-500">Select a date.</p>
            )}
          </div>
          {/* Flight No */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium">
              Flight No <span className="text-red-500">*</span>
            </label>
            <input
              {...register("originFlightNo", { required: true, maxLength: 8 })}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.originFlightNo && (
              <p className="mt-1 text-sm text-red-500">Enter flight number.</p>
            )}
          </div>

          {/* Flight Hours */}
          <div>
            <label className="block text-sm font-medium">
              Flight Time (Hour) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("originFlightHours", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {hours.map((h) => (
                <option key={h} value={String(parseInt(h, 10))}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Flight Minutes */}
          <div>
            <label className="block text-sm font-medium">
              Flight Time (Minute) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("originFlightMinutes", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination Airport Details */}
        <h1 className="mt-8 mb-4 text-xl text-shadow-2xs">
          Destination Airport Details:
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {details ? (
            <h3 className="mb-2 text-sm font-bold text-red-600">
              {details.DestinationAirportName}
            </h3>
          ) : (
            <h3 className="mb-2">Loading...</h3>
          )}
          {/* Date */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium">
              Date of Travel <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("destinationFlightDate", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.originFlightDate && (
              <p className="mt-1 text-sm text-red-500">Select a date.</p>
            )}
          </div>
          {/* Flight No */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium">
              Flight No <span className="text-red-500">*</span>
            </label>
            <input
              {...register("destinationFlightNo", {
                required: true,
                maxLength: 8,
              })}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.destinationFlightNo && (
              <p className="mt-1 text-sm text-red-500">Enter flight number.</p>
            )}
          </div>

          {/* Flight Hours */}
          <div>
            <label className="block text-sm font-medium">
              Flight Time (Hour) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("destinationFlightHours", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {hours.map((h) => (
                <option key={h} value={String(parseInt(h, 10))}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Flight Minutes */}
          <div>
            <label className="block text-sm font-medium">
              Flight Time (Minute) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("destinationFlightMinutes", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Guest details array */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Guest Details</h2>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Guest {index + 1}</p>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-6">
                  <div className="col-span-1">
                    <select
                      {...register(`guestDetails.${index}.title` as const, {
                        required: true,
                      })}
                      className="w-full rounded border px-2 py-2"
                    >
                      <option value="">Title*</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                    {errors?.guestDetails?.[index]?.title && (
                      <p className="text-sm text-red-500">Select title.</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register(`guestDetails.${index}.firstName` as const, {
                        required: true,
                        maxLength: 50,
                      })}
                      placeholder="First Name*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.firstName && (
                      <p className="text-sm text-red-500">Enter first name.</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register(`guestDetails.${index}.lastName` as const, {
                        required: true,
                        maxLength: 50,
                      })}
                      placeholder="Last Name*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.lastName && (
                      <p className="text-sm text-red-500">Enter last name.</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register(`guestDetails.${index}.age` as const, {
                        required: true,
                        maxLength: 3,
                        pattern: /^[0-9]+$/,
                      })}
                      placeholder="Age*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.age && (
                      <p className="text-sm text-red-500">Please enter age.</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register(`guestDetails.${index}.pnr` as const, {
                        required: true,
                        maxLength: 10,
                      })}
                      placeholder="PNR No*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.pnr && (
                      <p className="text-sm text-red-500">Please enter pnr.</p>
                    )}
                  </div>

                  <div>
                    {/* Phone number: you can swap this with an intl phone input component like react-phone-input-2 */}
                    <input
                      {...register(
                        `guestDetails.${index}.phoneNumber` as const,
                        { required: true, pattern: /^[0-9]{7,15}$/ },
                      )}
                      placeholder="Phone Number*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.phoneNumber && (
                      <p className="text-sm text-red-500">
                        Please enter phone number.
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 md:col-span-2">
                    <input
                      {...register(`guestDetails.${index}.email` as const, {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      })}
                      placeholder="Email ID*"
                      className="w-full rounded border px-2 py-2"
                    />
                    {errors?.guestDetails?.[index]?.email && (
                      <p className="text-sm text-red-500">
                        Please enter valid email.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addGuest}
              className="bg-aps-400 rounded px-3 py-1 text-sm font-medium text-white"
            >
              + Add Guest
            </button>
          </div>
        </div>

        {/* Placard, coupon, actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Plan */}
          <div>
            <label className="block text-sm font-medium">
              Plan <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select
                  {...register("plan", { required: true })}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  onChange={(e) => setValue("plan", e.target.value)}
                >
                  <option value="">Select Plan</option>
                  {planList.map((p: any) => (
                    <option
                      key={p.id ?? p.EncyptID ?? p.encyptID}
                      value={p.EncyptID ?? p.encyptID ?? p.id}
                    >
                      {p.Name ?? p.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <InfoIcon
                size={20}
                stroke="#e95158"
                className="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80"
                onClick={openInclusionDetails}
              />
            </div>
            {errors.plan && (
              <p className="mt-1 text-sm text-red-500">Please select plan.</p>
            )}
          </div>
          {/* Placard Name */}
          <div>
            <label className="block text-sm font-medium">Placard Name</label>
            <input
              {...register("cardDisplayName")}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              {...register("couponCode")}
              className="mt-1 w-full rounded border px-3 py-2"
              disabled={!watch("plan") || discountDivDisable}
            />
          </div>
          {/* Button */}
          <div className="flex gap-2">
            <div className="mt-4 flex w-1/2 items-start">
              <button
                type="button"
                onClick={applyDiscount}
                disabled={!watch("plan") || discountDivDisable}
                className="bg-aps-400 border-aps-600 w-full cursor-pointer rounded-xl border-[1px] px-4 py-3 text-white"
              >
                APPLY
              </button>
            </div>
            <div className="mt-4 w-1/2">
              <button
                type="submit"
                className="group from-aps-secondary-500 to-aps-secondary-300 border-aps-secondary-400 flex w-full items-center justify-center gap-1 rounded-xl border-[1px] bg-gradient-to-r py-3 font-medium transition duration-300 hover:border-[1px]"
              >
                <p className="text-white transition-transform duration-300 group-hover:-translate-x-[10px] group-hover:text-black">
                  Book Now
                </p>
                <ArrowRight
                  size={20}
                  className="text-white transition-transform duration-300 group-hover:translate-x-[10px] group-hover:text-black"
                />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Price Breakup */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-gray-900">Price Breakup</h3>
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-1 text-gray-600">Price Per Porter (Adult)</td>
              <td className="py-1 text-right font-medium text-gray-900">
                {perPersonPrice}
              </td>
            </tr>
            <tr>
              <td className="py-1 text-gray-600">No. of Porter (Adult)</td>
              <td className="py-1 text-right font-medium text-gray-900">
                {numberOfGuest}
              </td>
            </tr>
            <tr>
              <td className="py-1 text-gray-600">Total Amount</td>
              <td className="py-1 text-right font-medium text-gray-900">
                {currentTotalAmount}
              </td>
            </tr>
            <tr>
              <td className="py-1 text-gray-600">GST (18%)</td>
              <td className="py-1 text-right font-medium text-gray-900">
                {totalVATAmount}
              </td>
            </tr>
            <tr>
              <td className="py-1 text-gray-600">Discount</td>
              <td className="py-1 text-right font-medium text-gray-900">
                {couponValue}
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="py-1.5 text-lg font-bold text-gray-900">
                Grand Total
              </td>
              <td className="py-1.5 text-right text-lg font-bold text-gray-900">
                {grandTotalAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Inclusion modal (simple) */}
      {isInclusionOpen && inclusionData && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-fadeIn w-full max-w-2xl rounded-lg border-t-4 border-red-600 bg-white p-6 shadow-xl">
            <div className="mx-auto mb-4 flex w-fit items-center justify-between text-center">
              <h4 className="text-4xl font-bold text-red-700">
                Inclusion Details
              </h4>
            </div>

            <div
              className="prose prose-sm max-w-none leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  inclusionData?.Inclusion ||
                  "<p>No inclusion details available.</p>",
              }}
            />

            <div className="mt-5 flex justify-center text-sm">
              <p>
                Note: To avail seamless Porter service, please confirm your
                location to Porter Supervisor whose details will be shared with
                the booking confirmation.
              </p>
              <div className="mt- text-right">
                <button
                  onClick={closeInclusion}
                  className="rounded-md bg-red-600 px-5 py-2 font-medium text-white transition-all hover:bg-red-700 active:bg-red-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
