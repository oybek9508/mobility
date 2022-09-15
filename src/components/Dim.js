import React, { useEffect, useRef } from "react";

const Dim = ({ onOff }) => {
  const dimRef = useRef(null);

  useEffect(() => {
    dimRef.current.addEventListener("animationend", handleAnimationEnd);
  }, []);

  function handleAnimationEnd(e) {
    dimRef.current.removeEventListener("animationend", handleAnimationEnd);
    onOff();
  }

  return <div ref={dimRef} className="dim"></div>;
};

export default Dim;
