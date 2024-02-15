import { Navigate, Outlet } from "react-router-dom";
import { useGetUserQuery } from "../store/api/Slices/User";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../components/Loading/Loading";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthStatus,
  setAuthenticated,
} from "../store/api/Slices/isAuthenticated";
export default function ProtectRoute() {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { isLoading, isSuccess, isError, error } = useGetUserQuery();
  const notLoggedIn = useMemo(() => {
    if (isError) {
      if (error.originalStatus === 401 || error.status === 401) {
        dispatch(setAuthenticated(false));
        return true;
      } else {
        return false;
      }
    }
    return false;
  }, [isError, error?.originalStatus, error?.status, dispatch]);
  const isAuth = useSelector(selectAuthStatus);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated(true));
    }
  }, [isSuccess, dispatch]);
  if (isLoading) {
    return <Loading />;
  } else if (isAuth) {
    return <Outlet />;
  } else if (isError) {
    if (notLoggedIn) {
      return <Navigate to="/login" replace />;
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data || error.error,
      });
    }
  }
}
