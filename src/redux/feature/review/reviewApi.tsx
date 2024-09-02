import { baseApi } from "../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: ({ reviewData }) => {
        return {
          url: "/review",
          method: "POST",
          body: reviewData,
        };
      },
    }),
    getReviews: builder.query({
      query: () => {
        return {
          url: "/get-all-reviews",
          method: "GET",
        };
      },
    }),
  }),
});

export const { usePostReviewMutation,useGetReviewsQuery } = reviewApi;
