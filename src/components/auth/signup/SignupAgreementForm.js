import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider } from "@mui/material";
import InputForm from "./components/InputForm";
import useAuth from "src/hooks/useAuth";
import { useIntl, FormattedMessage } from "react-intl";
import useSignup from "src/hooks/useSignup";
import { useRouter } from "next/router";
import AuthButton from "src/components/AuthButton";
import SignupHeader from "./components/sign-up/SignupHeader";
import AgreementListForm from "./components/sign-up/AgreementListForm";
import {
  ServicePolicyPopup,
  PrivacyPolicyPopup,
  MarketingPolicyPopup,
} from "src/components/auth/signup/components/sign-up/components/AgreementPopup";

const SignupAgreementForm = (props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { terms, passInfo, initTerms, isSignup } = useSignup();
  const intl = useIntl();
  const [open, setOpen] = useState({
    servicePolicy: false,
    privacyPolicy: false,
    marketingPolicy: false,
  });

  useEffect(() => {
    if (!isSignup) {
      let path = "/auth/login";
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) path = "/";
      alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
      router.push(path);
      return;
    }
    initTerms();
  }, []);

  // pass 인증 제거
  //   useEffect(() => {
  //     if (!passInfo.connInfo) {
  //       window.alert("잘못된 접근 입니다.");
  //       router.push("/nft-auth/login");
  //     }
  //   }, [passInfo.connInfo]);

  const handleOpenPopup = (target) => {
    // console.log('handleLinkClick', target)

    setOpen((open) => ({ ...open, [target]: !open[target] }));
  };

  const isNext = () => {
    return terms.isOverFourteen && terms.servicePolicy && terms.privacyPolicy;
  };
  return (
    <>
      <ServicePolicyPopup
        open={open.servicePolicy}
        onClose={() => setOpen((open) => ({ ...open, servicePolicy: false }))}
      />
      <PrivacyPolicyPopup
        open={open.privacyPolicy}
        onClose={() => setOpen((open) => ({ ...open, privacyPolicy: false }))}
      />
      <MarketingPolicyPopup
        open={open.marketingPolicy}
        onClose={() => setOpen((open) => ({ ...open, marketingPolicy: false }))}
      />
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
            <SignupHeader step={1} />
          </Grid>
          <Grid xs={12} item>
            <AgreementListForm onOpenPopup={handleOpenPopup} />
          </Grid>
          <Divider />
          <Grid xs={12} item pt={5} pb={2}>
            <AuthButton
              type="submit"
              color="info"
              disabled={!isNext()}
              // onClick={() => router.push("/nft-auth/sign-up/pass")}
              onClick={() => router.push("/auth/sign-up/userinfo")}
            >
              <FormattedMessage id="signup-next-step" />
            </AuthButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignupAgreementForm;
