/* eslint-disable react/react-in-jsx-scope */
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import CustomButton from "../CustomButton";

const customTextStyle = {
  fontFamily: "TmoneyRoundWind",
  fontWeight: 800,
  fontSize: { xs: "12px", sm: "16px" },
  color: "#FFFFFF",
};

const texts = [
  "커스텀 요소들을 NFT로 발행하고 컬렉션을 구성",
  "인기 랭킹 제공, NFT 소유 및 거래 기능",
  "유저 창작 활동 지원",
];

const TextComponent = ({ text }) => (
  <Box
    data-aos="fade-right"
    data-aos-duration="2000"
    sx={{ display: "flex", alignItems: "center", mt: "10px" }}
  >
    <CardMedia
      src="assets/images/nftmarket/checked.png"
      alt="Checked"
      component="img"
      sx={{
        width: { xs: "16px", sm: "32px" },
        height: { xs: "16px", sm: "32px" },
        mr: "10px",
      }}
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

const NftMarket = () => {
  // const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      className="section5"
      id="section5"
      container
      flexDirection="column"
      alignItems="center"
      sx={{ height: { xs: "700px", sm: "800px", md: "900px", lg: "1200px" } }}
    >
      <CardMedia
        component="img"
        src="assets/images/nftmarket/world1.png"
        alt="World1"
        sx={{
          width: "250px",
          height: "250px",
          position: "absolute",
          left: "150px",
          bottom: "20%",
        }}
      />
      <Box
        data-aos="fade-up"
        data-aos-duration="2000"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // mt: {"-100px"},
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          src="assets/images/nftmarket/percent.png"
          alt="Percent"
          sx={{
            width: { xs: "31px", sm: "64px" },
            height: { xs: "44px", sm: "90px" },
            position: "absolute",
            left: { xs: "-8px", sm: "-55px", md: "-45px" },
            top: { xs: "15px", sm: "-20px" },
          }}
        />
        <Typography
          sx={{
            fontFamily: "TmoneyRoundWind",
            fontWeight: 800,
            fontSize: "16px",
            color: "#FFFFFF",
          }}
        >
          NFT
        </Typography>
        <Typography
          sx={{
            fontFamily: "TmoneyRoundWind",
            fontWeight: 800,
            fontSize: { xs: "24px", sm: "32px", md: "48px", lg: "64px" },
            color: " #81C0FE",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            wordBreak: "keep-all",
            width: { xs: "195px", sm: "100%" },
            textAlign: "center",
            zIndex: 99,
          }}
        >
          자동차 모델링 디자인 거래
        </Typography>
      </Box>
      <CardMedia
        data-aos="fade-right"
        data-aos-duration="2000"
        component="img"
        src="assets/images/nftmarket/nft.png"
        alt="NFT"
        sx={{
          position: "relative",
          mt: "80px",
          width: "60%",
          zIndex: 9999,
        }}
      />
      <CardMedia
        component="img"
        src="assets/images/nftmarket/world1.png"
        alt="World1"
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
        {texts.map((text) => (
          <TextComponent key={text} text={text} />
        ))}
        <CustomButton
          mt="60px"
          iconWidth="20px"
          iconHeight="15px"
          title="NFT MARKET"
          iconSrc="/assets/images/customize/buttonIcon.png"
        />
      </Box>
    </Grid>
  );
};

export default NftMarket;
