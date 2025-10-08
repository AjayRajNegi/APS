"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getManageMyBookingData } from "@/lib/api/requestBooking";
import BookingDetailsModal from "./BookingDetailModal";
import CancelBookingModal from "./CancelBookingModal";

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
    <section
      id="manage-booking"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 md:flex-row"
    >
      <div className="hidden w-1/2 md:block">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=874&q=80"
          alt="Booking"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          MANAGE MY BOOKING
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1 block font-medium">Booking ID *</label>
            <Input
              {...register("bookingId", { required: "Enter booking Id" })}
              placeholder="Booking ID"
              maxLength={15}
            />
            {errors.bookingId && (
              <p className="text-sm text-red-500">{errors.bookingId.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Phone Number *</label>
            <Input
              {...register("phoneNumber", {
                required: "Enter phone number",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid phone number",
                },
              })}
              placeholder="Phone Number"
              maxLength={10}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            SEARCH NOW
          </Button>
        </form>
      </div>

      {/* Booking details modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Booking Details</DialogTitle>
          <BookingDetailsModal
            bookingData={bookingData}
            onCancelClick={() => setShowCancelModal(true)}
            onClose={() => setShowBookingModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Cancel booking modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent className="max-w-lg">
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
    </section>
  );
}
