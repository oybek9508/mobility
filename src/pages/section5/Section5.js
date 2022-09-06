import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Section5.css";
import NFT from "../../assets/section5/nft.png";
import Checked from "../../assets/section5/checked.png";
import NftButton from "../../assets/section5/nft_button.png";
import Percent from "../../assets/section5/percent.png";
import World1 from "../../assets/section5/world1.png";
import World2 from "../../assets/section5/world2.png";

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

function Section5() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      className="section5"
      id="section5"
      container
      flexDirection="column"
      alignItems="center"
      sx={{ height: { xs: "600px", sm: "700px", md: "900px", lg: "1120px" } }}
    >
      <CardMedia
        component="img"
        src={World1}
        alt={World1}
        sx={{
          width: "250px",
          height: "250px",
          position: "absolute",
          left: "150px",
          bottom: "20%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: "-100px",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          src={Percent}
          alt={Percent}
          sx={{
            width: "64px",
            height: "90px",
            position: "absolute",
            left: "-45px",
            top: "-20px",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: "16px",
            color: "#FFFFFF",
          }}
        >
          NFT
        </Typography>
        <Typography
          sx={{
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: { xs: "20px", sm: "32px", md: "48px", lg: "64px" },
            color: " #81C0FE",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          자동차 모델링 디자인 거래
        </Typography>
      </Box>
      <CardMedia
        component="img"
        src={NFT}
        alt={NFT}
        sx={{
          position: "relative",
          mt: "80px",
          width: "60%",
          zIndex: 9999,
        }}
      />
      <CardMedia
        component="img"
        src={World1}
        alt={World1}
        sx={{
          width: "450px",
          height: "450px",
          position: "absolute",
          right: "13%",
          bottom: "40%",
        }}
      />
      <Box
        sx={{
          mt: "60px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          zIndex: 9999,
        }}
      >
        <TextComponent text="커스텀 요소들을 NFT로 발행하고 컬렉션을 구성" />
        <TextComponent text="인기 랭킹 제공, NFT 소유 및 거래 기능" />
        <TextComponent text="유저 창작 활동 지원" />
        <CardMedia
          component="img"
          src={NftButton}
          alt={NftButton}
          sx={{
            mt: "80px",
            width: "60%",
          }}
        />
      </Box>
    </Grid>
  );
}

export default Section5;
