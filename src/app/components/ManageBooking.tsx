"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getManageMyBookingData } from "@/lib/api/requestBooking";
import BookingDetailsModal from "./BookingDetailModal";
import CancelBookingModal from "./CancelBookingModal";
import { ArrowRight } from "lucide-react";

type BookingForm = {
  bookingId: string;
  phoneNumber: string;
};

export default function ManageBooking() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>();
  const [bookingData, setBookingData] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const onSubmit = async (data: BookingForm) => {
    try {
      const res = await getManageMyBookingData(
        data.bookingId,
        data.phoneNumber,
      );
      if (res?.length) {
        setBookingData(res[0]);
        setShowBookingModal(true);
      } else {
        toast.error("Incorrect request id or phone number.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch booking data.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8"
      >
        {/* Booking ID */}
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="bookingId"
            className="mb-2 text-lg font-medium md:text-xl"
          >
            Booking ID:
          </label>
          <input
            id="bookingId"
            type="text"
            placeholder="Booking ID"
            maxLength={15}
            {...register("bookingId", { required: "Enter booking Id" })}
            className="w-full rounded-full border-none bg-white px-6 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none"
          />
          {errors.bookingId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.bookingId.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="phoneNumber"
            className="mb-2 text-lg font-medium md:text-xl"
          >
            Phone Number:
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            maxLength={10}
            {...register("phoneNumber", {
              required: "Enter phone number",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter valid phone number",
              },
            })}
            className="w-full rounded-full border-none bg-white px-6 py-2 shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus:outline-none"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group from-aps-secondary-500 to-aps-secondary-300 flex items-center justify-center gap-1 rounded-full border-[1px] border-white bg-gradient-to-r px-6 py-3 font-medium transition duration-300 hover:border-[1px] md:col-span-2"
        >
          <p className="text-sm transition-transform duration-300 group-hover:-translate-x-[5px] group-hover:text-white">
            SEARCH
          </p>
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-[5px] group-hover:text-white"
          />
        </button>
      </form>

      {/* Booking details modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="w-fit max-w-5xl rounded-xl p-6 md:p-8">
          <DialogTitle className="mb-4 text-2xl font-semibold">
            Booking Details
          </DialogTitle>
          <BookingDetailsModal
            bookingData={bookingData}
            onCancelClick={() => setShowCancelModal(true)}
            onClose={() => setShowBookingModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Cancel booking modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Service Cancellation Request</DialogTitle>
          <CancelBookingModal
            bookingData={bookingData}
            onClose={() => setShowCancelModal(false)}
            onSubmitted={() => {
              setShowCancelModal(false);
              setShowBookingModal(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
