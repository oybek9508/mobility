import { Grid, Box, Typography, CardMedia } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Section4.css";
import Setting from "../../assets/section4/setting.png";
import Customize from "../../assets/section4/Customize.png";
import NFTButton from "../../assets/section4/nft_button.png";
import Checked from "../../assets/section4/checked.png";
import Car from "../../assets/section4/car.png";

const customTextStyle = {
  fontFamily: "Tmoney RoundWind",
  fontWeight: 800,
  fontSize: "16px",
  color: "#FFFFFF",
};

const TextComponent = ({ text }) => (
  <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
    <CardMedia
      src={Checked}
      alt={Checked}
      component="img"
      sx={{ width: "32px", height: "32px", mr: "10px" }}
    />
    <Typography
      sx={{
        ...customTextStyle,
      }}
    >
      {text}
    </Typography>
  </Box>
);

function Section4() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid container className="section4" id="section4" justifyContent="center">
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        sx={{ position: "absolute" }}
      >
        <Box
          sx={{
            mt: "190px",

            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            // position: "relative",
          }}
        >
          <Typography
            sx={{
              ...customTextStyle,
            }}
          >
            커스텀 요소들을 NFT로 발행해보세요.
          </Typography>
          <CardMedia
            src={Setting}
            component="img"
            alt={Setting}
            sx={{
              position: "relative",
              width: "80px",
              height: "80px",
              top: "-10px",
              right: "-153px",
            }}
          />
          <CardMedia
            src={Customize}
            component="img"
            alt={Customize}
            sx={{ width: "250px", mt: "-40px", mb: "15px" }}
          />
          <TextComponent text="구매 예정 슈퍼카 가상 커스텀 시뮬레이션 기능" />
          <TextComponent text="커스텀 카 주문제작 서비스" />
          <TextComponent text="프로필 인증 및 굿즈, 피규어 제공" />
          <CardMedia
            src={NFTButton}
            component="img"
            alt={NFTButton}
            sx={{ width: "215px", mt: "35px" }}
          />
        </Box>
        <Box sx={{ mt: "50px", width: "50%", ml: "17%" }}>
          <CardMedia
            src={Car}
            component="img"
            alt={Car}
            // sx={{ width: "215px", mt: "35px" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section4;
