/* eslint-disable react/react-in-jsx-scope */
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Hamburger from "../assets/section1/header/hamburger.png";
import LoginBtn from "../assets/section1/header/login_btn.png";
import MenuDrawer from "./MenuDrawer";
import Language from "./Language";
import cartverseVideo from "../assets/section1/header/cartverse.mp4";

const navArr = [
  "CARTVERSE",
  "EVENT",
  "CUSTOMIZE",
  "ROADMAP",
  // "WORLD",
  // "로그인/회원가입",
  "",
];

function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("KOR");
  const [openMenu, setOpenMenu] = useState(false);
  console.log("lang", lang);

  const handleChange = () => {
    setOpen(!open);
  };

  const handleLang = (language) => {
    setLang(language);
  };

  const toggleDrawer = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "955px",
        px: "5%",
        position: "relative",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "50%",
          top: "50%",
          objectFit: "fill",
          transform: "translate(-50%, -50%)",
        }}
      >
        <source src={cartverseVideo} type="video/mp4" />
      </video>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: { xs: "100px", sm: "150px" }, width: "100%", px: "5%" }}
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
                        : { xs: "12px", sm: "10px", md: "16px", lg: "20px" },
                    color: "#FFFFFF",
                  }}
                >
                  {nav}
                </Typography>
                {idx === 6 && <Language handleLang={handleLang} lang={lang} />}
              </Box>
            </Box>
          </a>
        ))}
        <Box
          sx={{
            width: "100%",
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            zIndex: 1000,
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <CardMedia
              component="img"
              sx={{ width: "76px", height: "24px", color: "#fff", mr: 1 }}
              src={LoginBtn}
              alt={LoginBtn}
            /> */}
            <CardMedia
              onClick={toggleDrawer}
              component="img"
              sx={{ width: "24px", height: "24px", color: "#fff" }}
              src={Hamburger}
              alt={Hamburger}
            />
            <MenuDrawer
              toggleDrawer={toggleDrawer}
              openMenu={openMenu}
              handleLang={handleLang}
              lang={lang}
            />
          </Box>
        </Box>
      </Grid>
      //{" "}
    </Grid>
  );
}

export default Header;
