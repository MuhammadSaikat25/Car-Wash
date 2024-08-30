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
      providesTags: ["services"],
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
    postService: builder.mutation({
      query: (data) => {
        return {
          url: "services",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    updateService: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/services/${id}`,
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => {
        console.log(id)
        return {
          url: `/services/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useGetServiceSlotQuery,
  usePostServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
