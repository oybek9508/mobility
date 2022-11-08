import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import AuthButton from "src/components/AuthButton";
import { Span } from "src/components/Typography";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useError from "src/hooks/useError";
import useAuth from "src/hooks/useAuth";
import FlexBox from "src/components/FlexBox";
import useSignup from "src/hooks/useSignup";
import useMember from "src/hooks/useMember";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import PassAuth from "src/components/signup/PassAuth";
import InputPassword from "src/components/InputPassword";
import { useIntl, FormattedMessage } from "react-intl";

const rex_Eng =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/;

const EditPassword = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { changePassword } = useMember();
  const [error, setError, ErrorMessageBox] = useError("");
  const formRef = useRef();
  const [alertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  const intl = useIntl();

  const validateField = (values) => {
    const errors = {};
    if (!values.oldPassword) {
      errors.oldPassword = intl.formatMessage({ id: "validation-oldpw-empty" });
    }
    if (!values.password) {
      errors.password = intl.formatMessage({ id: "validation-newpw-empty" });
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = intl.formatMessage({
        id: "validation-newpw-confirm-empty",
      });
    }

    if (values.oldPassword && values.password && values.passwordConfirm) {
      return false;
    }
    return errors;
  };

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const errors = validateField(values);
      if (errors) {
        setErrors(errors);
        return;
      }
      const payload = {
        oldPassword: values.oldPassword,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      };
      console.log(`submit_values====`, values);
      console.log(`submit_payload====`, payload);

      const res = await changePassword(payload);
      if (res?.success) {
        setStatus({ success: true });
        setSubmitting(false);
        setAlertType("SUCCESS");
        setMessage(intl.formatMessage({ id: "alert_msg_success_change_pw" }));
        setOpenAlert(true);
      } else {
        if (
          res?.response?.data?.message ===
          "기존 비밀번호가 일치하지 않습니다. 기존 비밀번호를 올바르게 입력해주세요."
        ) {
          formRef.current.setErrors({
            ...formRef.current.errors,
            oldPassword: intl.formatMessage({
              id: "error_not_correct_curr_pw",
            }),
          });
        } else if (
          res?.response?.data?.message ===
          "변경할 비밀번호를 기존 비밀번호와 다르게 입력해주세요."
        ) {
          formRef.current.setErrors({
            ...formRef.current.errors,
            password: intl.formatMessage({ id: "error_same_current_pw" }),
          });
        } else {
          setAlertType("OK");
          setMessage(intl.formatMessage({ id: "alert_msg_failed_change_pw" }));
          setOpenAlert(true);
        }
      }
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
      <Formik
        innerRef={formRef}
        initialValues={{
          oldPassword: "",
          password: "",
          passwordConfirm: "",
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string()
            .min(8, intl.formatMessage({ id: "validation_pw_length" }))
            .max(20, intl.formatMessage({ id: "validation_pw_length" }))
            .matches(
              rex_Eng,
              intl.formatMessage({ id: "validation_pw_match_role" })
            ),
          password: Yup.string()
            .min(8, intl.formatMessage({ id: "validation_pw_length" }))
            .max(20, intl.formatMessage({ id: "validation_pw_length" }))
            .matches(
              rex_Eng,
              intl.formatMessage({ id: "validation_pw_match_role" })
            ),
          passwordConfirm: Yup.string()
            .min(8, intl.formatMessage({ id: "validation_pw_length" }))
            .max(20, intl.formatMessage({ id: "validation_pw_length" }))
            .oneOf(
              [Yup.ref("password"), null],
              intl.formatMessage({ id: "validation-pw-not-matched-role" })
            )
            .matches(
              rex_Eng,
              intl.formatMessage({ id: "validation_pw_match_role" })
            ),
        })}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors, dirty, isValid, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="label_old_password" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Box sx={{ width: "100%" }}>
                  <InputPassword
                    variant="outlined"
                    name="oldPassword"
                    placeholder={intl.formatMessage({
                      id: "validation-oldpw-empty",
                    })}
                    sx={{ width: "100%" }}
                    value={values.oldPassword}
                    error={errors.oldPassword}
                    onChange={handleChange}
                  />
                  {errors.oldPassword && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.oldPassword}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="label_new_password" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Box sx={{ width: "100%" }}>
                  <InputPassword
                    variant="outlined"
                    name="password"
                    placeholder={intl.formatMessage({
                      id: "validation-newpw-empty",
                    })}
                    sx={{ width: "100%" }}
                    value={values.password}
                    error={errors.password}
                    onChange={handleChange}
                  />

                  {errors.password && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.password}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2, mb: 8 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="label_new_password_confirm" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Box sx={{ width: "100%" }}>
                  <InputPassword
                    variant="outlined"
                    name="passwordConfirm"
                    placeholder={intl.formatMessage({
                      id: "validation-newpw-confirm-empty",
                    })}
                    sx={{ width: "100%" }}
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
                    onChange={handleChange}
                  />
                  {errors.passwordConfirm && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.passwordConfirm}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <AuthButton type="submit" color="edit-info">
              <FormattedMessage id="btn_submit_edit_password" />
            </AuthButton>
          </form>
        )}
      </Formik>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
          if (alertType === "SUCCESS") {
            // alert 닫히고 내 정보 화면으로 이동
            router.push("/me/user-info");
          }
        }}
        message={message}
      />
    </>
  );
};

export default EditPassword;
