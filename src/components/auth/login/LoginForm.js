import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Box, Grid, Typography, Paper } from "@mui/material";
// import AuthButton from "src/components/AuthButton";
// import InputForm from "./components/InputForm";
import useAuth from "src/hooks/useAuth";
import useError from "src/hooks/useError";
import useSignup from "src/hooks/useSignup";
import { useRouter } from "next/router";
import InputForm from "./InputForm";
import FindAuth from "./FindAuth";
import AuthButton from "src/components/AuthButton";
import Logo from "src/components/Logo";
import SocialLogin from "./SocialLogin";
// import LoginLogo from "./LoginLogo";
// import LoginFooter from "./LoginFooter";
import { useIntl, FormattedMessage } from "react-intl";

const LoginForm = () => {
  const intl = useIntl();
  const [error, setError, ErrorMessageBox] = useError("");
  const { login } = useAuth();
  const router = useRouter();
  const [isRememberId, setIsRememberId] = useState(false);
  const [rememberId, setRememberId] = useState("");
  const { initSignupUser, setIsSignup, initSocialUserInfo } = useSignup();

  const translateToEnglish = (message) => {
    if (message === "아이디나 비밀번호가 일치하지 않습니다.") {
      return "ID or Password does not match.";
    } else if (message === "아이디를 입력하시기 바랍니다.") {
      return "Please enter your ID.";
    } else {
      return message;
    }
  };

  console.log("error", error);

  useEffect(() => {
    const storageId = localStorage.getItem("remember-id");
    if (storageId) {
      setRememberId(storageId);
      setIsRememberId(true);
    }
    initSignupUser();
    initSocialUserInfo();
    setIsSignup(false);
  }, []);

  const handleClickSignup = () => {
    setIsSignup(true);
    router.push("/auth/sign-up/agreement");
  };

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      await login(values);
      setStatus({ success: true });
      setSubmitting(false);
      console.log("isRememberId", isRememberId);

      if (isRememberId) {
        localStorage.setItem("remember-id", values.id);
      } else {
        localStorage.removeItem("remember-id");
      }

      setTimeout(() => {
        // router.push("https://www.meemz.co.kr/nft-reservation");
        // router.push("/");
        const storage = globalThis?.sessionStorage;
        if (!storage) {
          router.push("/");
          return;
        }
        const prevPath = storage.getItem("prevPath");
        // 이전 페이지가 인증 페이지면 홈으로 이동
        if (prevPath.includes("auth")) {
          router.push("/");
        } else {
          router.push(prevPath);
        }
        router.push("/");
      }, 500);
      resetForm();
      // router.back()
    } catch (err) {
      const errorMsg = err.response.data.message;
      let message = errorMsg;
      if (router.locale === "en") {
        message = translateToEnglish(errorMsg);
      }
      console.error(message);
      setError(message);
      setStatus({ success: false });
      setErrors({ submit: message });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ id: rememberId, password: "" }}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ handleSubmit, ...props }) => {
          console.log({ ...props.values });
          console.log({ ...props.errors });

          return (
            <form onSubmit={handleSubmit}>
              <Paper sx={{ p: "20px" }}>
                <Logo />
                <InputForm {...props} handleSubmit={handleSubmit} />
                <Grid xs={12} item pt={3}>
                  <AuthButton type="submit">
                    {intl.formatMessage({ id: "nft-login-form-button" })}
                  </AuthButton>
                </Grid>
                {error && <ErrorMessageBox sx={{ pl: 1, mt: 1 }} />}
                <FindAuth
                  isRememberId={isRememberId}
                  setIsRememberId={setIsRememberId}
                />
                <SocialLogin />
                <Grid xs={12} item pt={3}>
                  <AuthButton
                    color="dark"
                    type="signup"
                    onClick={handleClickSignup}
                  >
                    <FormattedMessage id="nft-signup" />
                  </AuthButton>
                </Grid>
              </Paper>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
