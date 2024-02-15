import { useParams } from "react-router-dom";
import { useGetSearchQuery } from "../../store/api/Slices/search";
import Cards from "../../components/Cards/Cards";
export default function Search() {
  const { text } = useParams();
  const { data, isSuccess } = useGetSearchQuery(`text=${text}`);
  console.log("====================================");
  console.log(text);
  console.log("====================================");
  isSuccess && console.log(data);
  return (
    <div>
      <h1> Search Results</h1>
      {isSuccess && <Cards data={data} />}
    </div>
  );
}
