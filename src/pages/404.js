import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const Custom404 = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(/assets/images/error/error_object.svg)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: 160,
          height: 160,
        }}
      />
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "NotoSansKR-Bold",
          fontSize: 28,
          my: 2,
          color: "black",
          fontWeight: "bold",
        }}
      >
        <FormattedMessage id="error_page_404_title" />
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          color: "#666666",
          fontSize: 16,
          lineHeight: 1.8,
        }}
      >
        <FormattedMessage
          id="error_page_404_description"
          values={{ br: <br /> }}
        />
      </Typography>

      <Button
        variant="contained"
        sx={{
          background: "#ff5d14",
          fontFamily: "NotoSansKR-Bold",
          fontSize: 16,
          boxShadow: "none",
          mt: 6,
          textTransform: "none",
          ":hover": {
            background: "#ff5d14",
          },
        }}
        onClick={() => {
          router.back();
        }}
      >
        <FormattedMessage id="btn_go_back" />
      </Button>
    </Box>
  );
};

export default Custom404;
