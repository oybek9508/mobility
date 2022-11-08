import { Box, CardMedia, Button } from "@mui/material";
import { useRouter } from "next/router";

const KakaoButton = () => {
  const { locale } = useRouter();
  return (
    <CardMedia
      src={`/assets/images/kakao/${
        locale === "ko" ? "" : "en/"
      }kakao_login_large_wide.png`}
      alt="kakao"
      component="img"
      sx={{ cursor: "pointer" }}
    />
  );
};

export default KakaoButton;
