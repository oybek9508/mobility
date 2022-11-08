import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "src/hooks/useAuth";
import { H3, H6 } from "./Typography";
import LangPopover from "./LangPopover";
import Footer from "./Footer";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import UserPopover from "./user/UserPopover";

const Layout = ({ children, isFullWidth = false }) => {
  const router = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openReadyPopup, setOpenReadyPopup] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  console.log("isAuthenticated, user", isAuthenticated, user);

  useEffect(() => {
    if (router.pathname.indexOf("/auth") > -1) {
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

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const updateScroll = () => {
    setScrollPosition(document.documentElement.scrollTop);
  };

  const handleLogout = () => {
    // if (address) disconnect();
    logout();
    setOpenLogoutPopup(false);
    router.push("/");
    // location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#fff" }}>
      {!isHome && (
        <AppBar
          position="fixed"
          component="nav"
          sx={{
            bgcolor: "#0F102E",
            zIndex: 99999999,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="button"
              onClick={() => {
                router.push("/");
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: "#C1C1C1",
                }}
              >
                CARTVERSE
              </Typography>
            </Button>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isAuthenticated ? (
                <Button color="inherit" type="button" onClick={handleLogout}>
                  <H6>
                    {" "}
                    <FormattedMessage id="top_menu_logout" />
                  </H6>
                </Button>
              ) : (
                <Button
                  color="inherit"
                  type="button"
                  onClick={handleLoginClick}
                >
                  <H6>
                    {" "}
                    <FormattedMessage id="top_menu_login" />
                  </H6>
                </Button>
              )}
              <LangPopover openReadyPopup={() => setOpenReadyPopup(true)} />
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {isFullWidth ? (
        <>{children}</>
      ) : (
        <Container sx={{ pt: 8 }}>{children}</Container>
      )}
      <Footer />
    </Box>
  );
};

export default Layout;
