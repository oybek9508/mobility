import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as Yup from "yup";
import useAuth from "src/hooks/useAuth";
import PasswordChangeForm from "./components/PasswordChangeForm";
import AuthButton from "src/components/AuthButton";
import useSignup from "src/hooks/useSignup";
import useError from "src/hooks/useError";
import useMember from "src/hooks/useMember";
import AuthAlert from "src/components/AuthAlert";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import { useIntl, FormattedMessage } from "react-intl";

const rex_Eng =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/;
const FindPwdByAuthEmailComplete = (props) => {
  const intl = useIntl();
  const [openPopup, setOpenPopup] = useState(false);
  const [error, setError, ErrorMessageBox] = useError("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { findPwdInfo, initPasswordInfo } = useSignup();
  const { changePasswordByTempToken } = useMember();
  const router = useRouter();

  useEffect(() => {
    if (findPwdInfo.isPassed) return;
    alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
    router.push("/auth/login");
    return () => {
      initPasswordInfo();
    };
  }, []);

  const handleClickConfirm = () => {
    router.push("/auth/login");
  };

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      const JSEncrypt = (await import("jsencrypt")).default;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(process.env.NEXT_PUBLIC_MARV_AUTH_KEY);
      // 이메일 인증 토큰으로 비밀번호 변경
      const payload = {
        id: findPwdInfo.id,
        password: encrypt.encrypt(values.password),
        passwordConfirm: encrypt.encrypt(values.passwordConfirm),
      };
      const res = await changePasswordByTempToken(payload);
      if (res?.success) {
        // SUCCESS
        setOpenPopup(true);
      } else {
        if (res?.response?.data?.message === "이메일이 올바르지 않습니다.") {
          setMessage(intl.formatMessage({ id: "alert_msg_not_correct_email" }));
          setOpenAlert(true);
        } else if (
          res?.response?.data?.message ===
          "변경할 비밀번호를 기존 비밀번호와 다르게 입력해주세요."
        ) {
          setMessage(intl.formatMessage({ id: "alert_msg_same_prev_email" }));
          setOpenAlert(true);
        }
      }
      setStatus({ success: true });
      setSubmitting(true);
    } catch (err) {
      console.error(err.response.data.message);
      setError(err.response.data.message);
      setStatus({ success: false });
      setErrors({ submit: err.response.data.message });
      setSubmitting(false);
    }
  };

  return (
    <>
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
          <Grid xs={12}>
            <Typography
              sx={{
                fontFamily: "NotoSans-Bold",
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "#333333",
              }}
            >
              <FormattedMessage id="renew_pw_title" />
            </Typography>

            <Typography
              pt={3}
              sx={{
                fontFamily: "NotoSans-Regular",
                fontSize: "1.25rem",
                color: "#333333",
              }}
            >
              <FormattedMessage id="renew_pw_description" />
            </Typography>
          </Grid>
          <Grid xs={12} pt={4} py={5}>
            <Grid xs={12}>
              <Formik
                initialValues={{
                  password: "",
                  passwordConfirm: "",
                }}
                validationSchema={Yup.object().shape({
                  password: Yup.string()
                    .min(8, { formatMessageId: "validation-pw-text-role" })
                    .max(20, {
                      formatMessageId: "validation-pw-text-role",
                    })
                    .matches(rex_Eng, {
                      formatMessageId: "validation-pw-text-role",
                    })
                    .required({
                      formatMessageId: "renew_pw_empty_password",
                    }),
                  passwordConfirm: Yup.string()
                    .min(8, {
                      formatMessageId: "validation-pw-text-role",
                    })
                    .max(20, {
                      formatMessageId: "validation-pw-text-role",
                    })
                    .oneOf([Yup.ref("password"), null], {
                      formatMessageId: "validation-pw-not-matched-role",
                    })
                    .matches(rex_Eng, {
                      formatMessageId: "validation-pw-text-role",
                    })
                    .required({
                      formatMessageId: "renew_pw_empty_password_confirm",
                    }),
                })}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, ...props }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid xs={12} item pb={1}>
                      <PasswordChangeForm {...props} />
                    </Grid>
                    <Grid xs={12} item pb={4}>
                      {error && <ErrorMessageBox sx={{ pl: 1 }} />}
                    </Grid>
                    <Divider />
                    <Grid xs={12} item pt={5}>
                      <AuthButton type="submit" color="info">
                        <FormattedMessage id="btn_renew_pw" />
                      </AuthButton>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <AuthAlert open={openPopup} onClose={() => setOpenPopup(false)}>
        <Box
          p={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            pt={3}
            sx={{
              color: "#000",
              width: "19rem",
              textAlign: "center",
              fontFamily: "NotoSans-Regular",
            }}
          >
            <Typography>
              <FormattedMessage id="alert_success_renew_pw_desc1" />
            </Typography>
            <Typography>
              <FormattedMessage id="alert_success_renew_pw_desc2" />
            </Typography>
          </Box>
          <Box pt={3} pb={2} sx={{ width: "10rem" }}>
            <AuthButton onClick={handleClickConfirm}>
              <FormattedMessage id="btn_go_login" />
            </AuthButton>
          </Box>
        </Box>
      </AuthAlert>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
        }}
        message={message}
      />
    </>
  );
};

export default FindPwdByAuthEmailComplete;
