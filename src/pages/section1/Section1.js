import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import "./Section1.css";
import CarArt from "../../assets/section1/body/CartArt.png";
import Cartverse from "../../assets/section1/body/CARTVERSE.png";
import CustomButton from "../../assets/section1/body/button.png";
import Star1 from "../../assets/section1/body/Star1.png";
import Star2 from "../../assets/section1/body/Star2.png";
import Rectangular from "../../assets/section1/body/Rectangle26.png";
import Round from "../../assets/section1/body/round.png";
import { FormattedMessage } from "react-intl";

function Section1() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      className="section1"
      sx={{ px: "10%", pb: { xs: "100px", sm: "200px", lg: "300px" } }}
      id="section1"
    >
      <Header />
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
          src={Rectangular}
          sx={{
            width: "84px",
            height: "260px",
            position: "absolute",
            bottom: -100,
            left: { xs: 0, md: 50, lg: 100 },
          }}
          alt={Rectangular}
        />
        <CardMedia
          component="img"
          src={Rectangular}
          sx={{
            width: "84px",
            height: "260px",
            position: "absolute",
            top: -100,
            right: -25,
          }}
          alt={Rectangular}
        />
        <CardMedia
          component="img"
          src={Round}
          sx={{
            width: "77px",
            height: "77px",
            position: "absolute",
            bottom: 20,
            right: 50,
          }}
          alt={Round}
        />
        <CardMedia
          component="img"
          src={Star1}
          sx={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: 18,
            left: 90,
          }}
          alt={Star1}
        />
        <CardMedia
          component="img"
          src={Star2}
          sx={{
            width: "26px",
            height: "26px",
            mt: "35px",
            position: "absolute",
            right: 265,
          }}
          alt={Star2}
        />
        <CardMedia
          component="img"
          src={Star1}
          sx={{
            width: "33px",
            height: "33px",
            position: "absolute",
            top: 200,
            right: 0,
          }}
          alt={Star1}
        />
        <Typography
          sx={{
            mt: "40px",
            fontFamily: "Cal Sans",
            fontWeight: 600,
            fontSize: "18px",
            color: "#FFFFFF",
            zIndex: 9999,
          }}
        >
          The NFT marketplace witch everything for everyone
        </Typography>
        <CardMedia
          component="img"
          src={CarArt}
          sx={{ width: "60%", mt: "50px" }}
          alt={CarArt}
        />
        <CardMedia
          component="img"
          src={Cartverse}
          sx={{ width: "30%", mt: "20px" }}
          alt={Cartverse}
        />
        <Typography
          sx={{
            mt: "40px",
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: "20px",
            color: "#FFFFFF",
          }}
        >
          럭셔리 커스텀카 오너와 팬덤을 위한
        </Typography>
        <Typography
          sx={{
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: "20px",
            color: "#FFFFFF",
          }}
        >
          Web 3.0 커뮤니티
        </Typography>
        <CardMedia
          component="img"
          src={CustomButton}
          sx={{ width: "180px", mt: "20px" }}
          alt={CustomButton}
        />
      </Box>
    </Grid>
  );
}

export default Section1;