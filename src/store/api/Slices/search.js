import { apiSlice } from "../apiSlice";
export const searchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (searchValue) => ({
        url: `/search`,
        method: "GET",
        params: searchValue,
      }),
      transformResponse: (responseData) => {
        return responseData.products;
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map((item) => ({ type: "search", id: item._id })),
              { type: "search", id: "LIST" },
            ]
          : [{ type: "search", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetSearchQuery } = searchSlice;
