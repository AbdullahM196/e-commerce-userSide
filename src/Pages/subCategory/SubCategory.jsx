import { useParams } from "react-router-dom";
import "./subCategory.css";
import Cards from "../../components/Cards/Cards";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useGetSearchQuery } from "../../store/api/Slices/search";
import Filtration from "../../components/Filteration/Filtration";
import { useState } from "react";
export default function SubCategory() {
  const { id } = useParams();
  const [priceRange, setPriceRange] = useState("");
  const [specifications, setSpecifications] = useState("");
  const { data, isLoading, isSuccess, isError, error } = useGetSearchQuery(
    `subCategory=${id}&specifications=${specifications}&price=${priceRange}`
  );

  const { data: products, isSuccess: productSuccess } = useGetSearchQuery(
    `subCategory=${id}`
  );

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <Error error={error} />;
  } else if (isSuccess) {
    if (data.length > 0) {
      content = <Cards data={data} />;
    } else {
      content = <div>No Products Found</div>;
    }
  }
  return (
    <div id="subCategoryPage">
      {productSuccess && (
        <>
          <Filtration
            data={products}
            priceRange={priceRange}
            specifications={specifications}
            setPriceRange={setPriceRange}
            setSpecifications={setSpecifications}
          />
        </>
      )}
      <div>
        {isSuccess && (
          <span className="w-100 d-flex justify-content-center">
            {priceRange && (
              <h5>
                Price{" "}
                {priceRange
                  .replace(",", " to ")
                  .replace("price>=", "more than ")}
              </h5>
            )}
          </span>
        )}
        {content}
      </div>
    </div>
  );
}
