import api from "../axios";

const API_PATH = "/api/RequestBooking";

export const savePorterRequestDetails = async (objdata: any) => {
  const res = await api.post(`${API_PATH}/savePorterRequestDetails`, objdata);
  return res.data;
};

export const getBookingReviewData = async (BookingId: string) => {
  const res = await api.get(
    `${API_PATH}/GetBookingReviewData?BookingId=${BookingId}`,
  );
  return res.data;
};

export const GetPlanInculsionDetail = async (
  PPCId: string,
  RequestId: string,
) => {
  const res = await api.get(
    `${API_PATH}/GetPlanInculsionDetail?PPCId=${PPCId}&RequestId=${RequestId}`,
  );
  return res.data;
};

export const GetPlanInculsionDetailForTransit = async (TPAId: string) => {
  const res = await api.get(
    `${API_PATH}/GetPlanInculsionDetailForTransit?TPAId=${TPAId}`,
  );
  return res.data;
};

export const getAirportPorterDetail = async (
  requestId: string,
  type: number,
) => {
  const res = await api.get(
    `${API_PATH}/getAirportPorterDetailForReview?requestId=${requestId}&type=${type}`,
  );
  return res.data;
};

export const applyDiscountCoupon = async (
  RequestId: string,
  CouponCode: string,
  PorterPlanId: string,
) => {
  const res = await api.get(
    `${API_PATH}/applyDiscountCoupon?RequestId=${RequestId}&CouponCode=${CouponCode}&PorterPlanId=${PorterPlanId}`,
  );
  return res.data;
};

export const getPaymentResponseDetails = async (
  requestId: string,
  orderId: string,
) => {
  const res = await api.get(
    `${API_PATH}/getPaymentResponseDetails?requestId=${requestId}&orderId=${orderId}`,
  );
  return res.data;
};

//-------------------Start Manage My Booking----------------------------------

export const getManageMyBookingData = async (
  BookingId: string,
  PhoneNumber: string,
) => {
  const res = await api.get(
    `${API_PATH}/GetManageMyBookingDetails?BookingId=${BookingId}&PhoneNumber=${PhoneNumber}`,
  );
  return res.data;
};

export const invoiceDownloadFile = async (fileName: string) => {
  const res = await api.get(`${API_PATH}/invoiceDownload?fileName=${fileName}`);
  return res.data;
};

export const getRazorPaymentDetails = async (
  requestId: string,
  orderId: string,
) => {
  const res = await api.get(
    `${API_PATH}/getRazorPaymentDetails?requestId=${requestId}&orderId=${orderId}`,
  );
  return res.data;
};

export const updateRazorPaymentDetails = async (objdata: any) => {
  const res = await api.post(`${API_PATH}/updateRazorPaymentDetails`, objdata);
  return res.data;
};

export const saveFailedTransactionDetails = async (objdata: any) => {
  const res = await api.post(
    `${API_PATH}/saveFailedTransactionDetails`,
    objdata,
  );
  return res.data;
};

export const UpdateCancelPorterBookingDetails = async (
  objBookingModel: any,
) => {
  const res = await api.post(
    `${API_PATH}/updateCancelManageMyBookingDetails`,
    objBookingModel,
  );
  return res.data;
};

//-------------------End Manage My Booking----------------------------------

export const MakeOfflineBookingPayment = async (
  BookingId: string,
  GrandTotal: any,
  DiscountAmount: any,
  CouponCode: any,
) => {
  const res = await api.get(
    `${API_PATH}/makeOfflineBookingPayment?BookingId=${BookingId}&GrandTotal=${GrandTotal}&DiscountAmount=${DiscountAmount}&CouponCode=${CouponCode}`,
  );
  return res.data;
};
