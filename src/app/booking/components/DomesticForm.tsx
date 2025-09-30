"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getDropdownList, getDropdownList5 } from "@/lib/api/common";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { useBookingStore } from "@/store/booking";

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

  const [countries, setCountries] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);
  const [terminals, setTerminals] = useState<any[]>([]);

  const selectedCountry = watch("country");
  const selectedService = watch("serviceType");
  const selectedOrigin = watch("origin");

  const airportType = "CVPrBmNfWxtKgaFc3B3oYxzkJF7Il85QIWGvLM09WFg=";

  // Initial load: fetch countries
  useEffect(() => {
    getDropdownList("Country").then((res) => setCountries(res));
  }, []);

  // On Country change → fetch ServiceTypes
  useEffect(() => {
    if (selectedCountry) {
      getDropdownList5(
        "AirportServiceList",
        "",
        "",
        selectedCountry,
        airportType,
      )
        .then((res) => setServiceTypes(res || []))
        .catch(() => setServiceTypes([]));
    } else {
      setServiceTypes([]);
    }
  }, [selectedCountry]);

  // On ServiceType change → fetch Airports
  useEffect(() => {
    if (selectedCountry && selectedService) {
      getDropdownList5(
        "OriginDestinationAirport",
        "",
        airportType,
        selectedService,
        selectedCountry,
      )
        .then((res) => setAirports(res || []))
        .catch(() => setAirports([]));
    } else {
      setAirports([]);
    }
  }, [selectedCountry, selectedService]);

  // On Origin change → fetch Terminals
  useEffect(() => {
    if (selectedOrigin && selectedService) {
      getDropdownList5(
        "AirportTerminal",
        "",
        selectedOrigin,
        airportType,
        selectedService,
      )
        .then((res) => setTerminals(res || []))
        .catch(() => setTerminals([]));
    } else {
      setTerminals([]);
    }
  }, [selectedOrigin, selectedService]);

  const onSubmit = async (data: FormValues) => {
    const travelDateUTC = new Date(data.travelDate).toISOString();
    setDomestic(data);

    const payload = {
      AirportCode: data.origin,
      DestinationAirportCode: data.destination,
      Terminal: data.terminal,
      TravelDate: travelDateUTC,
      PhoneNumber: data.phone,
      PhoneCountryCode: "in",
      ServiceType: data.serviceType,
      AirportType: airportType,
      IsTransit: false,
      Action: 1,
    };

    try {
      await savePorterRequestDetails(payload);
      // router.push("/review");
      console.log(payload);
    } catch (err) {
      console.error("Failed to save booking", err);
    }
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
          {countries.map((c) => (
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
          {serviceTypes.map((s) => (
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
          {airports.map((a) => (
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
          {airports.map((a) => (
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
          {terminals.map((t) => (
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
