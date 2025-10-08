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
  onClose,
}: Props) {
  if (!bookingData) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Booking Details</h2>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <tbody>
            <tr className="bg-gray-100 font-medium">
              <td>Booking Id</td>
              <td>Guest Name</td>
              <td>Phone No</td>
              <td>Email ID</td>
              <td>Age</td>
            </tr>
            <tr>
              <td>{bookingData.RequestId}</td>
              <td>{bookingData.GuestName}</td>
              <td>{bookingData.PhoneNumber}</td>
              <td>{bookingData.GuestEmailId}</td>
              <td>{bookingData.GuestAge}</td>
            </tr>
            {/* Add other table rows like in Angular */}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {bookingData.InvoiceNumber && (
          <a
            href={`http://admin.airportporterservice.ae/uploaddata/EmailPDFupload/${bookingData.RequestId}_Invoice.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Invoice Download
          </a>
        )}

        {bookingData.CancelStatus && (
          <Button onClick={onCancelClick}>Cancel My Booking</Button>
        )}
      </div>
    </div>
  );
}
