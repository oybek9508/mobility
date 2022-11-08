import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider } from "@mui/material";
import InputForm from "../components/InputForm";
import useAuth from "src/hooks/useAuth";
import useSignup from "src/hooks/useSignup";
import { useRouter } from "next/router";
import AuthButton from "src/components/AuthButton";
import SignupHeader from "../components/sign-up/SignupHeader";
import AgreementListForm from "../components/sign-up/AgreementListForm";
import {
  ServicePolicyPopup,
  PrivacyPolicyPopup,
  MarketingPolicyPopup,
} from "src/components/nft-auth/signup/components/sign-up/components/AgreementPopup";
import AuthApi from "src/api/auth-api";
import { useIntl, FormattedMessage } from "react-intl";

const authApi = new AuthApi();

const SnsSignupAgreementForm = (props) => {
  const router = useRouter();
  const { terms, socialUser, setSignupUserInfo, initTerms, signupUser } =
    useSignup();
  const [open, setOpen] = useState({
    servicePolicy: false,
    privacyPolicy: false,
    marketingPolicy: false,
  });
  const { user, isAuthenticated } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    if (signupUser.moonCode || !socialUser.accessToken) {
      let path = "/nft-auth/login";
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) path = "/";
      alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
      router.push(path);
      return;
    }

    initTerms();
  }, []);

  const handleOpenPopup = (target) => {
    // console.log('handleLinkClick', target)

    setOpen((open) => ({ ...open, [target]: !open[target] }));
  };

  const handleSingup = async () => {
    const payload = {
      provider: socialUser.provider,
      emailAddress: socialUser.email ? socialUser.email : "",
      token: socialUser.accessToken,
      providerId: socialUser.userid,
      marketingReceiveAgreement: terms?.marketingPolicy ? "Y" : "N",
      privacyInfoUseAgreement: terms?.privacyPolicy ? "Y" : "N",
      servicePolicyAgreement: terms?.servicePolicy ? "Y" : "N",
      nightMarketingReceiveAgreement: terms?.nightNotiAgree ? "Y" : "N",
      signupSite: "MOBILITY",
    };

    try {
      const res = await authApi.socialSignup(payload);

      console.log(res);
      if (res.success) {
        setSignupUserInfo(
          res.data.marvrusUser.id,
          res.data.marvrusUser.signupDt,
          res.data.marvrusUser.moonCode
        );
        router.push("/nft-auth/sns-sign-up/complete");
      } else {
        alert(err.response.data.message);
        router.push("/nft-auth/login");
      }

      // 회원가입 완료 페이지 이동
    } catch (err) {
      alert(err.response.data.message);
      router.push("/nft-auth/login");
    }
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
              onClick={handleSingup}
            >
              <FormattedMessage id="signup-next-step" />
            </AuthButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SnsSignupAgreementForm;
