import { ExpandMore } from "@mui/icons-material";
import { Box, Button, MenuItem, IconButton, Divider } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const LangPopover = (props) => {
  const { openReadyPopup } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { locale, asPath } = useRouter();

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "block" }}>
      <Button
        aria-owns={anchorEl ? "lang-popover" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: "#9f9f9f",
          minWidth: "auto",
          fontFamily: "GmarketSansTTFMedium",
        }}
      >
        {locale === "ko" ? "KOR" : "ENG"}
        <ExpandMore />
      </Button>
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
            id="lang-popover"
            sx={{
              right: 0,
              position: "absolute",
              background: "#fff",
              borderRadius: 2,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              zIndex: 9999,
            }}
          >
            <Link
              href={asPath}
              locale={locale === "ko" ? "en" : "ko"}
              style={{ textDecoration: "none" }}
            >
              <MenuItem
                sx={{
                  fontSize: "0.875rem",
                  fontFamily: "GmarketSansTTFMedium",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "auto",
                  width: 90,
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                <Button
                  sx={{
                    color: "#9f9f9f",
                    minWidth: "auto",
                    px: 0,
                    borderRadius: 0,
                    fontFamily: "GmarketSansTTFMedium",
                    width: "100%",
                  }}
                >
                  {locale === "ko" ? "ENG" : "KOR"}
                </Button>
              </MenuItem>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LangPopover;
