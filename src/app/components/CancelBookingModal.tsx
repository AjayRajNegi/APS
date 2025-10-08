"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { UpdateCancelPorterBookingDetails } from "@/lib/api/requestBooking";

interface Props {
  bookingData: any;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function CancelBookingModal({
  bookingData,
  onClose,
  onSubmitted,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ cancelReason: string }>();

  const onSubmit = async (data: { cancelReason: string }) => {
    try {
      const model = {
        RequestId: bookingData.RequestId,
        CancelRemarks: data.cancelReason,
        FirstName: bookingData.GuestFirstName,
        GuestEmailId: bookingData.GuestEmailId,
        Action: 1,
      };

      const res = await UpdateCancelPorterBookingDetails(model);

      if (res[0]?.ErrorNumber === "1") {
        toast.success(res[0].ErrorMessage);
        reset();
        onSubmitted();
      } else {
        toast.error(res[0]?.ErrorMessage || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Service Cancellation Request</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          {...register("cancelReason", { required: "Enter cancel reason" })}
          placeholder="Enter Remarks"
        />
        {errors.cancelReason && (
          <p className="text-sm text-red-500">{errors.cancelReason.message}</p>
        )}

        <Button type="submit" className="w-full">
          Submit
        </Button>

        <div className="mt-3 space-y-1 text-xs text-gray-600">
          <p>
            1. Cancellation of services within 48 hrs prior — 50% charged
            (excluding processing fee)
          </p>
          <p>2. Less than 24 hrs to scheduled arrival — non-refundable</p>
          <p>Refunds processed within 15 days from cancellation.</p>
        </div>
      </form>

      <div className="mt-6 text-right">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
