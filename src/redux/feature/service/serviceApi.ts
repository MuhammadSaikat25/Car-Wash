import { baseApi } from "../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "services",
        method: "GET",
      }),
    }),
  }),
});
export const {useGetServicesQuery} = serviceApi;
