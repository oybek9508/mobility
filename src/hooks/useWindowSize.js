import { useState, useEffect } from "react";

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-inner-declarations
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowSize.width]);
  return windowSize;
};
