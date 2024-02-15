import "./cards.css";
import egPhoto from "../../assets/eg.svg";
import { FaPlus, FaMinus } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../store/api/Slices/Cart";
import useWidth from "../GetWidthHook/useWidth";
export default function CartCards({
  subCategory,
  price,
  title,
  img,
  specifications,
  quantity,
  id,
}) {
  const screenWidth = useWidth();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const navigate = useNavigate();
  async function handleAddToCart() {
    try {
      await addToCart({ product: id }).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  async function handleRemoveItem() {
    try {
      await removeFromCart(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div
      className="CartCard"
      onClick={() => {
        navigate(`/product/${id}`);
      }}
    >
      <div className="cartLiftSide">
        <img src={img ? img : egPhoto} alt={title} />
      </div>
      <div className="cartRightSide">
        <p className="subCategoryName">{subCategory}</p>
        <p className="title">
          {screenWidth < 500 ? title.substring(0, 15) + "..." : title}
        </p>
        <div className="spics">
          <ul>
            {Object.keys(specifications).map((item) => {
              return (
                <li key={item}>
                  {item} :{" "}
                  {screenWidth < 500
                    ? specifications[item].substring(0, 15) + "..."
                    : specifications[item]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bottom">
          <span
            className="editCart"
            onClick={(evt) => {
              evt.stopPropagation();
            }}
          >
            <span onClick={handleRemoveItem}>
              <FaMinus />
            </span>
            <span className="number">{quantity}</span>
            <span onClick={handleAddToCart}>
              <FaPlus />
            </span>
          </span>
          <span className="price">
            <small>EGP </small>
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}
CartCards.propTypes = {
  subCategory: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.string,
  quantity: PropTypes.number,
  specifications: PropTypes.object,
  id: PropTypes.string,
};
