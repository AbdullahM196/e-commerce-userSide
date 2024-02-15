import ProductsCard from "../productCard/ProductsCard";
import "./cards.css";
import PropTypes from "prop-types";
export default function Cards({ data }) {
  const products = data;
  return (
    <div id="cards">
      {products?.map((item) => {
        return <ProductsCard key={item._id} data={item} />;
      })}
    </div>
  );
}

Cards.propTypes = {
  data: PropTypes.array,
};
