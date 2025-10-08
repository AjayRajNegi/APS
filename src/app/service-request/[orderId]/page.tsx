"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  getAirportPorterDetail,
  GetPlanInculsionDetail,
  savePorterRequestDetails,
} from "@/lib/api/requestBooking";
import { getDropdownList5 } from "@/lib/api/common";
import { ArrowRight, InfoIcon } from "lucide-react";

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
}

type Guest = {
  title: string;
  firstName: string;
  lastName: string;
  age: string;
  pnr: string;
  phoneNumber: string;
  mobileCode?: string;
  email: string;
};

type FormValues = {
  flightNo: string;
  flightHours: string;
  flightMinutes: string;
  plan: string;
  cardDisplayName: string;
  couponCode: string;
  guestDetails: Guest[];
};

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
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [discountDivDisable] = useState(false);
  const [details, setDetails] = useState<AirportDetails | null>(null);
  const [priceList, setPriceList] = useState([]);

  const [currentTotalAmount, setCurrentTotalAmount] = useState(0);
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  const [perPersonPrice, setPerPersonPrice] = useState(0);
  const [totalVATAmount, setTotalVATAmount] = useState(0);
  const [numberOfGuest] = useState(1);
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
      flightNo: "",
      flightHours: "00",
      flightMinutes: "00",
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
  const guestDetails = watch("guestDetails");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guestDetails",
  });

  // Fetch initial data
  useEffect(() => {
    if (!requestID) {
      router.push("/home");
      return;
    }
    getAirportPorterDetail(requestID, 1).then((res) => {
      if (res && res[0]) {
        setDetails(res[0]);
      }
    });
    getDropdownList5("PlanList", "", "", requestID, "").then((res: any) => {
      const formatted = (res || []).map((item: any) => ({
        id: item.Id,
        name: item.Name,
        encyptID: item.EncyptID,
      }));
      setPlanList((prev) => (formatted.length ? formatted : prev));
    });
  }, [requestID, router]);

  // Fetches inclusion data and price list
  useEffect(() => {
    if (selectedPlan) {
      GetPlanInculsionDetail(selectedPlan, requestID).then((res) => {
        if (res && res[0] && res[1]) {
          try {
            const inclusionObject = JSON.parse(res[0])?.[0];
            const pricingArray = JSON.parse(res[1]);
            const pricingObject = pricingArray?.[0];

            setInclusionData(inclusionObject ?? null);
            setPriceList(pricingArray);

            if (pricingObject) {
              setPerPersonPrice(pricingObject.Price);
              setCurrentTotalAmount(pricingObject.PriceWithGST);
            }
          } catch (error) {
            console.error("Failed to parse plan details:", error);
          }
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
    //setNumberOfGuest(guestDetails?.length ?? 1);
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

  const openPriceBreakup = () => setIsPriceOpen(true);
  const closePrice = () => setIsPriceOpen(false);

  const applyDiscount = () => {
    const code = (watch("couponCode") || "").trim();
    if (!code) return;
    if (code === "FLAT10") {
      setCouponValue(10);
    } else if (code === "PERCENT5") {
      setCouponValue((perPersonPrice * numberOfGuest + totalVATAmount) * 0.05);
    } else {
      setCouponValue(0);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const firstGuest = data.guestDetails?.[0] || {};

      const objData = {
        RequestId: requestID,
        FlightNo: data.flightNo,
        FlightTimeHour: data.flightHours,
        FlightTimeMinute: data.flightMinutes,
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
        AdultGuestDetail: data.guestDetails,
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
    <div className="mx-auto my-2 max-w-7xl rounded-2xl border-[1px] border-neutral-200 bg-white p-6 shadow-xl md:my-10">
      {details ? (
        <h1 className="bg-aps-300 mb-6 rounded-2xl p-4 text-center text-base font-bold shadow-lg text-shadow-2xs md:text-2xl">
          <span className="text-2xl md:text-3xl">{details.AirportName}</span>{" "}
          <br /> {details.ServiceType} Service ({details.TravelDate})
        </h1>
      ) : (
        <p>Loading...</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Flight No */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium">
              Flight No <span className="text-red-500">*</span>
            </label>
            <input
              {...register("flightNo", { required: true, maxLength: 8 })}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            {errors.flightNo && (
              <p className="mt-1 text-sm text-red-500">Enter flight number.</p>
            )}
          </div>

          {/* Flight Hours */}
          <div>
            <label className="block text-sm font-medium">
              Flight Time (Hour) <span className="text-red-500">*</span>
            </label>
            <select
              {...register("flightHours", { required: true })}
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
              {...register("flightMinutes", { required: true })}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="block text-sm font-medium">
              Plan <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                {...register("plan", { required: true })}
                className="mt-1 w-full rounded border px-3 py-2"
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

              <InfoIcon
                size={45}
                stroke="#e95158"
                className="cursor-pointer"
                onClick={openInclusionDetails}
              />
            </div>
            {errors.plan && (
              <p className="mt-1 text-sm text-red-500">Please select plan.</p>
            )}
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
              className="text-aps-400 text-sm font-medium"
            >
              + Add Guest
            </button>
          </div>
        </div>

        {/* Placard, coupon, actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="block text-sm font-medium">Placard Name</label>
            <input
              {...register("cardDisplayName")}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              {...register("couponCode")}
              className="mt-1 w-full rounded border px-3 py-2"
              disabled={!watch("plan") || discountDivDisable}
            />
          </div>
          <div className="mt-6 flex items-start">
            <button
              type="button"
              onClick={applyDiscount}
              disabled={!watch("plan") || discountDivDisable}
              className="bg-aps-300 cursor-pointer rounded px-4 py-2 text-black"
            >
              APPLY
            </button>
          </div>
          {/* Price Breakup */}
          <div className="mt-8 rounded border bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold">Price Breakup</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td>Price Per Porter (Adult)</td>
                  <td className="text-right">{perPersonPrice}</td>
                </tr>
                <tr>
                  <td>No. of Porter (Adult)</td>
                  <td className="text-right">{numberOfGuest}</td>
                </tr>
                <tr>
                  <td>Total Amount</td>
                  <td className="text-right">{currentTotalAmount}</td>
                </tr>
                <tr>
                  <td>GST (18%)</td>
                  <td className="text-right">{totalVATAmount}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="text-right">{couponValue}</td>
                </tr>
                <tr className="font-semibold">
                  <td>Grand Total</td>
                  <td className="text-right">{grandTotalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-3 flex gap-2">
              <button
                onClick={openPriceBreakup}
                className="rounded bg-slate-600 px-3 py-1 text-white"
              >
                TOTAL AMOUNT : {grandTotalAmount}
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group from-aps-secondary-500 to-aps-secondary-300 flex w-full items-center justify-center gap-1 rounded-2xl border-[1px] border-white bg-gradient-to-r py-3 font-medium transition duration-300 hover:border-[1px]"
          >
            <p className="transition-transform duration-300 group-hover:-translate-x-[10px] group-hover:text-white">
              Book Now
            </p>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-[10px] group-hover:text-white"
            />
          </button>
        </div>
      </form>

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

      {/* Price modal */}
      {isPriceOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 bg-red-500">
          <div className="max-w-md rounded bg-white p-6">
            <h4 className="mb-2 text-lg font-semibold">Price Breakup</h4>
            <div>
              <p>Price Per Porter: {perPersonPrice}</p>
              <p>No. of Porter: {numberOfGuest}</p>
              <p>Total Amount: {currentTotalAmount}</p>
              <p>GST(18%): {totalVATAmount}</p>
              <p>Discount: {couponValue}</p>
              <p className="font-semibold">Grand Total: {grandTotalAmount}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={closePrice}
                className="rounded bg-gray-300 px-3 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
