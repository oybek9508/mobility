import { Box, Button, CardMedia } from "@mui/material";
import React from "react";

const CustomButton = ({
  title,
  iconSrc,
  iconWidth: width,
  iconHeight: height,
  mt,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        mt,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(34.4deg, #8E74FF 13.14%, #7256EF 84.87%)",
        borderRadius: "50px",
        p: "10px 30px",
        zIndex: 9999,
      }}
    >
      <CardMedia
        component="img"
        src={iconSrc}
        alt={iconSrc}
        sx={{ width, height }}
      />
      <Button
        sx={{
          fontFamily: "Cal Sans",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "20px",
          color: "#fff",
          textTransform: "none",
        }}
      >
        {title}
      </Button>
    </Box>
  );
};

export default CustomButton;
