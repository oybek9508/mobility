import { Box, Grid } from "@mui/material";
import React from "react";
import FacebookLoginButton from "src/components/FacebookLoginButton";
import KakaoLoginButton from "src/components/KakaoLoginButton";
import NaverLoginButton from "src/components/NaverLoginButton";

const SocialLogin = () => {
  return (
    <Grid container flexDirection="column" alignItem="center" mt={3} mb={1}>
      <Box>
        <FacebookLoginButton />
        <KakaoLoginButton />
        <NaverLoginButton />
      </Box>
    </Grid>
  );
};

export default SocialLogin;
