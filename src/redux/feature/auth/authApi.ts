import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
          credentials: "include",
        };
      },
    }),
    sing_up: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: "get-all-user",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/update-role/${id}`,
          method: "PUT",
          body: { role },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSing_upMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
} = authApi;
