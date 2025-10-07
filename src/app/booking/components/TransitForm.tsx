"use client";
import { useForm } from "react-hook-form";
import { useBookingStore } from "@/store/booking";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import { cn } from "@/lib/utils";

type Airport = {
  EncyptID: string;
  Name: string;
};

type FormValues = {
  phone: string;
  serviceAirport: string;
  country: string;
  terminal: string;
  travelDate: string;
  serviceType: string;
  phoneCountryCode: string;
  originAirport: string;
  destinationAirport: string;
  servicesAirport: string;
};

export default function TransitForm() {
  const router = useRouter();
  const form = useForm<FormValues>();
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [services, setServices] = useState<Airport[]>([]);
  const [selectedService, setSelectedService] = useState<string>();
  const [allAirports, setAllAirports] = useState<Airport[]>([]);
  const [originQuery, setOriginQuery] = useState("");
  const [queryAirports, setQueryAirports] = useState<Airport[]>([]);
  const [servicesAirport, setServicesAirport] = useState<string>();
  const [destinationQuery, setDestinationQuery] = useState("");
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);
  const [countryPhoneCode, setCountryPhoneCode] = useState<string>("in");

  // Fetch all the services
  useEffect(() => {
    getDropdownList("TravelSector").then((res) => {
      setServices(res);
    });
  }, []);

  // Fetch Services airport
  useEffect(() => {
    if (services) {
      getDropdownList("AllAirportLocation").then((res) => setAllAirports(res));
    }
  }, [services]);

  // Fetch Origin Airport
  useEffect(() => {
    if (originQuery.trim() === "") {
      setQueryAirports([]);
      return;
    }
    const timerId = setTimeout(() => fetchOriginAirports(originQuery), 500);
    return () => clearTimeout(timerId);
  }, [originQuery]);

  // Fetch Destination Airport
  useEffect(() => {
    if (destinationQuery.trim() === "") {
      setDestinationAirports([]);
      return;
    }

    const timerId = setTimeout(
      () => fetchDestinationAirports(destinationQuery),
      500,
    );
    return () => clearTimeout(timerId);
  }, [destinationQuery]);

  const fetchOriginAirports = async (query: string) => {
    try {
      const res = await getDropdownList5(
        "AllAirportWithCountry",
        query,
        "",
        "",
        "",
      );
      setQueryAirports(res);
    } catch {
      setQueryAirports([]);
    }
  };
  const fetchDestinationAirports = async (query: string) => {
    try {
      const res = await getDropdownList5(
        "AllAirportWithCountry",
        query,
        "",
        "",
        "",
      );
      setDestinationAirports(res);
    } catch {
      setDestinationAirports([]);
    }
  };

  const onSubmit = async (data: any) => {
    const payload = {
      AirportCode: data.serviceAirport,
      Terminal: data.terminal,
      TravelDate: data.travelDate,
      PhoneNumber: data.phone,
      OriginAirportCode: data.originAirport,
      DestinationAirportCode: data.destinationAirport,
      PhoneCountryCode: countryPhoneCode,
      ServiceType: data.serviceType,
      AirportType: data.serviceType,
      IsTransit: true,
      Action: 1,
    };

    try {
      const response = await savePorterRequestDetails(payload);
      const orderId = encodeURIComponent(response[0].EncyptID);
      router.push(`/transit-service-request/${orderId}`);
    } catch (err) {
      console.error("Failed to save booking", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Service Type */}
        <FormField
          control={control}
          name="serviceType"
          rules={{ required: "Service type required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    // const service = services.find((s) => s.EncyptID === val);
                    // setSelectedService(service?.Name);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.EncyptID} value={s.EncyptID}>
                        {s.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {errors.serviceType && errors.serviceType.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Origin Airport */}
        <FormField
          control={control}
          name="originAirport"
          rules={{ required: "Please select origin airport." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origin Airport</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Search destination airport..."
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                  />
                  {queryAirports.length > 0 && (
                    <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-md border bg-white shadow">
                      {queryAirports.map((origin) => (
                        <li
                          key={origin.EncyptID}
                          className="cursor-pointer px-4 py-2 text-sm hover:bg-slate-100"
                          onClick={() => {
                            setOriginQuery(origin.Name);
                            field.onChange(origin.EncyptID);
                            setQueryAirports([]);
                          }}
                        >
                          {origin.Name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {errors.originAirport && errors.originAirport.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Services Airport */}
        <FormField
          control={control}
          name="serviceAirport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services Airport</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    setServicesAirport(val);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Destination Airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {allAirports.map((a) => (
                      <SelectItem key={a.EncyptID} value={a.EncyptID}>
                        {a.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {errors.serviceAirport && errors.serviceAirport.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Destination Airport */}
        <FormField
          control={control}
          name="destinationAirport"
          rules={{ required: "Please select destination airport." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Airport</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Search destination airport..."
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                  />
                  {destinationAirports.length > 0 && (
                    <ul className="absolute right-0 left-0 mt-2 max-h-48 overflow-y-auto rounded-md border bg-white shadow">
                      {destinationAirports.map((origin) => (
                        <li
                          key={origin.EncyptID}
                          className="cursor-pointer px-4 py-2 text-sm hover:bg-slate-100"
                          onClick={() => {
                            setDestinationQuery(origin.Name);
                            field.onChange(origin.EncyptID);
                            setDestinationAirports([]);
                          }}
                        >
                          {origin.Name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {errors.destinationAirport && errors.destinationAirport.message}
              </FormMessage>
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
                  inputClass={cn(
                    "w-full border rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200",
                  )}
                  buttonClass="!border-none"
                  enableSearch
                  disableDropdown={false}
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
