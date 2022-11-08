/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Grid, Typography, Box, CardMedia } from "@mui/material";

const Event = () => {
  // const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  // const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      id="section2"
      container
      sx={{
        px: "5%",
        position: "relative",
        bgColor: "#000",
        pb: "100px",
        top: 0,
        backgroundSize: "cover",
      }}
    >
      <Grid container flexDirection="column" alignItems="center">
        <Box
          data-aos="fade-left"
          data-aos-duration="2000"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            src="assets/images/events/heart.png"
            alt="Heart"
            sx={{
              width: { xs: "40px", sm: "70px" },
              height: { xs: "43px", sm: "75px" },
              position: "absolute",
              right: { xs: -30, sm: -40 },
            }}
          />
          <Typography
            sx={{
              fontFamily: "Cal Sans",
              fontSize: { xs: "12px", sm: "16px" },
              color: "#FFFFFF",
            }}
          >
            LIKE!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Cal Sans",
              fontSize: { xs: "40px", sm: "64px" },
              color: "#81C0FE",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Event
          </Typography>
        </Box>
        <Typography
          data-aos="fade-left"
          data-aos-duration="2000"
          sx={{
            mt: { xs: "30px", md: "70px" },
            fontFamily: "TmoneyRoundWind",
            fontSize: { xs: "12px", sm: "20px", md: "30px" },
            fontWeight: 800,
            color: "#fff",
            zIndex: { xs: 0, sm: 9998 },
          }}
        >
          가장 많은 ‘좋아요’ 수를 받은 분에게 선물을 드립니다.
        </Typography>
        <Box sx={{ width: "100%" }}>
          <CardMedia
            component="img"
            src="assets/images/events/Star2.png"
            alt="Star2"
            sx={{
              position: "absolute",
              width: "24px",
              height: "24px",
              bottom: "18%",
              left: "2%",
              display: { xs: "none", md: "block" },
            }}
          />
          <CardMedia
            component="img"
            src="assets/images/events/round.png"
            alt="Round"
            sx={{
              position: "absolute",
              width: { xs: "10px", sm: "20px", md: "30px" },
              height: { xs: "10px", sm: "20px", md: "30px" },
              bottom: "13%",
              left: "6%",
            }}
          />
          <CardMedia
            component="img"
            src="assets/images/events/round.png"
            alt="Round"
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              bottom: "10%",
              left: "16%",
              display: { xs: "none", md: "block" },
            }}
          />
          <CardMedia
            component="img"
            src="assets/images/events/starY.png"
            alt="StarY"
            sx={{
              position: "absolute",
              width: { xs: "17px", sm: "30px", md: "60px" },
              height: { xs: "17px", sm: "30px", md: "60px" },
              bottom: "20%",
              left: "20%",
            }}
          />
          <CardMedia
            component="img"
            src="assets/images/events/Rectangle1.png"
            alt="Rectangle1"
            sx={{
              position: "absolute",
              width: "18%",
              bottom: { xs: "25%", md: "30%" },
              left: { xs: 0, sm: "3%" },
            }}
          />
          <Box
            sx={{
              mt: "70px",
              position: "relative",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              // bgcolor: "gray",
            }}
          >
            <CardMedia
              component="img"
              src="assets/images/events/start.png"
              alt="Star"
              sx={{
                position: "absolute",
                width: { xs: "30px", sm: "50px", md: "79px" },
                height: { xs: "30px", sm: "50px", md: "79px" },
                top: "20%",
                left: "23%",
                zIndex: 9999,
              }}
            />

            <Typography
              data-aos="fade-right"
              data-aos-duration="2000"
              sx={{
                position: "absolute",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 400,
                color: "#fff",
                left: { xs: "6%", md: "13%" },
                width: "85px",
                textAlign: "end",
                top: "35%",
                display: { xs: "none", sm: "block" },
              }}
            >
              NFT ART Followers Like!
            </Typography>

            <CardMedia
              data-aos="zoom-in-down"
              component="img"
              src="assets/images/events/soon.png"
              alt="Soon"
              sx={{
                zIndex: 999999,
                position: "absolute",
                width: "19%",
                top: "42%",
                left: "35%",
                // height: "",
              }}
            />
            <CardMedia
              data-aos="zoom-in"
              data-aos-duration="2000"
              component="img"
              src="assets/images/events/car.png"
              alt="Car"
              sx={{
                zIndex: { xs: 99, md: 99999 },
                position: "relative",
                width: { xs: "70%", sm: "48%" },
              }}
            />
            <CardMedia
              data-aos="zoom-in"
              data-aos-duration="2000"
              component="img"
              src="assets/images/events/CarBg.png"
              alt="CarBg"
              sx={{
                position: "absolute",
                width: { xs: "35%", sm: "24%" },
                top: "18%",
                right: { xs: "20%", sm: "32%" },
              }}
            />
            <CardMedia
              data-aos="fade-left"
              data-aos-offset="500"
              data-aos-duration="2000"
              component="img"
              src="assets/images/events/world.png"
              alt="World"
              sx={{
                position: "absolute",
                width: { xs: "200px", md: "30%" },
                top: { xs: "-40%", md: "-15%" },
                right: { xs: "-30%", sm: "-10%" },
                zIndex: 1,
              }}
            />
            <CardMedia
              component="img"
              src="assets/images/events/Rectangle2.png"
              alt="Rectangle2"
              sx={{
                position: "absolute",
                width: "20%",
                top: { xs: "40%", sm: "24%" },
                right: { xs: 0, md: "5%" },
              }}
            />
            <CardMedia
              component="img"
              src="assets/images/events/starY.png"
              alt="StarY"
              sx={{
                position: "absolute",
                width: "60px",
                height: "60px",
                top: "53%",
                right: "10%",
                display: { xs: "none", md: "block" },
              }}
            />
            <CardMedia
              component="img"
              src="assets/images/events/Star2.png"
              alt="Star2"
              sx={{
                position: "absolute",
                width: { xs: "16px", sm: "24px" },
                height: { xs: "16px", sm: "24px" },
                bottom: "20%",
                right: "3%",
              }}
            />
            <CardMedia
              component="img"
              src="assets/images/events/round.png"
              alt="Round"
              sx={{
                position: "absolute",
                width: { xs: "8px", sm: "20px" },
                height: { xs: "8px", sm: "20px" },
                bottom: { xs: 0, md: "7%" },
                right: "19%",
              }}
            />

            <Typography
              data-aos="fade-left"
              data-aos-duration="2000"
              sx={{
                position: "absolute",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 400,
                color: "#fff",
                right: { xs: "2%", md: "6%", lg: "10%" },
                width: "200px",
                textAlign: "start",
                top: { xs: "80%", md: "71%" },
                display: { xs: "none", sm: "block" },
              }}
            >
              <span style={{ color: "#D7C19A" }}>Like!,</span> 여러분의 NFT를
              자랑해보세요!
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Event;
