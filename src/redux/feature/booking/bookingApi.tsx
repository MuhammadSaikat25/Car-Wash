import { baseApi } from "../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => {
        return {
          url: "/bookings",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllBookingQuery } = bookingApi;
