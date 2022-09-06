import { useState } from "react";
import "./Section7.css";
import { FormattedMessage } from "react-intl";
import { CardMedia, Grid, Box, Typography } from "@mui/material";
import Car from "../../assets/section7/car.png";
import Pin from "../../assets/section7/pin.png";
import GooglePlay from "../../assets/section7/google_play.png";
import AppStore from "../../assets/section7/apple.png";

const customTextStyle = {
  fontFamily: "Tmoney RoundWind",
  fontWeight: 800,
  fontSize: "18px",
  color: "#FFFFFF",
};

function Section7() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid className="section7" id="section7" container justifyContent="center">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "80%", mt: "100px" }}
      >
        <CardMedia src={Car} alt={Car} sx={{ width: "40%" }} component="img" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Cal Sans",
                fontWeight: 600,
                fontSize: "64px",
                color: "#81C0FE",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              ROADMAP
            </Typography>
            <CardMedia
              src={Pin}
              alt={Pin}
              component="img"
              sx={{ width: "53px", height: "73px", mb: "25px" }}
            />
          </Box>
          <Typography sx={{ ...customTextStyle }}>
            슈퍼카 컬렉터 영역에 특화된
          </Typography>
          <Typography
            sx={{
              ...customTextStyle,
              fontSize: "24px",
              color: "#BDBDF9",
            }}
          >
            카트버스가 곧 출시돼요!{" "}
          </Typography>
          <Typography sx={{ ...customTextStyle }}>
            이 곳 카트버스에서,{" "}
          </Typography>
          <Typography sx={{ ...customTextStyle }}>
            여러분들을 위해 준비한 슈퍼카 커스텀을 경험해 보세요
          </Typography>
          <Box
            sx={{
              mt: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              src={GooglePlay}
              alt={GooglePlay}
              component="img"
              sx={{ width: "240px" }}
            />
            <CardMedia
              src={AppStore}
              alt={AppStore}
              component="img"
              sx={{ width: "240px", ml: "24px" }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section7;
