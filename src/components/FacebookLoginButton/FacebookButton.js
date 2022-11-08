import { Box, Button, CardMedia } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

const FacebookButton = ({ onClick }) => {
  return (
    <Button
      type="button"
      color="info"
      sx={{
        backgroundColor: "#1877f2",
        borderRadius: "6px",
        width: "100%",
        height: "52px",
        boxShadow: "none",

        fontSize: "20px",
        fontWeight: "700",
        color: "white",
        display: "flex",
        position: "relative",
        textTransform: "none",
        ":hover": {
          bgcolor: "#1877f2",
          boxShadow: "none",
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        alt="Facebook Button"
        src="/assets/images/icons/facebook_icon.svg"
        component="img"
        sx={{
          position: "absolute",
          left: "5%",
          width: { xs: 25, sm: 33, md: 33, lg: 33 },
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        pl={2.5}
        sx={{ fontWeight: 400, fontSize: 17 }}
      >
        <FormattedMessage id="sns_login_facebook" />
      </Box>
    </Button>
  );
};

export default FacebookButton;
