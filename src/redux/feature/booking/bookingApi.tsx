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
    getUserBooking: builder.query({
      query: () => {
        return {
          url: `/my-bookings`,
          method: "GET",
        };
      },
    }),
    getStripePk: builder.query({
      query: () => {
        return {
          url: "/payment/stripePk",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    cratePayment: builder.mutation({
      query: (amount) => {
        return {
          url: "/payment",
          method: "POST",
          body: amount,
          credentials: "include",
        };
      },
    }),
    crateOrder: builder.mutation({
      query : ({ paymentInfo }) => {
        return {
          url: "/bookings",
          method: "POST",
          body: {
            paymentInfo,
          },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useGetUserBookingQuery,
  useCratePaymentMutation,
  useGetStripePkQuery,
  useCrateOrderMutation,
} = bookingApi;
