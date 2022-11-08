import { Box, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Language = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleLang, lang, isMobileScreen } = props;
  const { locale, asPath } = useRouter();

  console.log("locale", locale);

  return (
    <Box
      sx={{
        display: isMobileScreen
          ? { xs: "flex", sm: "none" }
          : { xs: "none", sm: "flex" },
      }}
    >
      <Link href={asPath} locale="ko" style={{ textDecoration: "none" }}>
        <Box
          onClick={() => handleLang("KOR")}
          sx={{
            display: "grid",
            placeItems: "center",
            width: { xs: "40px", md: "60px" },
            height: { xs: "20px", md: "30px" },
            border: lang === "KOR" ? "1px solid #8E74FF" : "none",
            borderRadius: "142px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: 600,
              fontSize: {
                xs: "12px",
                sm: "10px",
                md: "16px",
                lg: "20px",
              },
              color: lang === "KOR" ? "#FFFFFF" : "#808080",
            }}
          >
            KOR
          </Typography>
        </Box>
      </Link>
      <Link href={asPath} locale="en" style={{ textDecoration: "none" }}>
        <Box
          onClick={() => handleLang("ENG")}
          sx={{
            display: "grid",
            placeItems: "center",
            width: { xs: "40px", md: "60px" },
            height: { xs: "20px", md: "30px" },
            border: lang === "ENG" ? "1px solid #8E74FF" : "none",
            borderRadius: "142px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: 600,
              fontSize: {
                xs: "12px",
                sm: "10px",
                md: "16px",
                lg: "20px",
              },
              color: lang === "ENG" ? "#FFFFFF" : "#808080",
            }}
          >
            ENG
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Language;
