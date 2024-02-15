import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
const cartAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});
const initialState = cartAdapter.getInitialState({});
export const userCartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart/getCart",
      transformResponse: (responseData) => {
        return cartAdapter.setOne(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        // console.log(result);
        if (!error && result !== undefined) {
          return [
            { type: "Cart", id: "LIST" },
            ...(result.ids
              ? result.ids.map((id) => ({ type: "Cart", id }))
              : []),
          ];
        } else {
          return [{ type: "Cart", id: "LIST" }];
        }
      },
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/addToCart",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: (result, error, arg) => [{ type: "Cart", id: arg.id }],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Cart", id: arg.id }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = userCartSlice;
const selectCartResult = userCartSlice.endpoints.getCart.select();
const selectCartData = createSelector(
  selectCartResult,
  (cartResult) => cartResult.data
);
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartById,
  selectIds: selectCartIds,
} = cartAdapter.getSelectors((state) => selectCartData(state) ?? initialState);
