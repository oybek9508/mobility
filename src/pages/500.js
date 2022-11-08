import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const Custom500 = () => {
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
          width: { xs: 300, sm: 300, md: 300, lg: 160 },
          height: { xs: 300, sm: 300, md: 300, lg: 160 },
        }}
      />
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "NotoSansKR-Bold",
          fontSize: 28,
          my: 2,
        }}
      >
        <FormattedMessage id="error_page_500_title" />
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
          id="error_page_500_description"
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

export default Custom500;
