"use client";

import { Button } from "@/components/ui/button";

interface Props {
  bookingData: any;
  onCancelClick: () => void;
  onClose: () => void;
}

export default function BookingDetailsModal({
  bookingData,
  onCancelClick,
}: Props) {
  if (!bookingData) return null;

  return (
    <div className="w-fit">
      {/* Table Container (scrollable on small screens) */}
      <div className="w-fit overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-fit border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700">
              <th className="border-b border-gray-200 p-3">Booking ID</th>
              <th className="border-b border-gray-200 p-3">Guest Name</th>
              <th className="border-b border-gray-200 p-3">Phone No</th>
              <th className="border-b border-gray-200 p-3">Email ID</th>
              <th className="border-b border-gray-200 p-3">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr className="transition-colors hover:bg-gray-50">
              <td className="border-b border-gray-100 p-3">
                {bookingData.RequestId}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.GuestName}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.PhoneNumber}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.GuestEmailId}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.GuestAge}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
        {bookingData.InvoiceNumber && (
          <a
            href={`http://admin.airportporterservice.ae/uploaddata/EmailPDFupload/${bookingData.RequestId}_Invoice.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline transition hover:text-blue-700"
          >
            Download Invoice
          </a>
        )}

        {bookingData.CancelStatus && (
          <Button
            onClick={onCancelClick}
            className="rounded-full bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Cancel My Booking
          </Button>
        )}
      </div>
    </div>
  );
}
