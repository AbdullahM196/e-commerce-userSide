import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./carousels.css";
import PropTypes from "prop-types";
import SubCategory from "../subCategoryCards/SubCategory";
import ProductsCard from "../productCard/ProductsCard";
import "../Cards/cards.css";
export default function Carousels({ autoWidth, perPage, data, title }) {
  return (
    <Splide
      tag="section"
      options={{
        type: "loop",
        rewind: true,
        drag: "free",
        pauseOnHover: true,
        perPage: perPage,
        perMove: 1,
        speed: 1000,
        width: "100%",
        height: title == "SubCategory" ? "150px" : "425.66px",
        pagination: false,
        padding: "0px",
        autoWidth: autoWidth,
        gap: title == "productsCards" ? "10px" : "",
      }}
      aria-label="My Favorite Images"
    >
      {data?.map((item) => {
        return (
          <SplideSlide
            key={item._id}
            className={
              title !== "productsCards"
                ? "d-flex justify-content-center align-items-center"
                : ""
            }
            id={title == "productsCards" ? "cards" : ""}
          >
            <div
              className={
                title !== "productsCards"
                  ? "d-flex flex-column w-100 h-100 align-items-center"
                  : ""
              }
            >
              {title == "SubCategory" ? (
                <SubCategory item={item} />
              ) : (
                <ProductsCard key={item._id} data={item} />
              )}
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}

Carousels.propTypes = {
  perPage: PropTypes.number,
  autoPlay: PropTypes.bool,
  data: PropTypes.array,
  title: PropTypes.string,
  autoWidth: PropTypes.bool,
};
