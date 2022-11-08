import { Box } from "@mui/material";
import React from "react";

const FlexBox = ({ direction, children, justify, width }) => {
  return (
    <Box
      sx={{
        width,
        display: "flex",
        flexDirection: direction || "row",
        // alignItems: "center",
        justifyContent: justify,
      }}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
