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
    getUserBooking:builder.query({
      query:()=>{
        return{
          url:`/my-bookings`,
          method:"GET"
        }
      }
    })
  }),
});

export const { useGetAllBookingQuery,useGetUserBookingQuery } = bookingApi;
