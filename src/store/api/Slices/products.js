import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
const productAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});
const initialState = productAdapter.getInitialState({});
export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/product/getAll`,
      transformResponse: (res) => {
        return productAdapter.setAll(initialState, res.allProducts);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((item) => ({ type: "product", id: item._id })),
              { type: "product", id: "LIST" },
            ]
          : [{ type: "product", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (id) => `/product/${id}`,
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsSlice;
const selectProductsResult = productsSlice.endpoints.getAllProducts.select();
const selectProductData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);
