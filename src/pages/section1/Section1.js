import { Box, CardMedia, Grid } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import "./Section1.css";
import Title from "../../assets/section1/body/text1.png";
import CarArt from "../../assets/section1/body/CartArt.png";
import Cartverse from "../../assets/section1/body/CARTVERSE.png";
import SubText from "../../assets/section1/body/subText.png";
import CustomButton from "../../assets/section1/body/button.png";
import Star1 from "../../assets/section1/body/Star1.png";
import Star2 from "../../assets/section1/body/Star2.png";
import Rectangular from "../../assets/section1/body/Rectangle26.png";
import Round from "../../assets/section1/body/round.png";

function Section1() {
  return (
    <Grid className="section1" sx={{ px: "10%" }} id="section1">
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
            left: 170,
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
        <CardMedia
          component="img"
          src={Title}
          sx={{ width: "30%", mt: "40px" }}
          alt={Title}
        />
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
        <CardMedia
          component="img"
          src={SubText}
          sx={{ width: "20%", mt: "20px" }}
          alt={SubText}
        />
        <CardMedia
          component="img"
          src={CustomButton}
          sx={{ width: "12%", mt: "20px" }}
          alt={CustomButton}
        />
      </Box>
    </Grid>
  );
}

export default Section1;
