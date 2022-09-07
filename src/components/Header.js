import {
  Box,
  Card,
  CardMedia,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { HeaderImgs } from "../assets/section1/header/index";
import Hamburger from "../assets/section1/header/hamburger.png";

const { Vector } = HeaderImgs;

const navArr = [
  "CARTVERSE",
  "EVENT",
  "CUSTOMIZE",
  "ROADMAP",
  "WORLD",
  "로그인/회원가입",
  "",
];

function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("KOR");
  console.log("lang", lang);

  const handleChange = () => {
    setOpen(!open);
  };

  const handleLang = (language) => {
    setLang(language);
  };

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: { xs: "100px", sm: "150px" }, width: "100%" }}
    >
      {navArr.map((nav, idx) => (
        <a
          href={
            idx === 0
              ? "#section1"
              : idx === 1
              ? "#section2"
              : idx === 2
              ? "#section4"
              : idx === 3 && "#section7"
          }
          style={{ textDecoration: "none" }}
        >
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Box
              position="relative"
              onClick={idx === 6 && handleChange}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontFamily: "Noto Sans",
                  fontWeight: 600,
                  fontSize:
                    idx === 0
                      ? { xs: "18px", md: "24px", lg: "32px" }
                      : { xs: "12px", sm: "12px", md: "16px", lg: "20px" },
                  color: "#FFFFFF",
                }}
              >
                {nav}
              </Typography>
              {idx === 6 && (
                <>
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
                    {lang}
                  </Typography>
                  <Box sx={{ ml: "5px" }}>
                    <CardMedia
                      onChange={handleChange}
                      component="img"
                      src={Vector}
                      alt={Vector}
                      sx={{ height: "8px", width: "16px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: open ? "block" : "none",
                      position: "absolute",
                      top: "100%",
                      zIndex: 9999,
                      left: -15,
                      mt: "10px",
                    }}
                  >
                    <Card
                      elevation={3}
                      sx={{
                        p: "0.5rem",
                        width: "100%",
                      }}
                    >
                      <MenuItem onClick={() => handleLang("KOR")}>KOR</MenuItem>
                      <MenuItem onClick={() => handleLang("ENG")}>ENG</MenuItem>
                    </Card>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </a>
      ))}
      <Box
        sx={{
          width: "100%",
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Cal Sans",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "20px",
            color: "#FFFFFF",
          }}
        >
          Cartverse
        </Typography>
        <CardMedia
          component="img"
          sx={{ width: "24px", width: "24px", color: "#fff" }}
          src={Hamburger}
          alt={Hamburger}
        />
      </Box>
    </Grid>
  );
}

export default Header;
