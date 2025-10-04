"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";
import { Controller, useForm } from "react-hook-form";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { getDropdownList, getDropdownList5 } from "@/lib/api/common";

type Airport = {
  EncyptID: string;
  Name: string;
};

type FormValues = {
  phone: string;
  origin: string;
  country: string;
  terminal: string;
  travelDate: string;
  serviceType: string;
  destination: string;
};

export default function DomesticForm() {
  const router = useRouter();
  const { setDomestic } = useBookingStore();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [airports, setAirports] = useState<any[]>([]);
  const [terminals, setTerminals] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [originAirport, setOriginAirport] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();
  const [airportResults, setAirportResults] = useState<Airport[]>([]);

  const selectedCountry = watch("country");
  const selectedServiceCode = watch("serviceType");

  const airportType = "CVPrBmNfWxtKgaFc3B3oYxzkJF7Il85QIWGvLM09WFg=";

  // const internationalType = "rV28YjgOqTZ94fpbnNVaN8qYMNhZoeIqOelpVDRbctc=";

  // Initial load: fetch countries
  useEffect(() => {
    getDropdownList("Country").then((res) => setCountries(res));
  }, []);

  // On Country change -> fetch ServiceTypes
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

  // On ServiceType change -> fetch Airports
  useEffect(() => {
    if (selectedCountry && selectedServiceCode) {
      getDropdownList5(
        "OriginDestinationAirport",
        "",
        airportType,
        selectedServiceCode,
        selectedCountry,
      )
        .then((res) => setAirports(res || []))
        .catch(() => setAirports([]));
    } else {
      setAirports([]);
    }
  }, [selectedCountry, selectedServiceCode]);

  // On Origin change -> fetch Terminals
  useEffect(() => {
    if (originAirport && selectedServiceCode) {
      getDropdownList5(
        "AirportTerminal",
        "",
        originAirport,
        airportType,
        selectedServiceCode,
      )
        .then((res) => setTerminals(res || []))
        .catch(() => setTerminals([]));
    } else {
      setTerminals([]);
    }
  }, [originAirport, selectedServiceCode]);

  // On Airport search -> fetches airport
  useEffect(() => {
    if (destinationQuery.trim() === "") {
      setAirportResults([]);
      return;
    }
    const timerId = setTimeout(() => {
      fetchAirports(destinationQuery);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [destinationQuery]);

  const fetchAirports = async (query: string) => {
    try {
      getDropdownList5(
        "AllAirport",
        query,
        airportType,
        selectedServiceCode,
        selectedCountry,
      ).then((res) => setAirportResults(res));
    } catch (error) {
      console.error("Failed to fetch airports:", error);
      setAirportResults([]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const travelDateUTC = new Date(data.travelDate).toISOString();

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
      const response = await savePorterRequestDetails(payload);
      const orderId = encodeURIComponent(response[0].EncyptID);
      setDomestic(response);
      router.push(`/service-request/${orderId}`);
    } catch (err) {
      console.error("Failed to save booking", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Country Select */}
      <div>
        <Label htmlFor="country">Country</Label>
        <select
          id="country"
          {...register("country", { required: true })}
          className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.EncyptID} value={c.EncyptID}>
              {c.Name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-500">Country required</p>
        )}
      </div>

      {/* Service Type Select */}
      <div>
        <Label htmlFor="serviceType">Service Type</Label>
        <Controller
          name="serviceType"
          control={control}
          rules={{ required: "Service type required" }}
          render={({ field }) => (
            <select
              id="serviceType"
              className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                const service = serviceTypes.find(
                  (s) => s.EncyptID === e.target.value,
                );
                setSelectedService(service?.Name);
              }}
            >
              <option value="">Select Service</option>
              {serviceTypes.map((service) => (
                <option key={service.EncyptID} value={service.EncyptID}>
                  {service.Name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.serviceType && (
          <p className="mt-1 text-sm text-red-500">Service type required</p>
        )}
      </div>

      {/* Origin Airport */}
      <div>
        <Label htmlFor="origin">Origin Airport</Label>
        <Controller
          name="origin"
          control={control}
          rules={{ required: "Please select origin airport." }}
          render={({ field }) =>
            selectedService === "Arrival" ? (
              <div className="relative mt-2">
                <Input
                  id="origin"
                  type="text"
                  placeholder="Search destination airport..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                />
                {airportResults.length > 0 && (
                  <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md">
                    {airportResults.map((airport) => (
                      <li
                        key={airport.EncyptID}
                        className="cursor-pointer px-4 py-2 text-sm hover:bg-slate-100"
                        onClick={() => {
                          setDestinationQuery(airport.Name);
                          field.onChange(airport.EncyptID);
                          setAirportResults([]);
                        }}
                      >
                        {airport.Name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setOriginAirport(e.target.value);
                }}
              >
                <option value="">Origin Airport</option>
                {airports.map((loc) => (
                  <option key={loc.EncyptID} value={loc.EncyptID}>
                    {loc.Name}
                  </option>
                ))}
              </select>
            )
          }
        />
        {errors.origin && (
          <p className="mt-1 text-sm text-red-500">{errors.origin.message}</p>
        )}
      </div>

      {/* Destination Airport */}
      <div>
        <Label htmlFor="destination">Destination Airport</Label>
        <Controller
          name="destination"
          control={control}
          rules={{
            required: "Please select destination airport.",
            validate: (val) =>
              val !== watch("origin") ||
              "Origin & Destination airport should be different.",
          }}
          render={({ field }) =>
            selectedService === "Arrival" ? (
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setOriginAirport(e.target.value);
                }}
              >
                <option value="">Destination Airport</option>
                {airports.map((loc) => (
                  <option key={loc.EncyptID} value={loc.EncyptID}>
                    {loc.Name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative mt-2">
                <Input
                  id="destination"
                  type="text"
                  placeholder="Search destination airport..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                />
                {airportResults.length > 0 && (
                  <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md">
                    {airportResults.map((airport) => (
                      <li
                        key={airport.EncyptID}
                        className="cursor-pointer px-4 py-2 text-sm hover:bg-slate-100"
                        onClick={() => {
                          setDestinationQuery(airport.Name);
                          field.onChange(airport.EncyptID);
                          setAirportResults([]);
                        }}
                      >
                        {airport.Name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          }
        />
        {errors.destination && (
          <p className="mt-1 text-sm text-red-500">
            {errors.destination.message}
          </p>
        )}
      </div>

      {/* Terminal */}
      <div>
        <Label htmlFor="terminal">Terminal</Label>
        <select
          id="terminal"
          {...register("terminal", { required: true })}
          className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">Select Terminal</option>
          {terminals.map((t) => (
            <option key={t.EncyptID} value={t.EncyptID}>
              {t.Name}
            </option>
          ))}
        </select>
        {errors.terminal && (
          <p className="mt-1 text-sm text-red-500">Terminal required</p>
        )}
      </div>

      {/* Travel Date & Time */}
      <div>
        <Label htmlFor="travelDate">Travel Date & Time</Label>
        <Input
          id="travelDate"
          type="datetime-local"
          {...register("travelDate", {
            required: true,
            validate: (value) => new Date(value) > new Date(),
          })}
          className="mt-2 w-full"
        />
        {errors.travelDate && (
          <p className="mt-1 text-sm text-red-500">Select a future date/time</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          })}
          placeholder="Enter Indian phone number"
          className="mt-2 w-full"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">Valid phone required</p>
        )}
      </div>

      {/* CTA */}
      <Button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Continue
      </Button>
    </form>
  );
}
