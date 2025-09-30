"use client";

import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useBookingStore } from "@/store/booking";
import { getDropdownList, getDropdownList5 } from "@/lib/api/common";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type FormValues = {
  country: string;
  serviceType: string;
  origin: string;
  destination: string;
  terminal: string;
  travelDate: string;
  phone: string;
};

export default function DomesticForm() {
  const router = useRouter();
  const { setDomestic } = useBookingStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [airports, setAirports] = useState<any[]>([]);
  const [terminals, setTerminals] = useState<any[]>([]);
  const selectedCountry = watch("country");
  const selectedService = watch("serviceType");
  const selectedOrigin = watch("origin");

  // 🔹 Fetch countries
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getDropdownList("Country"),
  });

  // 🔹 Fetch services (TravelSector)
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getDropdownList("TravelSector"),
  });

  // 🔹 Fetch airport list when country & serviceType selected
  useEffect(() => {
    if (selectedCountry && selectedService) {
      // Example: airportType depends on serviceType (Arrival / Departure)
      const airportType = selectedService === "Arrival" ? "1" : "2";

      getDropdownList5(
        "AirportServiceLIst",
        "",
        "",
        selectedCountry,
        airportType,
      ).then((res) => setAirports(res));
    }
  }, [selectedCountry, selectedService]);

  // 🔹 Fetch terminals when serviceType + origin selected
  useEffect(() => {
    if (selectedService && selectedOrigin) {
      // backend API for terminals could be same as airport fetch or different
      getDropdownList5(
        "TerminalList",
        "",
        "",
        selectedOrigin,
        selectedService,
      ).then((res) => setTerminals(res));
    }
  }, [selectedOrigin, selectedService]);

  const onSubmit = async (data: FormValues) => {
    setDomestic(data);

    const payload = {
      AirportCode: data.origin,
      DestinationAirportCode: data.destination,
      Terminal: data.terminal,
      TravelDate: data.travelDate,
      PhoneNumber: data.phone,
      PhoneCountryCode: "in",
      ServiceType: data.serviceType,
      AirportType: "Domestic",
      IsTransit: false,
      Action: 1,
    };

    await savePorterRequestDetails(payload);
    router.push("/review");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Country Select */}
      <div>
        <label className="mb-1 block">Country</label>
        <select
          {...register("country", { required: true })}
          className="w-full border p-2"
        >
          <option value="">Select Country</option>
          {countries?.map((c: any) => (
            <option key={c.EncyptID} value={c.EncyptID}>
              {c.Name}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-500">Country required</p>}
      </div>

      {/* Service Type Select */}
      <div>
        <label className="mb-1 block">Service Type</label>
        <select
          {...register("serviceType", { required: true })}
          className="w-full border p-2"
        >
          <option value="">Select Service</option>
          {services?.map((s: any) => (
            <option key={s.EncyptID} value={s.EncyptID}>
              {s.Name}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="text-red-500">Service type required</p>
        )}
      </div>

      {/* Origin Airport */}
      <div>
        <label className="mb-1 block">Origin Airport</label>
        <select
          {...register("origin", { required: true })}
          className="w-full border p-2"
        >
          <option value="">Select Origin</option>
          {airports?.map((a: any) => (
            <option key={a.EncyptID} value={a.EncyptID}>
              {a.Name}
            </option>
          ))}
        </select>
        {errors.origin && (
          <p className="text-red-500">Origin airport required</p>
        )}
      </div>

      {/* Destination Airport */}
      <div>
        <label className="mb-1 block">Destination Airport</label>
        <select
          {...register("destination", { required: true })}
          className="w-full border p-2"
        >
          <option value="">Select Destination</option>
          {airports?.map((a: any) => (
            <option key={a.EncyptID} value={a.EncyptID}>
              {a.Name}
            </option>
          ))}
        </select>
        {errors.destination && (
          <p className="text-red-500">Destination airport required</p>
        )}
      </div>

      {/* Terminal */}
      <div>
        <label className="mb-1 block">Terminal</label>
        <select
          {...register("terminal", { required: true })}
          className="w-full border p-2"
        >
          <option value="">Select Terminal</option>
          {terminals?.map((t: any) => (
            <option key={t.EncyptID} value={t.EncyptID}>
              {t.Name}
            </option>
          ))}
        </select>
        {errors.terminal && <p className="text-red-500">Terminal required</p>}
      </div>

      {/* Travel Date & Time */}
      <div>
        <label className="mb-1 block">Travel Date & Time</label>
        <input
          type="datetime-local"
          {...register("travelDate", {
            required: true,
            validate: (value) => new Date(value) > new Date(),
          })}
          className="w-full border p-2"
        />
        {errors.travelDate && (
          <p className="text-red-500">Select a future date/time</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block">Phone Number</label>
        <input
          type="tel"
          {...register("phone", {
            required: true,
            pattern: /^[6-9]\d{9}$/, // India mobile format
          })}
          placeholder="Enter Indian phone number"
          className="w-full border p-2"
        />
        {errors.phone && <p className="text-red-500">Valid phone required</p>}
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Continue
      </button>
    </form>
  );
}
