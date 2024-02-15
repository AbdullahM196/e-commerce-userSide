import "./profile.css";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../../store/api/Slices/User";
import { format, parseISO } from "date-fns";
import { useGetOrdersQuery } from "../../store/api/Slices/orders";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { useCancelOrderMutation } from "../../store/api/Slices/orders";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { BiLogOut } from "react-icons/bi";
import useWidth from "../../components/GetWidthHook/useWidth";
export default function Profile() {
  const MySwal = withReactContent(Swal);
  const screenWidth = useWidth();

  const [cancelOrder] = useCancelOrderMutation();
  async function handleCancelOrder(id) {
    try {
      await cancelOrder(id).unwrap();
      MySwal.fire({
        icon: "success",
        title: "Your Order has been cancelled",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data.message,
      });
      console.log(err);
    }
  }
  const navigate = useNavigate();
  const { data: orders, isSuccess: orderSuccess } = useGetOrdersQuery();
  const { data, isSuccess } = useGetUserQuery();
  const joinedDate = parseISO(data.createdAt);
  const [liftSide, setLiftSide] = useState("userData");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [logout] = useLogoutMutation();
  async function handleLogout() {
    try {
      await logout().unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  function showLiftSide() {
    if (liftSide == "userData") {
      return (
        <div className="card">
          <img
            src={data.img ? data.img : "https://fakeimg.pl/250x200/"}
            alt={data.userName}
            style={{ width: "100%" }}
          />
          <h1>{data.userName}</h1>
          <p className="title">{data.email}</p>
          <p>
            {data?.firstName} {data?.lastName}
          </p>
          <p>{data.mobile}</p>
          <p>Joined At: {format(joinedDate, "do MMMM yyyy")}</p>
          <p>
            <button onClick={handleShow}>Edit Profile</button>
          </p>
          <span className="logoutButton" onClick={handleLogout}>
            Logout <BiLogOut className="fs-4" />
          </span>
          <EditProfile show={show} setShow={setShow} data={data} />
        </div>
      );
    } else if (liftSide == "orders") {
      return (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Title</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Order Cost</th>
            </tr>
          </thead>
          <tbody>
            {orderSuccess &&
              orders?.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.products?.map((prod, index) => {
                        return (
                          <span key={index}>
                            {prod.product ? (
                              screenWidth > 480 ? (
                                prod.product.title
                              ) : (
                                prod.product.title.substring(0, 20) + "..."
                              )
                            ) : (
                              <span className="text-danger">DletedProduct</span>
                            )}{" "}
                            <br />
                          </span>
                        );
                      })}
                    </td>
                    <td>
                      {item?.products?.map((prod, index) => (
                        <span key={index}>
                          {prod.product ? (
                            Math.ceil(prod.product.price.new)
                          ) : (
                            <span className="text-danger">DletedProduct</span>
                          )}{" "}
                          <br />
                        </span>
                      ))}
                    </td>
                    <td>
                      {item?.products?.map((prod, index) => (
                        <span key={index}>
                          {" "}
                          {prod.quantity} <br />
                        </span>
                      ))}
                    </td>
                    <td>
                      {item.status === "Cancelled" ? (
                        item.status
                      ) : (
                        <select
                          name="orderstatus"
                          id="orderStatus"
                          onChange={(evt) =>
                            evt.target.value === "Cancelled" &&
                            handleCancelOrder(item._id)
                          }
                        >
                          <option value={item.status}>{item.status}</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                    <td>{format(parseISO(item.createdAt), "dd/MM/yyyy")}</td>
                    <td>{item.totalPrice}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      );
    }
  }
  return (
    isSuccess && (
      <div id="profile">
        <div className="leftSide" id="liftSide">
          {showLiftSide()}
        </div>
        <div className="rightSide">
          <a
            href="#liftSide"
            className="rightSideCards"
            onClick={() => {
              setLiftSide("orders");
            }}
          >
            <img
              src="https://res.cloudinary.com/abdullah-mahmoud/image/upload/v1707954173/userSidePic/mdri3vdrs4j4kjm4oas0.png"
              alt="Orders Picture"
            />
            <div className="ordersSide">
              <h3>Your Order</h3>
              <p>Track, cancel an order, download invoice or buy again</p>
            </div>
          </a>
          <a
            href="#liftSide"
            className="rightSideCards"
            onClick={() => {
              setLiftSide("userData");
            }}
          >
            <CgProfile />
            <div>
              <h3>update Your data</h3>
              <p>Manage Your Data in our site.</p>
            </div>
          </a>
          <a
            href="#liftSide"
            className="rightSideCards"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img
              src="https://res.cloudinary.com/abdullah-mahmoud/image/upload/v1707954175/userSidePic/vy145fll74alx3d4ccnd.jpg"
              alt="Orders Picture"
            />
            <div className="ordersSide">
              <h3>Your Cart</h3>
              <p>Track, delete from Cart or buy again.</p>
            </div>
          </a>
          <a
            href="#liftSide"
            className="rightSideCards"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <img
              src="https://res.cloudinary.com/abdullah-mahmoud/image/upload/v1707954177/userSidePic/tjzdnmbzu11sd3qmlopx.jpg"
              alt="Orders Picture"
            />
            <div className="ordersSide">
              <h3>Your Wishlist</h3>
              <p>Track, Your Wishlist.</p>
            </div>
          </a>
        </div>
      </div>
    )
  );
}
