import { Grid, Box, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import "./Section6.css";
import Bitcoin from "../../assets/section6/bitcoin.png";
import Soon from "../../assets/section6/soon.png";

function Section6() {
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const defaultMessage = "메세지를 찾을 수 없습니다. (locale: {locale})";
  return (
    <Grid
      className="section6"
      id="section6"
      container
      flexDirection="column"
      alignItems="center"
      sx={{ height: { xs: "700px", sm: "900px", md: "1000px", lg: "1120px" } }}
    >
      <Box sx={{ position: "relative", mt: "160px" }}>
        <Typography
          sx={{
            fontFamily: "Cal Sans",
            fontWeight: 600,
            fontSize: { xs: "40px", sm: "64px" },
            color: "#FFFFFF",
          }}
        >
          TOKEN
        </Typography>
        <CardMedia
          src={Bitcoin}
          component="img"
          sx={{
            width: { xs: "43px", sm: "126px" },
            position: "absolute",
            top: { xs: "-15px", sm: "-39px" },
            right: { xs: "-26px", sm: "-103px" },
          }}
          alt={Bitcoin}
        />
      </Box>
      <CardMedia
        src={Soon}
        component="img"
        sx={{
          mt: { xs: "50px", sm: "100px", lg: "160px" },
          width: { xs: "140px", sm: "250px" },
          height: { xs: "80px", sm: "140px" },
        }}
        alt={Soon}
      />
      <Box
        sx={{
          mt: { xs: "200px", md: "300px", lg: "350px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "210px", sm: "100%" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: { xs: "12px", sm: "16px" },
            color: "#FFFFFF",
            wordBreak: "keep-all",
            textAlign: "center",
          }}
        >
          TOKEN은 카트버스 생태계에서 현금처럼 사용할 수 있는 포인트입니다.{" "}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Tmoney RoundWind",
            fontWeight: 800,
            fontSize: { xs: "12px", sm: "16px" },
            color: "#FFFFFF",
            wordBreak: "keep-all",
            textAlign: "center",
          }}
        >
          TOKEN으로 할 수 있는 놀라운 혜택들을 기대해 주세요
        </Typography>
      </Box>
    </Grid>
  );
}

export default Section6;
