"use client";
import { useForm } from "react-hook-form";
import { useBookingStore } from "@/store/booking";
import { savePorterRequestDetails } from "@/lib/api/requestBooking";
import { useRouter } from "next/navigation";

export default function InternationalForm() {
  const router = useRouter();
  const { setDomestic } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setDomestic(data);

    // Example payload like Angular objData
    const payload = {
      AirportCode: data.origin,
      DestinationAirportCode: data.destination,
      Terminal: data.terminal,
      TravelDate: data.travelDate,
      PhoneNumber: data.phone,
      PhoneCountryCode: "in",
      ServiceType: data.serviceType,
      AirportType: data.airportType,
      IsTransit: false,
      Action: 1,
    };

    await savePorterRequestDetails(payload);

    router.push("/review"); // redirect to review page
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("origin", { required: true })}
        placeholder="Origin"
        className="w-full border p-2"
      />
      {errors.origin && <p className="text-red-500">Origin required</p>}

      <input
        {...register("destination", { required: true })}
        placeholder="Destination"
        className="w-full border p-2"
      />
      {errors.destination && (
        <p className="text-red-500">Destination required</p>
      )}

      <input
        {...register("terminal", { required: true })}
        placeholder="Terminal"
        className="w-full border p-2"
      />
      <input
        type="date"
        {...register("travelDate", { required: true })}
        className="w-full border p-2"
      />
      <input
        type="tel"
        {...register("phone", { required: true })}
        placeholder="Phone"
        className="w-full border p-2"
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Book Now
      </button>
    </form>
  );
}
