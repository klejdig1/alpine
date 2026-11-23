import {
  getLocalBookings,
  getLocalBooking,
  getLocalBookingsAfterDate,
  getLocalStaysAfterDate,
  getLocalStaysTodayActivity,
  updateLocalBooking,
  deleteLocalBooking,
} from "./localBackend.js";

export const getBookings = getLocalBookings;
export const getBooking = getLocalBooking;
export const getBookingsAfterDate = getLocalBookingsAfterDate;
export const getStaysAfterDate = getLocalStaysAfterDate;
export const getStaysTodayActivity = getLocalStaysTodayActivity;
export const updateBooking = updateLocalBooking;
export const deleteBooking = deleteLocalBooking;
