import "./checkout.css";
import PropTypes from "prop-types";
import { useMakeAnOrderMutation } from "../../store/api/Slices/orders";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function Checkout({ data }) {
  data = data[0];
  const MySwal = withReactContent(Swal);
  const [order, setOrder] = useState();

  const [address, setAddress] = useState("");
  const [makeAnOrder] = useMakeAnOrderMutation();
  async function handleOrder() {
    if (address.length < 5) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please set your address",
      });
    } else {
      try {
        const result = await makeAnOrder({ address }).unwrap();
        setOrder(result);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return order ? (
    `Thank you for buying from our store your order is ${order}`
  ) : (
    <div id="checkout">
      <h1>Order Summary</h1>
      <input
        type="text"
        placeholder="set Your Address"
        value={address}
        onChange={(evt) => {
          setAddress(evt.target.value);
        }}
        className="mb-3 w-100 d-flex px-2"
      />

      <ul>
        {data?.products?.map((item) => {
          return (
            <li key={item._id}>
              <p>
                {item.product.title.substring(0, 15)} ({item.quantity}items)
              </p>
              <p>EGP {item.price.toFixed(1)}</p>
            </li>
          );
        })}
        <li>
          <p>Total:</p> <p>EGP {data.totalPrice.toFixed(1)}</p>
        </li>
        <li>
          <p>TotalShipping:</p> <p>EGP {data.totalShipment.toFixed(1)}</p>
        </li>
      </ul>
      <hr />
      <span className="d-flex justify-content-between">
        <h1>Total Price: </h1>
        <h1>EGP {(data.totalPrice + data.totalShipment).toFixed(1)}</h1>
      </span>
      <button className="checkoutButton" onClick={handleOrder}>
        Checkout
      </button>
    </div>
  );
}
Checkout.propTypes = {
  data: PropTypes.array,
};
