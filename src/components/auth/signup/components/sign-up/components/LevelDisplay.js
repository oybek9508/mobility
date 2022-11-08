import React from "react";
import { Box, CardMedia } from "@mui/material";

const LevelDisplay = (props) => {
  const { children, active, number, line, check } = props;

  const borderStyleController = () => {
    switch (number) {
      case 1:
        return {
          borderBottom: active ? "2px solid #037dd6" : "2px dashed #f1f1f1",
          width: "100%",
          left: "50%",
          // borderStyle: active ? "solid" : "dashed solid",
        };
      case 2:
        return {
          borderBottom: "2px solid #037dd6",
          width: "100%",
          left: "-50%",
          // borderStyle: "solid",
        };
      case 3:
        return {
          borderBottom: active ? "2px solid #037dd6" : "2px dashed #f1f1f1",
          width: "100%",
          left: "-50%",
          // borderStyle: active ? "solid" : "dashed solid",
        };
      default:
        return { border: "none", width: "100%" };
    }
  };

  const border = borderStyleController();

  return (
    <Box
      pt={1}
      display="flex"
      justifyContent="start"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      {check ? (
        <CardMedia
          src="/assets/images/nft-signup/btn_check_active.svg"
          alt="activate"
          component="img"
          sx={{
            width: "2rem",
            height: "2rem",
            zIndex: 3,
          }}
        />
      ) : (
        <Box
          sx={{
            width: "2rem",
            height: "2rem",
            borderRadius: "99px",
            border: line ? "2px solid #037dd6" : "2px solid #f1f1f1",
            backgroundColor: active && line ? "#037dd6" : "#fff",
            fontSize: "0.87rem",
            fontFamily: "Noto Sans",
            fontWeight: "bold",
            zIndex: 2,
            color: active ? "#fff" : "#333333",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {number}
        </Box>
      )}
      <Box
        sx={{
          top: "25%",
          position: "absolute",
          transform: "translateY(50%)",
          minHeight: "2px",
          ...border,
        }}
      ></Box>
      <Box
        pt={1}
        sx={{
          fontSize: "0.87rem",
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LevelDisplay;
