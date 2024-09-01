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
      query: ({ id, role, jwt }) => {
        return {
          url: `/update-role/${id}`,
          method: "PUT",
          body: { role },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ email, data }) => {
        console.log({ email, data });
        return {
          url: `/update-profile/${email}`,
          method: "PUT",
          body: data,
        };
      },
    }),
    getMe: builder.query({
      query: (email) => {
        console.log(email)
        return {
          url: `/getMe/${email}`,
          method: "GET",
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
  useUpdateProfileMutation,
  useGetMeQuery
} = authApi;
