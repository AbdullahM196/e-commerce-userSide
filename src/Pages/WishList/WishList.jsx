import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import Error from "../../components/Error/Error";
import {
  selectAllFavorites,
  useGetFavoritesQuery,
} from "../../store/api/Slices/favorites";
import { selectAuthStatus } from "../../store/api/Slices/isAuthenticated";

export default function WishList() {
  const isAuth = useSelector(selectAuthStatus);
  const { isSuccess, isError, error } = useGetFavoritesQuery();
  const favoriteData = useSelector(selectAllFavorites);
  return (
    <div className="d-flex flex-column w-100 h-100 py-4">
      <h1>WishList</h1>
      {isAuth ? (
        isSuccess && <Cards data={favoriteData} />
      ) : (
        <h2>Please Login</h2>
      )}
      {isAuth ? isError && <Error err={error} /> : <h2>Please Login</h2>}
    </div>
  );
}
