"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const internationalType = "rV28YjgOqTZ94fpbnNVaN8qYMNhZoeIqOelpVDRbctc=";

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
      console.log(response[0].EncyptID);
      const slug = encodeURIComponent(response[0].EncyptID);
      console.log(slug);
      setDomestic(response);
      router.push(`/service-request/${slug}`);
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
        <Controller
          name="serviceType"
          control={control}
          rules={{ required: "Service type required" }}
          render={({ field }) => (
            <select
              className="form-control"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                const service = serviceTypes.find(
                  (s) => s.EncyptID === e.target.value,
                );
                setSelectedService(service.Name);
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
      </div>

      {/* Origin Airport */}
      <div className="origin-input-area">
        <label className="form-label">
          Origin Airport <i className="fa-solid fa-location-pin"></i>
        </label>

        <Controller
          name="origin"
          control={control}
          rules={{ required: "Please select origin airport." }}
          render={({ field }) =>
            selectedService === "Arrival" ? (
              <div className="autocomplete-container">
                <input
                  type="text"
                  placeholder="Search destination airport..."
                  className="form-control"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                />

                {airportResults.length > 0 && (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      width: "100%",
                    }}
                  >
                    {airportResults.map((airport) => (
                      <li
                        key={airport.EncyptID}
                        className="list-group-item list-group-item-action"
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
                className="form-control"
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
      </div>

      {/* Destination Airport */}
      <div className="col-md-6 origin-input-area mt-3">
        <label className="form-label">
          Destination Airport <i className="fa-solid fa-location-pin"></i>
        </label>

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
                className="form-control"
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
              <div className="autocomplete-container">
                <input
                  type="text"
                  placeholder="Search destination airport..."
                  className="form-control"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                />

                {airportResults.length > 0 && (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      width: "100%",
                    }}
                  >
                    {airportResults.map((airport) => (
                      <li
                        key={airport.EncyptID}
                        className="list-group-item list-group-item-action"
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
            pattern: /^[6-9]\d{9}$/,
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
