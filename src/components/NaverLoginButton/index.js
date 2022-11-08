import { useEffect, useRef } from "react";
import {
  loadNaverSdk,
  initNaverLogin,
  removeNaverSdk,
} from "src/libs/utils/naverClient";
import { Box, Grid } from "@mui/material";

import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";
import useAuth from "src/hooks/useAuth";
import NaverButton from "./NaverButton";
import { isDesktop, isMobile, isTablet } from "react-device-detect";

const NaverLoginButton = () => {
  const router = useRouter();
  const ref = useRef();
  const { social_login } = useAuth();
  const { setSocialUserInfo, socialUser } = useSignup();

  useEffect(() => {
    initNaver();

    return () => {
      removeNaverSdk();
    };
  }, []);

  useEffect(() => {
    console.log("Soca", socialUser);
  }, [socialUser]);

  // useEffect(() => {
  //   console.log("Openaers", window.opener);
  // }, [opener]);

  const initNaver = async () => {
    await loadNaverSdk();

    let isPopup = isMobile ? false : true;
    isPopup = isTablet ? false : true;

    const naverLogin = initNaverLogin(isPopup, true);
    naverLogin.init();
  };

  const handleClick = () => {
    const loginButton = document.getElementById("naverIdLogin").firstChild;
    loginButton.click();

    window.gotoLoginCallback = async (token, data) => {
      setSocialUserInfo(data.id, token, data.email, "NAVER");

      await naverLoginProcess({ token, id: data.id });
    };
  };

  const naverLoginProcess = async ({ token, id }) => {
    try {
      const meemzResult = await social_login({
        provider: "NAVER",
        token: token,
        providerId: id,
        service: "FNB",
      });

      console.log(meemzResult);

      if (meemzResult) {
        router.push("/");
        // window.location = "/";
        // router.back();
      } else {
        router.push("/auth/sns-sign-up");
      }
    } catch (err) {
      console.log(err);
      router.push("/auth/sns-sign-up");
    }
  };

  return (
    <Grid sx={{ mt: 1 }}>
      <div id="naverIdLogin" ref={ref} style={{ display: "none" }}></div>
      <NaverButton onClick={handleClick} />
    </Grid>
  );
};

export default NaverLoginButton;
