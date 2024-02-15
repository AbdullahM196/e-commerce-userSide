import "./productCards.css";
import PropTypes from "prop-types";
import { IoStarSharp, IoStorefront } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  selectAllCartItems,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../store/api/Slices/Cart";
import CartIcon from "./cartIcon";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "../../store/api/Slices/Cart";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  selectFavoriteIds,
} from "../../store/api/Slices/favorites";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "../../store/api/Slices/isAuthenticated";
export default function ProductsCard({ data }) {
  const isAuth = useSelector(selectAuthStatus);
  const MySwal = withReactContent(Swal);
  const [showEditCart, setShowEditCart] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [number, setNumber] = useState(0);
  const { isSuccess, isError, error } = useGetCartQuery();
  let cart = useSelector(selectAllCartItems);
  cart = isSuccess && cart.length > 0 && cart[0].products;
  useEffect(() => {
    if (isAuth && isSuccess && cart?.length > 0) {
      const findProduct = cart?.find((item) => {
        return item.product._id === data?._id;
      });
      if (findProduct) {
        setNumber(findProduct.quantity);
        setInCart(true);
      } else {
        setInCart(false);
        setNumber(0);
      }
    }
    if (isAuth && isError) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data.message,
      });
    }
  }, [isAuth, isSuccess, cart, isError, error, data._id, MySwal]);
  const navigate = useNavigate();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  async function handleAddToCart() {
    if (isAuth) {
      try {
        await addToCart({ product: data._id }).unwrap();
      } catch (err) {
        console.log(err);
      }
    } else {
      MySwal.fire({
        title: "Please login to Add item to your favorite",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }
  async function handleRemoveItem() {
    if (isAuth) {
      try {
        await removeFromCart(data._id).unwrap();
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
        });
      }
    } else {
      MySwal.fire({
        title: "Please login to Add item to your favorite",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }
  const [inFavorite, setInFavorite] = useState(false);
  const favIds = useSelector(selectFavoriteIds);

  const {
    isSuccess: favSuccess,
    isError: favIsError,
    error: favError,
  } = useGetFavoritesQuery();
  useEffect(() => {
    if (isAuth && favSuccess) {
      const findProduct = favIds.find((item) => item === data._id);
      setInFavorite(findProduct ? true : false);
    } else if (isAuth && favIsError) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: favError.data.message,
      });
    }
  }, [isAuth, MySwal, favIsError, favError, favIds, favSuccess, data._id]);
  const [addToFavorites] = useAddToFavoritesMutation();
  async function handleAddToFavorite(evt) {
    evt.stopPropagation();
    if (isAuth) {
      try {
        await addToFavorites({ product: data._id }).unwrap();
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
        });
      }
    } else {
      MySwal.fire({
        title: "Please login to Add item to your favorite",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  async function handleRemoveFavorite(evt) {
    evt.stopPropagation();
    if (isAuth) {
      try {
        await removeFromFavorites(data._id).unwrap();
      } catch (err) {
        console.log(err);
      }
    } else {
      MySwal.fire({
        title: "Please login to Add item to your favorite",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }

  return (
    <div
      className="productCards"
      onClick={() => {
        navigate(`/product/${data._id}`);
      }}
    >
      {inFavorite ? (
        <div className="heart text-danger" onClick={handleRemoveFavorite}>
          <FaHeart />
        </div>
      ) : (
        <div className="heart" onClick={handleAddToFavorite}>
          <IoMdHeartEmpty />
        </div>
      )}
      <img src={data.img?.url ? data.img.url : "./eg.svg"} />
      <div
        className="info"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <span className="rating">
          4.3 <IoStarSharp /> 404
        </span>
        {!showEditCart && (
          <span
            className="cart"
            onClick={handleAddToCart}
            style={{
              backgroundColor: inCart ? "#5261e5" : "white",
            }}
            onMouseEnter={() => {
              inCart && setShowEditCart(true);
            }}
          >
            <CartIcon inCart={inCart} number={number} />
          </span>
        )}

        {showEditCart && (
          <span
            className="editCart"
            onMouseLeave={() => {
              setShowEditCart(false);
            }}
          >
            {number > 1 ? (
              <FaMinus onClick={handleRemoveItem} />
            ) : number == 1 ? (
              <FaRegTrashAlt onClick={handleRemoveItem} />
            ) : (
              <MdDoNotDisturbAlt />
            )}
            {number}
            {number == data.quantity ? (
              <MdDoNotDisturbAlt />
            ) : (
              <IoMdAdd onClick={handleAddToCart} />
            )}
          </span>
        )}
      </div>
      <div className="cardDetails">
        <span>{data.title?.substring(0, 49)}</span>
        <span className="price">
          <span className="currency">EGP</span> {data.price?.new?.toFixed(1)}
          {data.price?.discount && data.price?.old > 0 && (
            <small>
              <span className="oldPrice">{data.price.old.toFixed(1)}</span>{" "}
              <span className="discount">{data.price.discount}</span>
            </small>
          )}
        </span>
        <span>
          <IoStorefront />{" "}
          {data.quantity < 6
            ? `only ${data.quantity} in the store`
            : "In the stock"}
        </span>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  data: PropTypes.object,
};
