import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import SubCategory from "./Pages/subCategory/SubCategory.jsx";
import ProductDetails from "./Pages/productDetail/ProductDetails.jsx";
import Register from "./Pages/Auth/Register.jsx";
import Login from "./Pages/Auth/Login.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Profile from "./Pages/profile/Profile.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import WishList from "./Pages/WishList/WishList.jsx";
import Search from "./Pages/Search/Search.jsx";
import { productsSlice } from "./store/api/Slices/products.js";
import { searchSlice } from "./store/api/Slices/search.js";
store.dispatch(productsSlice.endpoints.getAllProducts.initiate());
store.dispatch(searchSlice.endpoints.getSearch.initiate());

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="subCategory/:id" element={<SubCategory />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="search/:text" element={<Search />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
