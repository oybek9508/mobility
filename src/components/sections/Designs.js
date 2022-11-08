/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import FlexBox from "../FlexBox";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperData = [
  {
    title: "#23 Power Porsche",
    subtitle: "Yellow Super Car Collection #13",
    view: "view",
    image: "assets/images/designs/car1.png",
  },
  {
    title: "#1 Power Porsche",
    subtitle: "Future Super Car Collection #01",
    view: "view",
    image: "assets/images/designs/car2.png",
  },
  {
    title: "#3 White Porsche",
    subtitle: "White Super Car Collection #03",
    view: "view",
    image: "assets/images/designs/car3.png",
  },
  {
    title: "#23 Power Porsche",
    subtitle: "Yellow Super Car Collection #13",
    view: "view",
    image: "assets/images/designs/car1.png",
  },
  {
    title: "#1 Power Porsche",
    subtitle: "Future Super Car Collection #01",
    view: "view",
    image: "assets/images/designs/car2.png",
  },
  {
    title: "#3 White Porsche",
    subtitle: "White Super Car Collection #03",
    view: "view",
    image: "assets/images/designs/car3.png",
  },
];

const Designs = () => {
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Grid
      data-aos="fade-up"
      data-aos-duration="3000"
      id="section3"
      sx={{
        height: { xs: "700px", sm: "1000px", md: "1100px", lg: "1190px" },
        width: "100vw",
        bgColor: "#000",
        backgroundImage: "url(/assets/images/designs/section3_bg_icon.png)",
        position: "relative",
        backgroundSize: "cover",
        top: 0,
      }}
    >
      <Grid
        container
        alignItems="center"
        flexDirection="column"
        sx={{ height: "100%", mt: "40px" }}
      >
        <Box
          data-aos="fade-left"
          data-aos-duration="3000"
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
            src="assets/images/designs/fire.png"
            alt="Fire"
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
            src="assets/images/designs/designs.png"
            alt="Design"
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
          {/* <FlexBox sx={{ width: "100%", position: "absolute", top: "34%" }}>
            <div ref={prevRef} className="swiper-button-prev" />
            <div ref={nextRef} className="swiper-button-next" />
          </FlexBox> */}
          <Swiper
            style={{
              height: "90%",
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
            navigation={true}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {swiperData.map((s, i) => (
              <SwiperSlide key={i} style={{ height: "80%" }}>
                {({ isActive, isNext }) => (
                  <Box
                    onClick={() => console.log(`Slider ${i + 1} got clicked`)}
                  >
                    <CardMedia
                      src={s.image}
                      component="img"
                      alt={s.image}
                      sx={{
                        width: { xs: "80%", md: "80%", lg: "80%" },
                        height: {
                          xs: "300px",
                          sm: "430px",
                          md: "450px",
                          lg: !isNext ? "450px" : "500px",
                        },
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
                          color: {
                            xs: "#fff",
                            sm: isNext ? "#fff" : "#8E74FF",
                          },
                          bgcolor: {
                            xs: "#8E74FF",
                            sm: "transparent",
                            lg: isNext ? "#8E74FF" : "transparent",
                          },
                        }}
                      >
                        {s.view}
                      </Button>
                    </Box>
                  </Box>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Designs;
