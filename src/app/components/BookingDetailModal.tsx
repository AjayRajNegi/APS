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
  console.log(bookingData);

  return (
    <div className="w-fit">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Desktop / Tablet View */}
        <table className="hidden w-full min-w-[700px] border-collapse text-sm md:table md:text-base">
          <tbody>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700">
              <th className="border-b border-gray-200 p-3">Booking ID</th>
              <th className="border-b border-gray-200 p-3">Guest Name</th>
              <th className="border-b border-gray-200 p-3">Phone No</th>
              <th className="border-b border-gray-200 p-3">Email ID</th>
              <th className="border-b border-gray-200 p-3">Age</th>
            </tr>
            <tr className="hover:bg-gray-50">
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

            <tr className="bg-gray-100 font-semibold text-gray-700">
              <th className="border-b border-gray-200 p-3">Flight</th>
              <th className="border-b border-gray-200 p-3">Service Type</th>
              <th className="border-b border-gray-200 p-3">Terminal</th>
              <th className="border-b border-gray-200 p-3">Flight No</th>
              <th className="border-b border-gray-200 p-3">Flight Time</th>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border-b border-gray-100 p-3">
                {bookingData.AirportType}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.ServiceType}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.Terminal}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.FlightNo}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.FlightTime}
              </td>
            </tr>

            <tr className="bg-gray-100 font-semibold text-gray-700">
              <th className="border-b border-gray-200 p-3">Number of Porter</th>
              <th className="border-b border-gray-200 p-3">Plan</th>
              <th className="border-b border-gray-200 p-3">Payment Status</th>
              <th className="border-b border-gray-200 p-3">Travel Date</th>
              <th className="border-b border-gray-200 p-3">Invoice No</th>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border-b border-gray-100 p-3">
                {bookingData.NumberPorterRequired}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.PlanName}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.PaymentStatus}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.TravelDate}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.InvoiceNumber}
              </td>
            </tr>

            <tr className="bg-gray-100 font-semibold text-gray-700">
              <th className="border-b border-gray-200 p-3">Total Amount</th>
              <th className="border-b border-gray-200 p-3">Exec. Number</th>
              <th className="border-b border-gray-200 p-3" colSpan={3}>
                Airport Name
              </th>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border-b border-gray-100 p-3">
                {bookingData.TotalAmount}
              </td>
              <td className="border-b border-gray-100 p-3">
                {bookingData.ExecutiveNumber}
              </td>
              <td className="border-b border-gray-100 p-3" colSpan={3}>
                {`${bookingData.AirportName} (${bookingData.AirportCode})`}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="space-y-3 p-4 md:hidden">
          {[
            { label: "Booking ID", value: bookingData.RequestId },
            { label: "Guest Name", value: bookingData.GuestName },
            { label: "Phone No", value: bookingData.PhoneNumber },
            { label: "Email ID", value: bookingData.GuestEmailId },
            { label: "Age", value: bookingData.GuestAge },
            { label: "Flight", value: bookingData.AirportType },
            { label: "Service Type", value: bookingData.ServiceType },
            { label: "Terminal", value: bookingData.Terminal },
            { label: "Flight No", value: bookingData.FlightNo },
            { label: "Flight Time", value: bookingData.FlightTime },
            {
              label: "Number of Porter",
              value: bookingData.NumberPorterRequired,
            },
            { label: "Plan", value: bookingData.PlanName },
            { label: "Payment Status", value: bookingData.PaymentStatus },
            { label: "Travel Date", value: bookingData.TravelDate },
            { label: "Invoice No", value: bookingData.InvoiceNumber },
            { label: "Total Amount", value: bookingData.TotalAmount },
            { label: "Exec. Number", value: bookingData.ExecutiveNumber },
            {
              label: "Airport Name",
              value: `${bookingData.AirportName} (${bookingData.AirportCode})`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="m-0 flex justify-between gap-10 overflow-scroll border-b border-gray-100 pb-1 text-sm"
            >
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}
        </div>
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
