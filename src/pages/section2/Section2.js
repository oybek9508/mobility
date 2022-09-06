import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import "./Section2.css";
import Heart from "../../assets/section2/heart.png";
import Car from "../../assets/section2/car.png";
import CarBg from "../../assets/section2/CarBg.png";
import Star from "../../assets/section2/start.png";
import Star2 from "../../assets/section2/Star2.png";
import StarY from "../../assets/section2/starY.png";
import World from "../../assets/section2/world.png";
import Round from "../../assets/section2/round.png";
import Rectangle1 from "../../assets/section2/Rectangle1.png";
import Rectangle2 from "../../assets/section2/Rectangle2.png";
import Soon from "../../assets/section2/soon.png";

function Section2() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid className="section2" id="section2" container sx={{ px: "5%" }}>
      <Grid container flexDirection="column" alignItems="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            src={Heart}
            alt={Heart}
            sx={{
              width: "70px",
              height: "75px",
              position: "absolute",
              right: -40,
            }}
          />
          <Typography
            sx={{
              fontFamily: "Cal Sans",
              fontSize: "16px",
              color: "#FFFFFF",
            }}
          >
            LIKE!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Cal Sans",
              fontSize: "64px",
              color: "#81C0FE",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Event
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: "70px",
            fontFamily: "Tmoney RoundWind",
            fontSize: "30px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          가장 많은 ‘좋아요’ 수를 받은 분에게 선물을 드립니다.
        </Typography>
        <Box sx={{ width: "100%" }}>
          <CardMedia
            component="img"
            src={Star2}
            alt={Star2}
            sx={{
              position: "absolute",
              width: "24px",
              height: "24px",
              bottom: "18%",
              left: "2%",
            }}
          />
          <CardMedia
            component="img"
            src={Round}
            alt={Round}
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              bottom: "13%",
              left: "6%",
            }}
          />
          <CardMedia
            component="img"
            src={Round}
            alt={Round}
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              bottom: "10%",
              left: "16%",
            }}
          />
          <CardMedia
            component="img"
            src={StarY}
            alt={StarY}
            sx={{
              position: "absolute",
              width: "60px",
              height: "60px",
              bottom: "20%",
              left: "20%",
            }}
          />
          <CardMedia
            component="img"
            src={Rectangle1}
            alt={Rectangle1}
            sx={{
              position: "absolute",
              width: "18%",
              // height: "60px",
              bottom: "30%",
              left: "3%",
            }}
          />
          <Box
            sx={{
              mt: "70px",
              position: "relative",
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              // bgcolor: "gray",
            }}
          >
            <CardMedia
              component="img"
              src={Star}
              alt={Star}
              sx={{
                position: "absolute",
                width: "79px",
                height: "79px",
                top: "20%",
                left: "23%",
              }}
            />

            <Typography
              sx={{
                position: "absolute",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 400,
                color: "#fff",
                left: { xs: "6%", md: "13%" },
                width: "85px",
                textAlign: "end",
                top: "35%",
              }}
            >
              NFT ART Followers Like!
            </Typography>

            <CardMedia
              component="img"
              src={Soon}
              alt={Soon}
              sx={{
                zIndex: 999999,
                position: "absolute",
                width: "19%",
                top: "42%",
                left: "35%",
                // height: "",
              }}
            />
            <CardMedia
              component="img"
              src={Car}
              alt={Car}
              sx={{
                zIndex: 9999,
                position: "relative",
                width: "48%",
                // height: "",
              }}
            />
            <CardMedia
              component="img"
              src={CarBg}
              alt={CarBg}
              sx={{
                position: "absolute",
                width: "24%",
                top: "18%",
                right: "32%",
              }}
            />
            <CardMedia
              component="img"
              src={World}
              alt={World}
              sx={{
                position: "absolute",
                width: "30%",
                top: "-15%",
                right: "-10%",
                zIndex: 9999,
              }}
            />
            <CardMedia
              component="img"
              src={Rectangle2}
              alt={Rectangle2}
              sx={{
                position: "absolute",
                width: "20%",
                top: "24%",
                right: "5%",
              }}
            />
            <CardMedia
              component="img"
              src={StarY}
              alt={StarY}
              sx={{
                position: "absolute",
                width: "60px",
                height: "60px",
                top: "53%",
                right: "10%",
              }}
            />
            <CardMedia
              component="img"
              src={Star2}
              alt={Star2}
              sx={{
                position: "absolute",
                width: "24px",
                height: "24px",
                bottom: "20%",
                right: "3%",
              }}
            />
            <CardMedia
              component="img"
              src={Round}
              alt={Round}
              sx={{
                position: "absolute",
                width: "20px",
                height: "20px",
                bottom: "7%",
                right: "19%",
              }}
            />

            <Typography
              sx={{
                position: "absolute",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 400,
                color: "#fff",
                right: { xs: "2%", md: "6%", lg: "10%" },
                width: "200px",
                textAlign: "start",
                top: { xs: "80%", md: "71%" },
              }}
            >
              <span style={{ color: "#D7C19A" }}>Like!,</span> 여러분의 NFT를
              자랑해보세요!
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Section2;
