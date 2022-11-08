import React from "react";
import { Button } from "@mui/material";

const AuthButton = (props) => {
  const { onClick, children, type, color, disabled } = props;

  const styleController = (color) => {
    switch (color) {
      case "info": {
        return {
          width: "100%",
          borderRadius: "6px",
          height: "56px",
          fontFamily: "Noto Sans",
          fontSize: "20px",
          fontWeight: "700",
          boxShadow: "none",
          textTransform: "none",
        };
      }

      case "second-info": {
        return {
          width: "100%",
          borderRadius: "6px",
          height: "56px",
          fontFamily: "Noto Sans",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "none",
          color: "#037dd6",
          backgroundColor: "#f0f8ff",
          textTransform: "none",
          ":hover": {
            bgcolor: "#b7d9f7",
            boxShadow: "none",
          },
        };
      }

      case "dark": {
        return {
          backgroundColor: "#333333",
          width: "100%",
          borderRadius: "6px",
          height: "56px",
          fontFamily: "Noto Sans",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "none",
          textTransform: "none",
          ":hover": {
            bgcolor: "#4a4949",
            boxShadow: "none",
          },
        };
      }
      // Alert - 다시 입력하기 버튼
      case "darkgray": {
        return {
          width: "100%",
          height: "50px",
          backgroundColor: "#4a4949",
          marginRight: 2,
          boxShadow: "none",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          ":hover": {
            bgcolor: "#262525",
            boxShadow: "none",
          },
        };
      }
      // Alert - 파란색 버튼
      case "blue": {
        return {
          width: "100%",
          height: "50px",
          backgroundColor: "#0288d1",
          boxShadow: "none",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          ":hover": {
            bgcolor: "#006399",
            boxShadow: "none",
          },
        };
      }
      case "facebook": {
        return {
          width: "100%",
          height: "50px",
          backgroundColor: "#5370B0",
          boxShadow: "none",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          ":hover": {
            bgcolor: "#006399",
            boxShadow: "none",
          },
        };
      }
      case "edit-info": {
        return {
          width: "100%",
          borderRadius: "6px",
          height: "56px",
          fontFamily: "Jalnan",
          fontSize: "20px",
          fontWeight: "700",
          boxShadow: "none",
          textTransform: "none",
        };
      }

      default: {
        return {
          width: "100%",
          borderRadius: "6px",
          height: "56px",
          fontFamily: "NotoSansKR-Bold",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "none",
          textTransform: "none",
        };
      }
    }
  };

  return (
    <Button
      type={type ? type : "button"}
      variant="contained"
      color="info"
      disabled={disabled}
      sx={styleController(color)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
