import { useLayoutEffect } from "react";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "./Section3.css";
import Design from "../../assets/section3/designs.png";
import Fire from "../../assets/section3/fire.png";
import Car1 from "../../assets/section3/car1.png";
import Car2 from "../../assets/section3/car2.png";
import Car3 from "../../assets/section3/car3.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const swiperData = [
  {
    title: "#23 Power Porche",
    subtitle: "Yellow Super Car Collection #13",
    view: "view",
    image: Car1,
  },
  {
    title: "#1 Power Porche",
    subtitle: "Future Super Car Collection #01",
    view: "view",
    image: Car2,
  },
  {
    title: "#3 White Porche",
    subtitle: "White Super Car Collection #03",
    view: "view",
    image: Car3,
  },
  {
    title: "#23 Power Porche",
    subtitle: "Yellow Super Car Collection #13",
    view: "view",
    image: Car1,
  },
  {
    title: "#1 Power Porche",
    subtitle: "Future Super Car Collection #01",
    view: "view",
    image: Car2,
  },
  {
    title: "#3 White Porche",
    subtitle: "White Super Car Collection #03",
    view: "view",
    image: Car3,
  },
];

function Section3() {
  return (
    <Grid className="section3" id="section3">
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        sx={{ height: "100%", mt: "40px" }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: "100px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Cal Sans",
              fontWeight: 600,
              fontSize: "16px",
              color: "white",
            }}
          >
            NFT
          </Typography>
          <CardMedia
            src={Fire}
            alt={Fire}
            component="img"
            sx={{
              position: "absolute",
              height: "80px",
              width: "60px",
              left: "-47px",
              bottom: "53px",
            }}
          />
          <CardMedia
            src={Design}
            alt={Design}
            component="img"
            sx={{ mt: "30px" }}
          />
        </Box>
        <Box sx={{ height: "690px", width: "90%", mt: "70px" }}>
          <Swiper
            style={{
              height: "100%",
              width: "96%",
            }}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {swiperData.map((s, i) => (
              <SwiperSlide key={i}>
                <CardMedia
                  src={s.image}
                  component="img"
                  alt={s.image}
                  sx={{
                    maxWidth: "400px",
                    width: "100%",
                    height: "100%",
                    maxHeight: "600px",
                    borderRadius: "25px",
                  }}
                />
                <Box
                  sx={{
                    top: "-200px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "#FFFFFF",
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#FFFFFF",
                      mt: "20px",
                    }}
                  >
                    {s.subtitle}
                  </Typography>
                  <Button
                    sx={{
                      mt: "20px",
                      border: "1px solid #8E74FF",
                      borderRadius: "50px",
                      width: "108px",
                      height: "50px",
                      color: "#8E74FF",
                    }}
                  >
                    {s.view}
                  </Button>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section3;
