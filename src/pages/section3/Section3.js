import { useRef, useState } from "react";
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
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Grid
      className="section3"
      id="section3"
      sx={{
        height: { xs: "1000px", sm: "1000px", md: "1100px", lg: "1190px" },
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
            navigation
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {swiperData.map((s, i) => (
              <>
                <SwiperSlide key={i}>
                  <CardMedia
                    src={s.image}
                    component="img"
                    alt={s.image}
                    sx={{
                      // maxWidth: "350px",
                      width: { xs: "80%", md: "90%", lg: "80%" },
                      height: { xs: "40%", sm: "50%", md: "70%", lg: "80%" },
                      // maxHeight: "600px",
                      borderRadius: "25px",
                      ml: "40px",
                    }}
                  />
                  <Box
                    sx={{
                      // maxWidth: "400px",
                      width: "80%",
                      top: "-200px",
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
                          md: "16px",
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
                        color: "#8E74FF",
                      }}
                    >
                      {s.view}
                    </Button>
                  </Box>
                </SwiperSlide>
                <Box ref={navigationPrevRef} className="cursor-pointer">
                  <CardMedia
                    src={LeftArrow}
                    alt={LeftArrow}
                    sx={{ width: "72px", height: "72px" }}
                  />
                </Box>
                <Box ref={navigationNextRef} className="cursor-pointer">
                  <CardMedia
                    src={RightArrow}
                    alt={RightArrow}
                    sx={{ width: "72px", height: "72px" }}
                  />
                </Box>
              </>
            ))}
          </Swiper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section3;
