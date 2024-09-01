import { baseApi } from "../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: () => {
        return {
          url: "slots/availability",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["slot"],
    }),
    updateSlot: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/updateSlot/${id}/${status}`,
          method: "PUT",
          body: status,
        };
      },
    }),
    createSlot: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/services/slots`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["slot"],
    }),
  }),
});

export const { useGetAllSlotQuery, useUpdateSlotMutation,useCreateSlotMutation } = slotApi;
