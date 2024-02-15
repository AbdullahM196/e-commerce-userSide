import { apiSlice } from "../apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
const offerAdapter = createEntityAdapter({
  selectId: (offer) => offer._id,
});
const initialState = offerAdapter.getInitialState({});
export const offers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => `/mainPage/getAllOffers`,
      providesTags: ["offers"],
      transformResponse: (responseData) => {
        return offerAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetOffersQuery } = offers;

const selectOffersResult = offers.endpoints.getOffers.select();

const selectOffersData = createSelector(
  selectOffersResult,
  (offersResult) => offersResult.data
);

export const {
  selectAll: selectAllOffers,
  selectById: selectOfferById,
  selectIds: selectOfferIds,
} = offerAdapter.getSelectors(
  (state) => selectOffersData(state) ?? initialState
);
