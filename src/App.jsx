import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SecondNav from "./components/secondNav/SecondNav";
import Footer from "./components/footer/Footer";
function App() {
  const location = useLocation();
  return (
    <div className="app">
      <header>
        <NavBar />
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <SecondNav />}
      </header>
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
