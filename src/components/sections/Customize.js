import { Grid, Box, Typography, CardMedia } from "@mui/material";
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
  "구매 예정 슈퍼카 가상 커스텀 시뮬레이션 기능",
  "커스텀 카 주문제작 서비스",
  "프로필 인증 및 굿즈, 피규어 제공",
];

const TextComponent = ({ text }) => (
  <Box
    data-aos="fade-right"
    data-aos-duration="2000"
    sx={{ display: "flex", alignItems: "center", mt: "10px" }}
  >
    <CardMedia
      src="assets/images/customize/checked.png"
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

const Customize = () => {
  // const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      data-aos="fade-up"
      data-aos-duration="2000"
      container
      id="section4"
      justifyContent="center"
      sx={{
        height: { xs: "900px", sm: "1050px", md: "1150px", lg: "1284px" },
        width: "100vw",
        position: "relative",
        backgroundSize: "cover",
        backgroundImage: `url(/assets/images/customize/section4_bg.png)`,
        top: "-110px",
      }}
    >
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
            data-aos="fade-right"
            data-aos-duration="2000"
            sx={{
              ...customTextStyle,
            }}
          >
            커스텀 요소들을 NFT로 발행해보세요.
          </Typography>
          <CardMedia
            data-aos="fade-right"
            data-aos-duration="2000"
            src="assets/images/customize/setting.png"
            component="img"
            alt="Setting"
            sx={{
              position: "relative",
              width: { xs: "30px", sm: "80px" },
              height: { xs: "30px", sm: "80px" },
              top: { xs: 0, sm: "-10px" },
              right: { xs: "-110px", sm: "-153px" },
            }}
          />
          <CardMedia
            data-aos="fade-right"
            data-aos-duration="2000"
            src="assets/images/customize/Customize.png"
            component="img"
            alt="Customize"
            sx={{
              width: { xs: "190px", sm: "250px" },
              mt: { xs: "-20px", sm: "-40px" },
              mb: "15px",
            }}
          />
          {texts.map((text) => (
            <TextComponent key={text} text={text} />
          ))}
          <CustomButton
            mt="40px"
            iconWidth="20px"
            iconHeight="15px"
            title="NFT MAKER"
            iconSrc="/assets/images/customize/buttonIcon.png"
          />
        </Box>
        <Box
          data-aos="zoom-out-up"
          data-aos-anchor-placement="center-center"
          data-aos-duration="1000"
          sx={{ mt: "50px", width: { xs: "70%", sm: "50%" }, ml: "17%" }}
        >
          <CardMedia
            src="assets/images/customize/car.png"
            component="img"
            alt="Car"
            // sx={{ width: "215px", mt: "35px" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Customize;
