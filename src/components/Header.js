/* eslint-disable react/react-in-jsx-scope */
import { Box, CardMedia, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MenuDrawer from "./MenuDrawer";
import Language from "./Language";
import Link from "next/link";
import { useRouter } from "next/Router";
import { H6 } from "./Typography";
import { FormattedMessage } from "react-intl";
import useAuth from "src/hooks/useAuth";

const mobileLoginButtonStyle = {
  height: "24px",
  px: 2,
  mr: 2,
  background: "linear-gradient(34.4deg, #8E74FF 13.14%, #7256EF 84.87%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  borderRadius: "50px",
  fontSize: "12px",
  fontWeight: 600,
};

const loginButtonStyle = {
  fontFamily: "Noto Sans",
  fontWeight: 600,
  fontSize: { xs: "12px", sm: "10px", md: "16px", lg: "20px" },
  color: "#FFFFFF",
  display: { xs: "none", sm: "block" },
};

const navArr = [
  { title: "CARTVERSE", link: "section1" },
  { title: "EVENT", link: "section2" },
  { title: "CUSTOMIZE", link: "section4" },
  { title: "ROADMAP", link: "section7" },
];

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("KOR");
  const [openMenu, setOpenMenu] = useState(false);

  const handleLang = (language) => {
    setLang(language);
  };

  const toggleDrawer = () => {
    setOpenMenu(!openMenu);
  };

  const onHandleScrollView = (id) => {
    setTimeout(() => {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "50px",
      }}
    >
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: { xs: "100px", sm: "150px" }, width: "100%", px: "5%" }}
      >
        {navArr.map((nav, idx) => (
          <Link
            key={idx}
            href={`#${nav.link}`}
            style={{ textDecoration: "none", curser: "pointer" }}
          >
            <a>
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <Box
                  position="relative"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    type="button"
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
                    {nav.title}
                  </Button>
                </Box>
              </Box>
            </a>
          </Link>
        ))}
        {isAuthenticated ? (
          <Button
            sx={{
              ...loginButtonStyle,
            }}
            type="button"
            onClick={handleLogout}
          >
            <FormattedMessage id="top_menu_logout" />
          </Button>
        ) : (
          <Button
            sx={{
              ...loginButtonStyle,
            }}
            type="button"
            onClick={handleLoginClick}
          >
            <FormattedMessage id="top_menu_login" />
          </Button>
        )}
        <Language lang={lang} handleLang={handleLang} isMobileScreen={false} />
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
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                type="button"
                sx={{
                  ...mobileLoginButtonStyle,
                }}
              >
                <FormattedMessage id="top_menu_logout" />
              </Button>
            ) : (
              <Button
                onClick={handleLoginClick}
                type="button"
                sx={{
                  ...mobileLoginButtonStyle,
                }}
              >
                <FormattedMessage id="top_menu_mobile_login" />
              </Button>
            )}
            <CardMedia
              onClick={toggleDrawer}
              component="img"
              sx={{ width: "24px", height: "24px", color: "#fff" }}
              src="assets/images/cartverse/header/hamburger.png"
              alt="Hamburger"
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
    </Grid>
  );
}

export default Header;
