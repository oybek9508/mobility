/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "./Section3.css";
import Design from "../../assets/section3/designs.png";
import Fire from "../../assets/section3/fire.png";
import Car1 from "../../assets/section3/car1.png";
import Car2 from "../../assets/section3/car2.png";
import Car3 from "../../assets/section3/car3.png";
import LeftArrow from "../../assets/section3/leftArrow.png";
import RightArrow from "../../assets/section3/rightArrow.png";
import { useWindowSize } from "../../hooks/useWindowSize";

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
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const size = useWindowSize();

  return (
    <Grid
      className="section3"
      id="section3"
      sx={{
        height: { xs: "700px", sm: "1000px", md: "1100px", lg: "1190px" },
      }}
    >
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
              fontSize: { xs: "12px", sm: "16px" },
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
              height: { xs: "40px", sm: "80px" },
              width: { xs: "30px", sm: "60px" },
              left: { xs: "190px", sm: "-47px" },
              bottom: { xs: "35px", sm: "53px" },
            }}
          />
          <CardMedia
            src={Design}
            alt={Design}
            component="img"
            sx={{
              mt: { xs: "15px", sm: "30px" },
              width: { xs: "200px", sm: "auto" },
            }}
          />
        </Box>
        <Box
          sx={{
            height: { xs: "430px", sm: "auto" },
            width: "90%",
            mt: "70px",
          }}
        >
          <Swiper
            style={{
              height: "80%",
              width: "96%",
            }}
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            navigation
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
                    width: { xs: "80%", md: "80%", lg: "80%" },
                    height: "100%",
                    borderRadius: "25px",
                    ml: "10%",
                  }}
                />
                <Box
                  sx={{
                    width: "80%",
                    top: { xs: "-150px", sm: "-170px", md: "-200px" },
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: {
                        xs: "16px",
                        sm: "18px",
                        md: "20px",
                        lg: "24px",
                      },
                      color: "#FFFFFF",
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        lg: "18px",
                      },
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
                      color: { xs: "#fff", sm: "#8E74FF" },
                      bgcolor: { xs: "#8E74FF", sm: "transparent" },
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
