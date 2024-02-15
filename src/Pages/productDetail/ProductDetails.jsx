import { useNavigate, useParams } from "react-router-dom";
import {
  selectProductById,
  useGetProductQuery,
} from "../../store/api/Slices/products";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import "./productDetails.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoHeartSharp } from "react-icons/io5";
import Table from "react-bootstrap/Table";

import {
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  selectFavoriteIds,
} from "../../store/api/Slices/favorites";
import { useEffect, useState } from "react";
import {
  selectAllCartItems,
  useAddToCartMutation,
  useGetCartQuery,
} from "../../store/api/Slices/Cart";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { selectAuthStatus } from "../../store/api/Slices/isAuthenticated";
export default function ProductDetails() {
  const isAuth = useSelector(selectAuthStatus);
  const { id } = useParams();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inCart, setInCart] = useState(false);

  const {
    isSuccess: cartSuccess,
    isError: cartIsError,
    error: cartError,
  } = useGetCartQuery();
  let cartData = useSelector(selectAllCartItems);
  cartData = isAuth
    ? cartSuccess && cartData.length > 0 && cartData[0].products
    : null;

  useEffect(() => {
    if (isAuth && cartSuccess && cartData?.length > 0) {
      const findProduct = cartData?.find((item) => item.product._id === id);
      if (findProduct) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    } else if (isAuth && cartIsError) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: cartError.data.message,
      });
    }
  }, [isAuth, cartSuccess, cartData, cartIsError, cartError, MySwal, id]);
  const [addToCart] = useAddToCartMutation();
  async function handleAddToCart() {
    if (isAuth) {
      try {
        await addToCart({ product: product._id }).unwrap();
      } catch (err) {
        console.log(err);
      }
    } else {
      MySwal.fire({
        title: "Please login to Add this item to Cart ",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }
  //////////////////////////////////////////////////////
  const [inFavorite, setInFavorite] = useState(false);
  const {
    isSuccess: favSuccess,
    isError: favIsError,
    error: favError,
  } = useGetFavoritesQuery();
  const favIds = useSelector(selectFavoriteIds);
  useEffect(() => {
    if (isAuth && favSuccess) {
      const findProduct = favIds.find((item) => item === id);
      setInFavorite(findProduct ? true : false);
    } else if (isAuth && favIsError) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: favError.data.message,
      });
    }
  }, [isAuth, favSuccess, favIsError, favError, id, MySwal, favIds]);
  const [addToFavorites] = useAddToFavoritesMutation();
  async function handleAddToFavorite() {
    if (isAuth) {
      try {
        await addToFavorites({ product: id }).unwrap();
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
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  async function handleRemoveFavorite() {
    if (isAuth) {
      try {
        await removeFromFavorites(id).unwrap();
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

  const { isLoading, isSuccess, isError, error } = useGetProductQuery(id);
  const product = useSelector((state) => selectProductById(state, id));
  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error error={error} />;
  } else if (isSuccess && product) {
    console.log(product);
    const productDescription = product.description.split("\n");
    return (
      <div id="productDetails">
        <div className="productInfo">
          <div className="productImage">
            <img src={product?.img.url} alt={product.name} />
          </div>
          <div className="productDescription">
            <span className="subCategory">{product.subCategory.name}</span>
            <p className="title">{product.title}</p>
            <span className="ratingLine">
              <span className="rating">3.9</span>
              <span className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <CiStar />
              </span>
              <span>133 ratings</span>
            </span>

            <span className="price">
              <span className="currency">EGP</span>
              {product.price.new.toFixed(1)}
              {product.price.discount && product.price.old > 0 && (
                <small>
                  <span className="oldPrice">
                    {product.price.old.toFixed(1)}
                  </span>
                  <span className="discount">{product.price.discount}</span>
                </small>
              )}
            </span>
            <span className="actions">
              {cartSuccess ? (
                inCart ? (
                  <button
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    View Cart
                  </button>
                ) : (
                  <button onClick={handleAddToCart}>AddToCart</button>
                )
              ) : (
                <button onClick={handleAddToCart}>AddToCart</button>
              )}{" "}
              {favSuccess ? (
                inFavorite ? (
                  <span onClick={handleRemoveFavorite}>
                    <IoHeartSharp style={{ fill: "red" }} />
                  </span>
                ) : (
                  <span onClick={handleAddToFavorite}>
                    <IoHeartSharp />
                  </span>
                )
              ) : (
                <span onClick={handleAddToFavorite}>
                  <IoHeartSharp />
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="productData">
          <div className="description">
            <h3>About This Item</h3>
            <ul>
              {productDescription.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
          <div className="specifications">
            <h3>Specifications</h3>
            <Table hover variant="light" responsive>
              <tbody>
                {console.log(product)}
                {product.specifications
                  ? Object.keys(product.specifications).map((key, index) => {
                      return (
                        <tr key={index}>
                          <td>{key}</td>
                          <td>{product.specifications[key]}</td>
                        </tr>
                      );
                    })
                  : "No Data Here"}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
