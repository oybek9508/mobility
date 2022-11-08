import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Button,
  Box,
  Grid,
  Divider,
  CardMedia,
  Typography,
} from "@mui/material";

import AuthButton from "src/components/AuthButton";
import useAuth from "src/hooks/useAuth";
import useSignup from "src/hooks/useSignup";
import { useRouter } from "next/router";
import useEvent from "src/hooks/useEvent";
import StaffAuthPopup from "src/components/popup/StaffAuthPopup";
import { useIntl, FormattedMessage } from "react-intl";

const SignupCompleteEnd = (props) => {
  const { checkEventUser } = useEvent();
  const { user, isAuthenticated } = useAuth();
  const { signupUser, passInfo, initPassInfo, socialUser } = useSignup();
  const router = useRouter();
  const [openStaffAuthPopup, setOpenStaffAuthPopup] = useState(false);
  const [showJoinEventBtn, setShowJoinEventBtn] = useState(false);
  const intl = useIntl();
  // console.log('user', user)

  const handleClickNext = () => {
    router.push("/auth/login");
  };

  const getUserEvent = async () => {
    const res = await checkEventUser({ moonCode: signupUser.moonCode });
    if (res?.data) {
      if (res.data.couponYn === "N") {
        setShowJoinEventBtn(true);
      } else {
        setShowJoinEventBtn(false);
      }
    } else {
      setShowJoinEventBtn(false);
    }
  };

  useEffect(() => {
    if (!socialUser.accessToken) {
      let path = "/auth/login";
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) path = "/";
      alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
      router.push(path);
      return;
    }

    initPassInfo();
    window.scrollTo(0, 0);

    // SNS 로그인 처리
    // fetchSnsLogin();
  }, []);

  // useEffect(() => {
  //   if (!socialUser.accessToken) {
  //     alert("잘못된 접근 입니다.");
  //     router.push("/nft-auth/login");
  //   }
  // }, [socialUser]);

  useEffect(() => {
    if (!signupUser.moonCode) return;
    getUserEvent(); // 테이블 생성
  }, [signupUser]);

  // const fetchSnsLogin = async () => {
  //   const meemzResult = await social_login({
  //     provider: socialUser.provider,
  //     token: socialUser.accessToken,
  //     userID: socialUseruserID,
  //   });

  //   // setTimeout(() => {
  //   //   router.push("/");
  //   // }, 500);
  // };

  return (
    <Box
      // p={3}
      pt={3}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{
        maxWidth: "480px",
        width: "100%",
      }}
    >
      <Grid container xs={12} display="flex" flexDirection="column">
        {/* 버튼 위치 */}
        <Grid
          xs={12}
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pt={5}
          pb={10}
        >
          <CardMedia
            src="/assets/images/nft-signup/btn_check_active.svg"
            alt="link"
            component="img"
            sx={{
              width: "4rem",
              height: "4rem",
            }}
          />
          <Typography
            pt={3}
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "bold",
              fontSize: "1.75rem",
            }}
          >
            <FormattedMessage id="signup-complete-title" />
          </Typography>
          <Typography
            pt={2}
            px={1}
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "normal",
              fontSize: "1rem",
              textAlign: "center",
              color: "#333333",
            }}
          >
            <p>
              <FormattedMessage id="signup-sns-complete-des1" />
            </p>
            <p>
              <FormattedMessage id="signup-complete-des2" />
            </p>
            <Typography fontSize="14px" my={4}>
              <FormattedMessage id="signup-complete-des3" />
              {signupUser.signupDt ? signupUser.signupDt : "2022-07-30"}
            </Typography>
          </Typography>
        </Grid>
        {showJoinEventBtn && (
          <Grid xs={12} item>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  backgroundImage: `url(/assets/images/event/${
                    router.locale === "ko" ? "" : "en/"
                  }-e-join_banner_m.png)`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: 312,
                  height: 112,
                  cursor: "pointer",
                }}
                onClick={() => setOpenStaffAuthPopup(true)}
              />
            </Box>
          </Grid>
        )}
        <Divider />
        <Grid xs={12} item pt={6}>
          <AuthButton color="info" onClick={handleClickNext}>
            <FormattedMessage id="signup-complete-home" />
          </AuthButton>
        </Grid>
      </Grid>
      <StaffAuthPopup
        open={openStaffAuthPopup}
        setOpen={setOpenStaffAuthPopup}
        eventType="member"
      />
    </Box>
  );
};

export default SignupCompleteEnd;
