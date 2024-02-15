import PropTypes from "prop-types";
import "./subCategory.css";
import { useNavigate } from "react-router-dom";
export default function SubCategory({ item }) {
  console.log({ item });
  const navigate = useNavigate();
  return (
    <div
      className="subCategoryCard"
      onClick={() => {
        navigate(`subCategory/${item.name}`);
      }}
    >
      <img src={item.img.url} alt={item.name} />
      <h3>{item.name}</h3>
    </div>
  );
}

SubCategory.propTypes = {
  item: PropTypes.object,
};
