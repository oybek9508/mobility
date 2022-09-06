import { Grid, Box, CardMedia, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Section8.css";
import Logo from "../../assets/section8/logo.png";
import Insta from "../../assets/section8/insta.png";
import Kakao from "../../assets/section8/kakao.png";
import Akar from "../../assets/section8/akar.png";
import Telegram from "../../assets/section8/telegram.png";

const customTextStyle = {
  fontfamily: "Inter",
  fontweight: 400,
  fontsize: "19px",
  color: "#FFFFFF",
  ml: { xs: "10px", sm: "20px", lg: "70px" },
  wordBreak: "keep-all",
};

function Section8() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid className="section8" container justifyContent="center">
      <Grid container justifyContent="center" sx={{ height: "250px" }}>
        <Box
          sx={{
            px: { md: "2%", lg: "5%" },
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "space-between" },
            borderBottom: "1px solid #ffffff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              alt={Logo}
              src={Logo}
              sx={{ width: { xs: "150px", sm: "200px", md: "285px" } }}
            />
            <Typography sx={{ ...customTextStyle }}>이용약관</Typography>
            <Typography sx={{ ...customTextStyle }}>
              개인정보처리방침
            </Typography>
            <Typography sx={{ ...customTextStyle }}>운영정책</Typography>
          </Box>
          <Box
            sx={{
              // width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              src={Insta}
              alt={Insta}
              sx={{ mr: "35px" }}
            />
            <CardMedia
              component="img"
              src={Kakao}
              alt={Kakao}
              sx={{ mr: "35px" }}
            />
            <CardMedia
              component="img"
              src={Akar}
              alt={Akar}
              sx={{ mr: "35px" }}
            />
            <CardMedia component="img" src={Telegram} alt={Telegram} sx={{}} />
          </Box>
        </Box>

        <Box
          sx={{
            mt: "50px",
            px: "5%",
            // display: "flex",
            // alignItems: "center",
            // flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "17px",
              color: "#FFFFFF",
              wordBreak: "keep-all",
            }}
          >
            서울특별시 강남구 봉은사로 16길 37 ㅣ 사업자등록번호 177F8F0119 ㅣ
            통신판매신고 2021-서울강남-00540 l Email: help_eppy@marvrus.com
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "17px",
              color: "#FFFFFF",
              mt: "45px",
            }}
          >
            ⓒ MARVRUS. Inc. All Rights Reserved
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section8;
