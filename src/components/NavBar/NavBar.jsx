import "./navbar.css";
import { BiShoppingBag } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import egyptFlag from "../../assets/eg.svg";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../store/api/Slices/User";
import { IoMdSearch } from "react-icons/io";
import useWidth from "../GetWidthHook/useWidth";

export default function NavBar() {
  const [searchText, setSearchText] = useState("");
  const { data, isSuccess } = useGetUserQuery();
  const navigate = useNavigate();
  const screenWidth = useWidth();

  function handleSearch() {
    navigate(`/search/${searchText}`);
  }
  const [show, setShow] = useState(false);
  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        <BiShoppingBag />
        <span>Shop</span>
      </div>
      <nav className="nav">
        <ul>
          <li className="deliver-to">
            <img src={egyptFlag} alt="Egypt" />
            <span>
              <span>Deliver to</span>
              <span>Alexandria</span>
            </span>
          </li>

          <li className="searchBar">
            <input
              type="text"
              name="search"
              placeholder="What are you looking for?"
              value={searchText}
              onChange={(evt) => {
                setSearchText(evt.target.value);
              }}
            />
            <button onClick={handleSearch}>
              <IoMdSearch />
            </button>
          </li>
          {screenWidth > 700 &&
            (isSuccess ? (
              <li
                className="navItems"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <small>Hi,</small>
                <span>{data.userName?.substring(0, 12)}</span>
              </li>
            ) : (
              <li
                className="navItems"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span>Login</span> <IoPersonOutline />
              </li>
            ))}

          {screenWidth > 700 && (
            <>
              <li
                className="navItems"
                onClick={() => {
                  navigate("/wishList");
                }}
              >
                <span>Wishlist</span> <FaRegHeart />
              </li>
              <li
                className="navItems"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <span>Cart</span> <MdOutlineShoppingCart />
              </li>{" "}
            </>
          )}
          {screenWidth < 700 && (
            <>
              {show === false ? (
                <GiHamburgerMenu onClick={() => setShow(true)} />
              ) : (
                <IoCloseSharp onClick={() => setShow(false)} />
              )}
              {show ? (
                <ul className="menu">
                  <li
                    className="menuItems"
                    onClick={() => {
                      navigate("/wishList");
                    }}
                  >
                    <span>Wishlist</span> <FaRegHeart />
                  </li>
                  <li
                    className="menuItems"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    <span>Cart</span> <MdOutlineShoppingCart />
                  </li>
                  {isSuccess ? (
                    <li
                      className="menuItems"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <small>Hi,</small>
                      <span>{data.userName}</span>
                    </li>
                  ) : (
                    <li
                      className="menuItems"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      <span>Login</span> <IoPersonOutline />
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
