import { useLayoutEffect, useState } from "react";
const useWidth = () => {
  const [screenWidth, setScreen] = useState(window.innerWidth);
  useLayoutEffect(function () {
    function handleResize() {
      setScreen(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};

export default useWidth;
