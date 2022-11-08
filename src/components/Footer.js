/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, Box, CardMedia, Typography, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";

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

const linkStyle = {
  textDecoration: "none",
};

const socialStyle = {
  mr: "35px",
  width: "30px",
  height: "30px",
};

const socialData = [
  { src: "/assets/images/footer/insta.png", alt: "Insta" },
  { src: "/assets/images/footer/kakao.png", alt: "Kakao" },
  { src: "/assets/images/footer/akar.png", alt: "Akar" },
  { src: "/assets/images/footer/telegram.png", alt: "Telegram" },
];

const companyInfo = [
  "서울특별시 강남구 봉은사로 16길 37",
  "통신판매업신고번호 2021-서울강남-00540",
  "사업자등록번호 177-88-00119",
  "help_cartverse@marvrus.com",
];

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
    {socialData.map((data, idx) => (
      <CardMedia
        key={data.alt}
        component="img"
        src={data.src}
        alt={data.alt}
        sx={{
          ...socialStyle,
          mr: idx === 3 && 0,
        }}
      />
    ))}
  </Box>
);

const Footer = () => {
  const router = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";

  useEffect(() => {
    if (
      router.pathname.indexOf("/auth") > -1 ||
      router.pathname.indexOf("/mx/") > -1
    ) {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
    // check MyPage
    if (
      router.pathname.indexOf("/auth/find/") > -1 ||
      router.pathname.indexOf("/me/") > -1
    ) {
      setIsMyPage(true);
      setIsHome(false);
    } else {
      setIsMyPage(false);
    }
    // if (
    //   router.pathname !== "/me/user-info/edit" &&
    //   router.pathname !== "/me/user-info/edit/check-user"
    // ) {
    //   localStorage.removeItem("isCheckedAuth");
    // }
  }, [router.pathname]);

  return (
    <footer>
      <Grid
        container
        justifyContent="center"
        flexShrink={0}
        sx={{
          width: "100%",
          bgcolor: "#1C1B18",
          pb: "20px",
          mt: isHome ? "-132px" : "0",
        }}
      >
        <Grid
          container
          justifyContent="center"
          sx={{ height: "1005", display: { xs: "none", sm: "flex" } }}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 0, sm: 3, md: 0 },
              }}
            >
              <CardMedia
                component="img"
                src="/assets/images/footer/logo_large.png"
                alt="LogoLarge"
                sx={{
                  width: { xs: "120px", sm: "200px" },
                  objectFit: "contain",
                  height: "30px",
                }}
              />
              <Link href="/terms/service" passHref>
                <a style={{ ...linkStyle }}>
                  {" "}
                  <Typography sx={{ ...customTextStyle }}>
                    {" "}
                    <FormattedMessage id="footer_service" />
                  </Typography>
                </a>
              </Link>
              <Link href="/terms/privacy" passHref>
                <a style={{ ...linkStyle }}>
                  {" "}
                  <Typography sx={{ ...customTextStyle }}>
                    <FormattedMessage id="footer_privacy" />
                  </Typography>
                </a>
              </Link>
              <Link href="/terms/operation" passHref>
                <a style={{ ...linkStyle }}>
                  <Typography sx={{ ...customTextStyle }}>
                    {" "}
                    <FormattedMessage id="footer_operation" />
                  </Typography>
                </a>
              </Link>
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
              <FormattedMessage id="footer_company_address_pc" />
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
              Copyright © 2021 MARVRUS. Inc. All rights reserved
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
              alt="/assets/images/footer/logo.png"
              src="/assets/images/footer/logo.png"
              sx={{ width: { xs: "150px", sm: "200px", md: "285px" } }}
            />
          </Box>
          <Box sx={{ mt: "30px" }}>
            {companyInfo.map((text) => (
              <CustomText key={text} text={text} />
            ))}
          </Box>
          <Box
            sx={{
              mt: "45px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <a href="" style={{ ...linkStyle }}>
              <Typography
                sx={{
                  ...customTextStyle1,
                }}
              >
                이용약관
              </Typography>
            </a>
            <a href="" style={{ ...linkStyle }}>
              <Typography
                sx={{
                  ...customTextStyle1,
                }}
              >
                개인정보처리방침
              </Typography>
            </a>
            <a href="" style={{ ...linkStyle }}>
              <Typography
                sx={{
                  ...customTextStyle1,
                }}
              >
                운영정책
              </Typography>
            </a>
          </Box>
          <Box sx={{ mt: "40px", display: "flex", justifyContent: "center" }}>
            <SocialBox />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
            <Typography sx={{ ...customTextStyle1 }}>
              ⓒ MARVRUS. Inc. All Rights Reserved
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
