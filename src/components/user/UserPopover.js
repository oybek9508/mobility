import React, { useState, useEffect, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Button, MenuItem, IconButton, Divider } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuth from "src/hooks/useAuth";
// import useCoin from "src/hooks/useCoin";

const UserPopover = (props) => {
  const { scrollPosition, isHome, handleLogout } = props;
  const { user } = useAuth();
  // const { totalCoins, getTotalCoins } = useCoin();
  const router = useRouter();
  const { locale, defaultLocale } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const intl = useIntl();

  // const userMenuItems = [
  //   { title: `${totalCoins.toLocaleString("ko-KR")} C`, type: "COIN" },
  //   { title: intl.formatMessage({ id: "top_menu_mypage" }), type: "MYPAGE" },
  // ];

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* PC */}
      <Box
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      >
        <IconButton
          color="inherit"
          sx={{ mr: 1 }}
          aria-owns={anchorEl ? "user-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          // onMouseOver={handleClick}
        >
          <Image
            priority
            src="/assets/images/header/btn_user_m_black.png"
            width={20}
            height={20}
          />
        </IconButton>
        {Boolean(anchorEl) && (
          <>
            <Box
              sx={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              onClick={handleClose}
            />
            <Box
              id="user-menu"
              sx={{
                right: 50,
                // right: -20,
                position: "absolute",
                background: "#fff",
                py: 1,
                borderRadius: 2,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                zIndex: 9999,
              }}
            >
              {/* {userMenuItems.map((item, ind) => {
                return (
                  <MenuItem
                    key={ind}
                    sx={{
                      fontSize: "0.875rem",
                      fontFamily: "GmarketSansTTFMedium",
                      color: item.type === "COIN" ? "red" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "auto",
                      cursor: item.type === "COIN" ? "default" : "pointer",
                    }}
                    onClick={() => {
                      if (item.type === "MYPAGE") {
                        router.push("/me/user-info");
                      }
                    }}
                  >
                    {item.title}
                  </MenuItem>
                );
              })} */}
              <Divider />
              <MenuItem
                sx={{
                  fontSize: "0.875rem",
                  fontFamily: "GmarketSansTTFMedium",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "auto",
                }}
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                <FormattedMessage id="top_menu_logout" />
              </MenuItem>
            </Box>
          </>
        )}
      </Box>
      {/* Mobile */}
      <Box
        sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
      >
        <IconButton
          color="inherit"
          sx={{ mr: 1 }}
          aria-owns={anchorEl ? "user-menu-mobile" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Image
            priority
            src={
              scrollPosition < 200 && isHome
                ? "/assets/images/header/btn_user_m_white.png"
                : "/assets/images/header/btn_user_m_black.png"
            }
            width={18}
            height={18}
          />
        </IconButton>
        {Boolean(anchorEl) && (
          <>
            <Box
              sx={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              onClick={handleClose}
            />
            <Box
              id="user-menu-mobile"
              sx={{
                right: 10,
                position: "absolute",
                background: "#fff",
                py: 1,
                borderRadius: 2,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                zIndex: 9999,
              }}
            >
              {/* {userMenuItems.map((item, ind) => {
                return (
                  <MenuItem
                    key={ind}
                    sx={{
                      fontSize: "0.875rem",
                      fontFamily: "GmarketSansTTFMedium",
                      color: item.type === "COIN" ? "red" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "auto",
                      cursor: item.type === "COIN" ? "default" : "pointer",
                    }}
                    onClick={() => {
                      if (item.type === "MYPAGE") {
                        router.push("/me/user-info");
                      }
                    }}
                  >
                    {item.title}
                  </MenuItem>
                );
              })} */}
              <Divider />
              <MenuItem
                sx={{
                  fontSize: "0.875rem",
                  fontFamily: "GmarketSansTTFMedium",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "auto",
                }}
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                <FormattedMessage id="top_menu_logout" />
              </MenuItem>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default UserPopover;
