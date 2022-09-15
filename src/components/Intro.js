import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const Intro = (props) => {
  const { onOff } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.addEventListener("ended", handleVideoEnd);
  }, []);

  function handleVideoEnd(e) {
    videoRef.current.style.opacity = 0;
    setTimeout(() => {
      videoRef.current.removeEventListener("ended", handleVideoEnd);
      onOff();
    }, 400);
  }

  const handleVideoLoaded = () => {
    console.log("Loaded");
  };

  return (
    <Box
      sx={{
        placeItems: "center",
        height: "100vh",
        width: "100vw",
        margin: "0 auto",
        background: "#000",
      }}
    >
      <video
        ref={videoRef}
        className="intro-video"
        muted
        autoPlay
        playsInline
        onLoadedData={handleVideoLoaded}
      >
        <source src="/assets/cartverse.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};

export default Intro;
