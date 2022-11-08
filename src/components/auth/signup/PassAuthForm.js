import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider } from "@mui/material";

// import { useIntl, FormattedMessage } from "react-intl";
import useAuth from "src/hooks/useAuth";
import { useRouter } from "next/router";

import FourteenBox from "./components/pass-auth/FourteenBox";
import PassContent from "./components/pass-auth/PassContent";
import AuthButton from "src/components/AuthButton";
import PassAuth from "src/components/signup/PassAuth";

const PassAuthForm = (props) => {
  const { login } = useAuth();
  const { param } = props;
  const [passStart, setPassStart] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isOverFourteen, setIsOverFourTeen] = useState(false);
  const router = useRouter();

  const handleClickOverFourteen = () => {
    setIsChecked(false);
    setIsOverFourTeen(false);
  };

  const handleClickNotOverFourteen = () => {
    setIsChecked(false);
    setIsOverFourTeen(true);
    router.push("/auth/sign-up/userinfo");
  };

  const handleClickTempNext = () => {
    router.push("/auth/sign-up/userinfo");
  };

  const createErrorPath = () => {
    // return `/signup/pass-complete?error=true`
    return `/auth/signup`;
  };
  const createReturnPath = () => {
    return `/auth/sign-up/pass-complete?isOverFourteen=${isOverFourteen}`;
  };

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
        <Grid xs={12} item display="flex">
          <FourteenBox
            isSelected={!isOverFourteen}
            onClick={() => handleClickOverFourteen()}
          >
            {/* <FormattedMessage
              id="signup-not-over-fourteen"
              values={{ br: <br /> }}
            /> */}
            14세 미만
            <br />
            회원가입
          </FourteenBox>
          <FourteenBox
            isSelected={isOverFourteen}
            onClick={() => handleClickNotOverFourteen()}
          >
            {/* <FormattedMessage
              id="signup-over-fourteen"
              values={{ br: <br /> }}
            /> */}
            14세 이상
            <br />
            회원가입
          </FourteenBox>
        </Grid>
        <Grid
          xs={12}
          item
          sx={{
            minHeight: "330px",
            py: 2,
          }}
        >
          <PassContent
            isOverFourteen={isOverFourteen}
            isChecked={isChecked}
            onClickCheckBox={() => setIsChecked(!isChecked)}
          />
        </Grid>
        <Divider />
        <Grid xs={12} item pt={5} pb={2}>
          <AuthButton
            type="submit"
            color="info"
            disabled={!isOverFourteen && !isChecked}
            onClick={() => setPassStart(true)}
            // onClick={handleClickTempNext}
          >
            {/* <FormattedMessage id="signup-phone-auth" /> */}
            법정대리인 인증
          </AuthButton>
        </Grid>
      </Grid>
      <PassAuth
        passStart={passStart}
        createErrorPath={createErrorPath}
        createReturnPath={createReturnPath}
      />
    </Box>
  );
};

export default PassAuthForm;
