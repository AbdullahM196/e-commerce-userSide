import { NavLink } from "react-router-dom";
import "./secondNav.css";
export default function SecondNav() {
  return (
    <div id="secondNav">
      <nav>
        <ul>
          <NavLink to={"subCategory/Mobiles"}>Mobiles</NavLink>
          <NavLink to={"subCategory/Laptops"}>Laptops</NavLink>
          <NavLink to={"subCategory/Men"}>{`Men's Fashion`}</NavLink>
          <NavLink to={"subCategory/Women"}>{`Women's Fashion`}</NavLink>
        </ul>
      </nav>
    </div>
  );
}
