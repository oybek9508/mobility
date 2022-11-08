import { Box, CardMedia, Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

const NaverButton = ({ onClick }) => {
  return (
    <Button
      type="button"
      // variant="contained"
      color="info"
      sx={{
        backgroundColor: "#03C75A",
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
          bgcolor: "#03C75A",
          boxShadow: "none",
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        src="/assets/images/icons/naver.png"
        alt="facebook"
        component="img"
        sx={{
          position: "absolute",
          left: "2%",
          width: { xs: 50, sm: 50, md: 50, lg: 50 },
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        pl={2.5}
        sx={{ fontWeight: 400, fontSize: 17 }}
      >
        <FormattedMessage id="login_naver" />
      </Box>
    </Button>
  );
};

export default NaverButton;
