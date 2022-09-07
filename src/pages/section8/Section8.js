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

const customTextStyle1 = {
  fontFamily: "Open Sans",
  fontWeight: 400,
  fontSize: "14px",
  color: "#666666",
};

const CustomText = ({ text }) => (
  <Typography
    sx={{
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "14px",
      color: "#666666",
      mb: "10px",
    }}
  >
    {text}
  </Typography>
);

const SocialBox = () => (
  <Box
    sx={{
      width: "250px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <CardMedia
      component="img"
      src={Insta}
      alt={Insta}
      sx={{
        mr: "35px",
        width: { xs: "30px", sm: "auto" },
        height: { xs: "30px", sm: "auto" },
      }}
    />
    <CardMedia
      component="img"
      src={Kakao}
      alt={Kakao}
      sx={{
        mr: "35px",
        width: { xs: "30px", sm: "auto" },
        height: { xs: "30px", sm: "auto" },
      }}
    />
    <CardMedia
      component="img"
      src={Akar}
      alt={Akar}
      sx={{
        mr: "35px",
        width: { xs: "30px", sm: "auto" },
        height: { xs: "30px", sm: "auto" },
      }}
    />
    <CardMedia
      component="img"
      src={Telegram}
      alt={Telegram}
      sx={{
        // mr: "35px",
        width: { xs: "30px", sm: "auto" },
        height: { xs: "30px", sm: "auto" },
      }}
    />
  </Box>
);

function Section8() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid className="section8" container justifyContent="center">
      <Grid
        container
        justifyContent="center"
        sx={{ height: "250px", display: { xs: "none", sm: "flex" } }}
      >
        <Box
          sx={{
            px: { md: "4%", lg: "5%" },
            py: "2%",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "space-between" },
            borderBottom: "1px solid #ffffff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
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
          <SocialBox />
        </Box>

        <Box
          sx={{
            mt: "50px",
            px: "5%",
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
      <Grid
        container
        flexDirection="column"
        sx={{ px: "20px", display: { xs: "flex", sm: "none" }, mt: "20px" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            alt={Logo}
            src={Logo}
            sx={{ width: { xs: "150px", sm: "200px", md: "285px" } }}
          />
        </Box>
        <Box sx={{ mt: "30px" }}>
          <CustomText text="서울특별시 강남구 봉은사로 16길 37" />
          <CustomText text="통신판매업신고번호 2021-서울강남-00540" />
          <CustomText text="사업자등록번호 177-88-00119" />
          <CustomText text="help_meemz@marvrus.com" />
        </Box>
        <Box
          sx={{ mt: "45px", display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              ...customTextStyle1,
            }}
          >
            회사소개
          </Typography>
          <Typography
            sx={{
              ...customTextStyle1,
            }}
          >
            개인정보처리방침
          </Typography>
          <Typography
            sx={{
              ...customTextStyle1,
            }}
          >
            이용약관
          </Typography>
          <Typography
            sx={{
              ...customTextStyle1,
            }}
          >
            FAQ
          </Typography>
        </Box>
        <Box sx={{ mt: "40px", display: "flex", justifyContent: "center" }}>
          <SocialBox />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
          <Typography sx={{ ...customTextStyle1 }}>
            © MARVRUS . All Rights Reserved
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section8;
