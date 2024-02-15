import "./home.css";
import { useGetAllSubCategoriesQuery } from "../../store/api/Slices/subCategory";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import {
  selectAllOffers,
  useGetOffersQuery,
} from "../../store/api/Slices/Offers";
import { useGetSearchQuery } from "../../store/api/Slices/search";
import Carousels from "../../components/Carousels/Carousels";
import { useGetMostSoledQuery } from "../../store/api/Slices/orders";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import MainCarousels from "../../components/Carousels/MainCarousels";
import useWidth from "../../components/GetWidthHook/useWidth";
export default function Home() {
  const screenWidth = useWidth();
  const perPage =
    screenWidth > 1536
      ? 7
      : screenWidth > 1386
      ? 6
      : screenWidth > 1159
      ? 5
      : screenWidth > 940
      ? 4
      : screenWidth > 711
      ? 3
      : screenWidth > 480
      ? 2
      : 1;
  const offers = useSelector(selectAllOffers);
  const { isSuccess: offersSuccess } = useGetOffersQuery();
  const { isLoading, isSuccess, data, isError, error } =
    useGetAllSubCategoriesQuery();

  const { data: newestItems, isSuccess: newestSuccess } = useGetSearchQuery(
    "sort=-createdAt&limit=10"
  );
  const newestItemsMemo = useMemo(() => {
    return newestSuccess && newestItems;
  }, [newestSuccess, newestItems]);

  const { data: highestDiscount, isSuccess: hDiscountSuccess } =
    useGetSearchQuery("sort=-price.discount&limit=10");
  const highestDiscountMemo = useMemo(() => {
    return hDiscountSuccess && highestDiscount;
  }, [hDiscountSuccess, highestDiscount]);

  const { data: mostSoled, isSuccess: mostSoledSuccess } =
    useGetMostSoledQuery();
  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error err={error} />
  ) : (
    <div className="home">
      {offersSuccess && <MainCarousels offers={offers} />}
      {isSuccess && (
        <Carousels
          perPage={screenWidth > 430 ? 4 : screenWidth > 314 ? 3 : 2}
          autoPlay={false}
          data={data}
          title={"SubCategory"}
        />
      )}
      <div className="container-fluid w-100">
        <h2>New Arrivals</h2>
        {newestSuccess && (
          <Carousels
            title={"productsCards"}
            perPage={perPage}
            autoPlay={false}
            data={newestItemsMemo}
            autoWidth={screenWidth < 900 ? true : false}
          />
        )}
      </div>
      <div className="container-fluid w-100">
        <h2>BEST SELLING DEALS</h2>
        {hDiscountSuccess && (
          <Carousels
            title={"productsCards"}
            perPage={perPage}
            autoPlay={false}
            data={highestDiscountMemo}
            autoWidth={screenWidth < 900 ? true : false}
          />
        )}
      </div>
      <div className="container-fluid w-100">
        <h2>Best Seller</h2>
        {mostSoledSuccess && (
          <Carousels
            title={"productsCards"}
            perPage={perPage}
            autoPlay={false}
            data={mostSoled}
            autoWidth={screenWidth < 900 ? true : false}
          />
        )}
      </div>
    </div>
  );
}
