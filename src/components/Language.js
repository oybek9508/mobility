import { Box, Typography } from "@mui/material";
import React from "react";

const Language = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleLang, lang } = props;

  return (
    <Box sx={{ display: "flex" }}>
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
            color: "#FFFFFF",
          }}
        >
          KOR
        </Typography>
      </Box>
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
            color: "#FFFFFF",
          }}
        >
          ENG
        </Typography>
      </Box>
    </Box>
  );
};

export default Language;
