import { apiSlice } from "../apiSlice";

export const subCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query({
      query: () => `/subCategory/`,
      providesTags: ["subCategory"],
      transformResponse: (res) => {
        return res;
      },
    }),
    getSubCategory: builder.query({
      query: (id) => `/subCategory/${id}`,
      providesTags: ["subCategory"],
    }),
  }),
});

export const { useGetAllSubCategoriesQuery, useGetSubCategoryQuery } =
  subCategorySlice;
