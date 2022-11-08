/* eslint-disable react/react-in-jsx-scope */
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import CustomButton from "../CustomButton";

const Cartverse = () => {
  // const [locale, setLocale] = useState();
  // const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  // if (typeof window !== "undefined") {
  //   setLocale(localStorage.getItem("locale") ?? "ko");
  // }

  return (
    <Grid
      sx={{
        pb: { xs: "100px", sm: "200px", lg: "300px" },
        px: "5%",
        width: "100vw",
        position: "relative",
        backgroundSize: "cover",
        backgroundImage: `url(/assets/images/cartverse/body/section1_bg.png)`,
        top: 0,
      }}
      id="section1"
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          mt: "127px",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/Rectangle26.png"
          sx={{
            width: "84px",
            height: "260px",
            position: "absolute",
            bottom: -100,
            left: { xs: 0, md: 50, lg: 100 },
            display: { xs: "none", md: "block" },
            zIndex: 9999,
          }}
          alt="Rectangular"
        />
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/Rectangle26.png"
          sx={{
            width: "84px",
            height: "260px",
            position: "absolute",
            right: -25,
            display: { xs: "none", md: "block" },
          }}
          alt="Rectangular"
        />
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/round.png"
          sx={{
            width: "77px",
            height: "77px",
            position: "absolute",
            bottom: 20,
            right: 50,
            display: { xs: "none", md: "block" },
          }}
          alt="Round"
        />
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/Star1.png"
          sx={{
            display: { xs: "none", md: "block" },
            width: "60px",
            height: "60px",
            position: "absolute",
            top: 18,
            left: 90,
          }}
          alt="Star1"
        />
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/Star2.png"
          sx={{
            display: { xs: "none", md: "block" },
            width: "26px",
            height: "26px",
            mt: "35px",
            position: "absolute",
            right: 265,
          }}
          alt="Star2"
        />
        <CardMedia
          component="img"
          src="assets/images/cartverse/body/Star1.png"
          sx={{
            display: { xs: "none", md: "block" },
            width: "33px",
            height: "33px",
            position: "absolute",
            top: 200,
            right: 0,
          }}
          alt="Star1"
        />
        <Typography
          data-aos="zoom-in"
          data-aos-duration="2000"
          sx={{
            mt: "40px",
            fontFamily: "Cal Sans",
            fontWeight: 600,
            fontSize: { xs: "14px", sm: "18px" },
            color: "#FFFFFF",
            zIndex: { xs: 9999, sm: 9998 },
          }}
        >
          The NFT marketplace with everything for everyone
        </Typography>
        <CardMedia
          data-aos="zoom-in"
          data-aos-duration="2000"
          component="img"
          src="assets/images/cartverse/body/CartArt.png"
          sx={{ width: { xs: "260px", sm: "60%" }, mt: "50px", zIndex: 1 }}
          alt="CarArt"
        />
        <CardMedia
          data-aos="zoom-in"
          data-aos-duration="2000"
          component="img"
          src="assets/images/cartverse/body/CARTVERSE.png"
          sx={{ width: { xs: "208px", sm: "30%" }, mt: "20px", zIndex: 1 }}
          alt="Cartverse"
        />
        <Typography
          data-aos="zoom-in"
          data-aos-duration="2000"
          sx={{
            mt: "40px",
            fontFamily: "TmoneyRoundWind",
            fontWeight: 800,
            fontSize: { xs: "16px", sm: "20px" },
            color: "#FFFFFF",
            zIndex: 9999,
          }}
        >
          럭셔리 커스텀카 오너와 팬덤을 위한
        </Typography>
        <Typography
          data-aos="zoom-in"
          data-aos-duration="2000"
          sx={{
            fontFamily: "TmoneyRoundWind",
            fontWeight: 800,
            fontSize: { xs: "16px", sm: "20px" },
            color: "#FFFFFF",
            zIndex: 9999,
          }}
        >
          Web 3.0 커뮤니티
        </Typography>
        <CustomButton
          onClick={() => {
            console.log("logging the custom button");
          }}
          mt="20px"
          iconWidth="20px"
          iconHeight="20px"
          title="Custom"
          iconSrc="/assets/images/cartverse/body/buttonIcon.png"
        />
      </Box>
    </Grid>
  );
};

export default Cartverse;
