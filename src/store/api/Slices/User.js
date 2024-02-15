import { apiSlice } from "../apiSlice";
import { store } from "../../store";
import { setAuthenticated } from "./isAuthenticated";
import { userCartSlice } from "./Cart";
import { favoriteSlice } from "./favorites";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      transformResponse(res) {
        store.dispatch(setAuthenticated(true));
        store.dispatch(authSlice.endpoints.getUser.initiate());
        store.dispatch(userCartSlice.endpoints.getCart.initiate());
        store.dispatch(favoriteSlice.endpoints.getFavorites.initiate());
        return res;
      },
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      transformResponse(res) {
        store.dispatch(setAuthenticated(true));
        store.dispatch(authSlice.endpoints.getUser.initiate());
        store.dispatch(userCartSlice.endpoints.getCart.initiate());
        store.dispatch(favoriteSlice.endpoints.getFavorites.initiate());
        return res;
      },
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      transformResponse(res) {
        store.dispatch(setAuthenticated(false));
        return res;
      },
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: () => "/user/profile",
      transformResponse: (res) => {
        store.dispatch(setAuthenticated(true));
        return res;
      },
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/editProfile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authSlice;
