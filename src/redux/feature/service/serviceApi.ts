import { baseApi } from "../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ selectedDuration = [], search = "", sortOrder }) => {
        const durationArray = Array.isArray(selectedDuration)
          ? selectedDuration
          : [];
        const params = new URLSearchParams();
        if (search) {
          params.append("search", search);
        }
        const durationString = durationArray.map(Number).join(",");
        if (durationString) {
          params.append("selectedDuration", durationString);
        }
        params.append("sort", sortOrder);
        return {
          url: `services?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getSingleService: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getServiceSlot: builder.query({
      query: (id) => {
        return {
          url: `/serviceSlot/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetServicesQuery, useGetSingleServiceQuery,useGetServiceSlotQuery } = serviceApi;
