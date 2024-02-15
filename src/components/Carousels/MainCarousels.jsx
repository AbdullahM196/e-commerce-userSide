import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./carousels.css";
import PropTypes from "prop-types";

export default function MainCarousels({ offers }) {
  return (
    <Splide
      tag="section"
      options={{
        autoplay: true,
        speed: 1000,
        type: "loop",
        rewind: true,
        drag: "free",
        pauseOnHover: true,
        perPage: 1,
        perMove: 1,
        width: "100%",
        height: "425.66px",
        pagination: false,
        padding: "0px",
      }}
      aria-label="My Favorite Images"
    >
      {offers?.map((offer) => {
        return (
          <SplideSlide
            key={offer._id}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={offer.img.url} alt="img" />
          </SplideSlide>
        );
      })}
    </Splide>
  );
}

MainCarousels.propTypes = {
  offers: PropTypes.array,
};
