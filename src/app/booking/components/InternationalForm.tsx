"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/booking";
import { Controller, useForm } from "react-hook-form";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { getDropdownList, getDropdownList5 } from "@/lib/api/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  phoneCountryCode: string;
};

export default function InternationalForm() {
  const router = useRouter();
  const { setInternational } = useBookingStore();

  const form = useForm<FormValues>();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [airports, setAirports] = useState<Airport[]>([]);
  const [terminals, setTerminals] = useState<Airport[]>([]);
  const [countries, setCountries] = useState<Airport[]>([]);
  const [serviceTypes, setServiceTypes] = useState<Airport[]>([]);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [originAirport, setOriginAirport] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();
  const [airportResults, setAirportResults] = useState<Airport[]>([]);
  const [countryPhoneCode, setCountryPhoneCode] = useState<string>("in");

  const selectedCountry = watch("country");
  const selectedServiceCode = watch("serviceType");

  const airportType = "rV28YjgOqTZ94fpbnNVaN8qYMNhZoeIqOelpVDRbctc=";

  // Load countries
  useEffect(() => {
    getDropdownList("Country").then((res) => setCountries(res));
  }, []);

  // On country change -> fetch service types
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
    } else setServiceTypes([]);
  }, [selectedCountry]);

  // On service type change -> fetch airports
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
    } else setAirports([]);
  }, [selectedCountry, selectedServiceCode]);

  // On origin change -> fetch terminals
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
    } else setTerminals([]);
  }, [originAirport, selectedServiceCode]);

  // Airport search
  useEffect(() => {
    if (destinationQuery.trim() === "") {
      setAirportResults([]);
      return;
    }
    const timerId = setTimeout(() => fetchAirports(destinationQuery), 500);
    return () => clearTimeout(timerId);
  }, [destinationQuery]);

  const fetchAirports = async (query: string) => {
    try {
      const res = await getDropdownList5(
        "AllAirport",
        query,
        airportType,
        selectedServiceCode,
        selectedCountry,
      );
      setAirportResults(res);
    } catch {
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
      PhoneCountryCode: countryPhoneCode,
      ServiceType: data.serviceType,
      AirportType: airportType,
      IsTransit: false,
      Action: 1,
    };

    try {
      const response = await savePorterRequestDetails(payload);
      const orderId = encodeURIComponent(response[0].EncyptID);
      setInternational(response);
      router.push(`/service-request/${orderId}`);
    } catch (err) {
      console.error("Failed to save booking", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3"
      >
        {/* Country */}
        <FormField
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.EncyptID} value={c.EncyptID}>
                        {c.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Type */}
        <FormField
          control={control}
          name="serviceType"
          rules={{ required: "Service type required" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    const service = serviceTypes.find(
                      (s) => s.EncyptID === val,
                    );
                    setSelectedService(service?.Name);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((s) => (
                      <SelectItem key={s.EncyptID} value={s.EncyptID}>
                        {s.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Origin Airport */}
        <FormField
          control={control}
          name="origin"
          rules={{ required: "Please select origin airport." }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {selectedService === "Arrival" ? (
                  <div className="relative">
                    <Input
                      placeholder="Search destination airport..."
                      value={destinationQuery}
                      onChange={(e) => setDestinationQuery(e.target.value)}
                      className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
                    />
                    {airportResults.length > 0 && (
                      <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-md border bg-white shadow">
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
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setOriginAirport(val);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                      <SelectValue placeholder="Origin Airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((a) => (
                        <SelectItem key={a.EncyptID} value={a.EncyptID}>
                          {a.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Destination Airport */}
        <FormField
          control={control}
          name="destination"
          rules={{
            required: "Please select destination airport.",
            validate: (val) =>
              val !== watch("origin") ||
              "Origin & Destination airport should be different.",
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {selectedService === "Arrival" ? (
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setOriginAirport(val);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                      <SelectValue placeholder="Destination Airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((a) => (
                        <SelectItem key={a.EncyptID} value={a.EncyptID}>
                          {a.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <Input
                      placeholder="Search destination airport..."
                      value={destinationQuery}
                      onChange={(e) => setDestinationQuery(e.target.value)}
                      className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
                    />
                    {airportResults.length > 0 && (
                      <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-md border bg-white shadow">
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
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terminal */}
        <FormField
          control={control}
          name="terminal"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full rounded-full border-none bg-white px-4 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none">
                    <SelectValue placeholder="Select Terminal" />
                  </SelectTrigger>
                  <SelectContent>
                    {terminals.map((t) => (
                      <SelectItem key={t.EncyptID} value={t.EncyptID}>
                        {t.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Travel Date */}
        <FormField
          control={control}
          name="travelDate"
          rules={{
            required: "Please select a date",
            validate: (value) =>
              value && new Date(value) > new Date()
                ? true
                : "Select a future date",
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full rounded-2xl rounded-full border-none bg-white px-4 py-2 pl-3 text-left font-normal shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) field.onChange(date.toISOString());
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={control}
          name="phone"
          rules={{
            required: "Phone number required",
            validate: (value) =>
              value && value.replace(/\D/g, "").length >= 8
                ? true
                : "Enter valid phone number",
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  country={"in"}
                  value={field.value}
                  onChange={(phone, countryData) => {
                    field.onChange(phone);
                    if (countryData && "countryCode" in countryData) {
                      setCountryPhoneCode(countryData.countryCode);
                    }
                  }}
                  inputClass="w-full rounded-full border-none bg-white px-4 py-2 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none active:outline-none"
                  buttonClass="!border-none"
                  enableSearch
                  disableDropdown={false}
                  placeholder="Enter phone number"
                  containerClass="[&_.special-label]:hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            className="group from-aps-secondary-500 to-aps-secondary-300 flex w-full items-center justify-center gap-1 rounded-full border-[1px] border-white bg-gradient-to-r py-3 font-medium transition duration-300 hover:border-[1px]"
          >
            <p className="transition-transform duration-300 group-hover:-translate-x-[10px] group-hover:text-white">
              Book Now
            </p>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-[10px] group-hover:text-white"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
}
