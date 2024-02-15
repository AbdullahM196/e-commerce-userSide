import CartCards from "../../components/CartCards/CartCards";
import "./Cart.css";
import {
  selectAllCartItems,
  useGetCartQuery,
} from "../../store/api/Slices/Cart";
import Checkout from "../../components/checkout/Checkout";
import { useSelector } from "react-redux";
export default function Cart() {
  const { isSuccess } = useGetCartQuery();
  const cart = useSelector(selectAllCartItems);
  const cartData = isSuccess && cart.length > 0 ? cart[0].products : [];
  return (
    <div id="cartPage">
      <h2>Shopping Cart</h2>
      <div className="content">
        <div className="cartItems">
          {isSuccess &&
            cartData?.map((item) => {
              return (
                <CartCards
                  key={item.product._id}
                  id={item.product._id}
                  subCategory={item.product.subCategory.name}
                  price={item.price.toFixed(1)}
                  title={item.product.title}
                  img={item.product.img.url}
                  quantity={item.quantity}
                  specifications={item.product.specifications}
                />
              );
            })}
          {isSuccess && cartData?.length === 0 && <h1>Your Cart is Empty</h1>}
        </div>
        <div className="checkout">
          {isSuccess && cartData?.length > 0 && <Checkout data={cart} />}
        </div>
      </div>
    </div>
  );
}
