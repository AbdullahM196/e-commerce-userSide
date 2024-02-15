import { apiSlice } from "../apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeAnOrder: builder.mutation({
      query: (data) => ({
        url: "/order/makeAnOrder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "order", id: arg.id }, "Cart"];
      },
    }),
    getOrders: builder.query({
      query: () => "/order/getOrders",
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => {
        if (!error && result !== undefined) {
          return [
            { type: "order", id: "LIST" },
            ...(result
              ? result.map((item) => ({ type: "order", id: item._id }))
              : []),
          ];
        }
      },
    }),
    getMostSoled: builder.query({
      query: () => "/order/mostSold",
      transformResponse: (res) => {
        const products = res.map((item) => item.productDetail);
        return products;
      },
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/order/cancel/${id}`,
        method: "PATCH",
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "order", id: arg.id }, "Cart"];
      },
    }),
  }),
});
export const {
  useMakeAnOrderMutation,
  useGetOrdersQuery,
  useGetMostSoledQuery,
  useCancelOrderMutation,
} = orderSlice;
