import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Language from "./Language";
import { CardMedia, Typography } from "@mui/material";

const navArr = ["EVENT", "CUSTOMIZE", "ROADMAP"];

export default function MenuDrawer({
  toggleDrawer,
  openMenu,
  handleLang,
  lang,
  isMobileScreen,
}) {
  const list = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Language handleLang={handleLang} lang={lang} isMobileScreen />
        <CardMedia
          component="img"
          sx={{ width: "24px", height: "24px" }}
          src="assets/images/cartverse/header/exit.png"
          alt="Exit"
          onClick={toggleDrawer}
        />
      </Box>
      <List sx={{ mt: "40px" }}>
        {navArr.map((nav, idx) => (
          <a
            key={idx}
            href={
              idx === 0
                ? "#section2"
                : idx === 1
                ? "#section4"
                : idx === 2 && "#section7"
            }
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ display: { xs: "flex", sm: "none" }, mb: "10px" }}>
              <Box
                position="relative"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  onClick={toggleDrawer}
                  sx={{
                    fontFamily: "Cal Sans",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#FFFFFF",
                  }}
                >
                  {nav}
                </Typography>
              </Box>
            </Box>
          </a>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#000" }}>
      <Drawer
        anchor={"right"}
        open={openMenu}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            bgcolor: "#1C1B18",
            width: "150px",
            px: "5%",
            pt: "20px",
            zIndex: 9999999,
            display: { xs: "block", sm: "none" },
          },
        }}
      >
        {list()}
      </Drawer>
    </Box>
  );
}
