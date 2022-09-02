import { CardMedia, Grid } from "@mui/material";
import React from "react";
import { HeaderImgs } from "../assets/section1/header/index";

const { Cartverse, Event, Customize, Roadmap, World, Register, Language } =
  HeaderImgs;

const imgArr = [
  Cartverse,
  Event,
  Customize,
  Roadmap,
  World,
  Register,
  Language,
];

function Header() {
  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "150px", width: "100%" }}
    >
      {imgArr.map((img, idx) => (
        <a
          href={
            idx === 0
              ? "#section1"
              : idx === 1
              ? "#section2"
              : idx === 2
              ? "#section4"
              : idx === 3 && "#section7"
          }
        >
          <CardMedia
            component="img"
            src={img}
            alt={img}
            sx={{
              width:
                idx === 0
                  ? "167px"
                  : idx === 1
                  ? "59px"
                  : idx === 2
                  ? "108px"
                  : idx === 3
                  ? "94px"
                  : idx === 4
                  ? "70px"
                  : idx === 5
                  ? "138px"
                  : idx === 6 && "43px",
            }}
          />
        </a>
      ))}
    </Grid>
  );
}

export default Header;
