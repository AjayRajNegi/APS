import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/RequestBooking";

export const savePorterRequestDetails = async (data: any) => {
  const res = await axios.post(`${BASE_URL}/savePorterRequestDetails`, data);
  return res.data;
};

export const getBookingReviewData = async (BookingId: string) => {
  const res = await axios.get(
    `${BASE_URL}/GetBookingReviewData?BookingId=${BookingId}`,
  );
  return res.data;
};

// Add more when needed (GetPlanInculsionDetail, payments, etc.)
