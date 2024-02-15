/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    prepareHeaders: (headers) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: [
    "products",
    "product",
    "user",
    "Cart",
    "order",
    "wishlist",
    "category",
    "subCategory",
  ],
  endpoints: (builder) => ({}),
});
