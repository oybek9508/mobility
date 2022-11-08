import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CardMedia, Grid, Box, Typography } from "@mui/material";

const customTextStyle = {
  fontFamily: "TmoneyRoundWind",
  fontWeight: 800,
  fontSize: { xs: "12px", sm: "18px" },
  color: "#FFFFFF",
  wordBreak: "keep-all",
};

const Roadmap = () => {
  // const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      className="roadmap"
      id="section7"
      container
      justifyContent="center"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <Grid
        container
        justifyContent="space-between"
        flexDirection={{ xs: "column-reverse", md: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{
          width: { xs: "95%", lg: "80%" },
          mt: "100px",
          py: "10%",
        }}
      >
        <CardMedia
          data-aos="fade-right"
          data-aos-duration="3000"
          src="assets/images/roadmap/car.png"
          alt="Car"
          sx={{
            width: { xs: "300px", sm: "315px", md: "40%" },
            ml: { xs: "-90px", sm: 0 },
            mt: { xs: 4, sm: 5, md: 0 },
          }}
          component="img"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: { xs: "5%", sm: 0 },
          }}
        >
          <Box
            data-aos="fade-left"
            data-aos-duration="2000"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontFamily: "Cal Sans",
                fontWeight: 600,
                fontSize: { xs: "40px", sm: "64px" },
                color: "#81C0FE",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              ROADMAP
            </Typography>
            <CardMedia
              src="assets/images/roadmap/pin.png"
              alt="Pin"
              component="img"
              sx={{ width: "53px", height: "73px", mb: "25px" }}
            />
          </Box>
          <Typography
            data-aos="fade-right"
            data-aos-duration="2500"
            sx={{ ...customTextStyle }}
          >
            슈퍼카 컬렉터 영역에 특화된
          </Typography>
          <Typography
            data-aos="fade-right"
            data-aos-duration="3000"
            sx={{
              ...customTextStyle,
              fontSize: { xs: "14px", sm: "24px" },
              color: "#7F64F7",
              fontWeight: "bold",
            }}
          >
            카트버스가 곧 출시돼요!{" "}
          </Typography>
          <Typography
            data-aos="fade-right"
            data-aos-duration="3500"
            sx={{ ...customTextStyle }}
          >
            이 곳 카트버스에서,{" "}
          </Typography>
          <Typography
            data-aos="fade-right"
            data-aos-duration="4000"
            sx={{ ...customTextStyle }}
          >
            여러분들을 위해 준비한 슈퍼카 커스텀을 경험해 보세요
          </Typography>
          <Box
            data-aos="fade-right"
            data-aos-duration="4500"
            sx={{
              mt: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              src="assets/images/roadmap/google_play.png"
              alt="GooglePlay"
              component="img"
              sx={{ width: { xs: "45%", sm: "240px" } }}
            />
            <CardMedia
              src="assets/images/roadmap/apple.png"
              alt="AppStore"
              component="img"
              sx={{ width: { xs: "45%", sm: "240px" }, ml: "24px" }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Roadmap;
