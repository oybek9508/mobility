import { Typography } from "@mui/material";
import React from "react";
import FlexBox from "./FlexBox";

const Logo = () => {
  return (
    <FlexBox justify="center">
      <Typography
        sx={{
          fontFamily: "Cal Sans",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "25px",
          color: "#333333",
        }}
      >
        Cartverse
      </Typography>
    </FlexBox>
  );
};

export default Logo;
