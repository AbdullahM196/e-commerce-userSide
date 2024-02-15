import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
const favAdapter = createEntityAdapter({
  selectId: (item) => item._id,
});
const initialState = favAdapter.getInitialState({});
export const favoriteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => `/favorite/getFavorites`,
      transformResponse: (res) => {
        return res?.products
          ? favAdapter.setAll(initialState, res.products)
          : initialState;
      },
      providesTags: (result, error, args) => {
        if (!error && result !== undefined) {
          return [
            { type: "favorite", id: "LIST" },
            ...(result.ids
              ? result.ids.map((id) => ({
                  type: "favorite",
                  id,
                }))
              : []),
          ];
        } else {
          return [{ type: "favorite", id: "LIST" }];
        }
      },
    }),
    addToFavorites: builder.mutation({
      query: (data) => ({
        url: "/favorite/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "favorite", id: arg.id },
      ],
    }),
    removeFromFavorites: builder.mutation({
      query: (id) => ({
        url: `/favorite/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "favorite", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = favoriteSlice;

const selectFavoriteResult = favoriteSlice.endpoints.getFavorites.select();

const selectFavoriteData = createSelector(
  selectFavoriteResult,
  (favoriteResult) => favoriteResult.data
);
export const {
  selectAll: selectAllFavorites,
  selectById: selectFavoriteById,
  selectIds: selectFavoriteIds,
} = favAdapter.getSelectors(
  (state) => selectFavoriteData(state) ?? initialState
);
