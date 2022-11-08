import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  CardMedia,
  Box,
  Grid,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import FlexBox from "src/components/FlexBox";
import * as Yup from "yup";
import useAuth from "src/hooks/useAuth";
import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import AuthTextField from "src/components/AuthTextField";
import useSignup from "src/hooks/useSignup";
import useMember from "src/hooks/useMember";
import { useRouter } from "next/router";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import { useIntl, FormattedMessage } from "react-intl";

const FindPwdByEmail = (props) => {
  const intl = useIntl();
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", subText: [] });
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { setFindPwdInfoId, setIdAndEmailInFindPwd } = useSignup();
  const {
    sendEmailAuthNum,
    postTemporaryToken,
    checkExistEmailId,
    changePasswordByTempToken,
  } = useMember();

  const idRegExp = /^[a-zA-Z0-9-_][a-zA-Z0-9-_]*$/;

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      setStatus({ success: true });
      setSubmitting(false);
      const id = values.id;
      const email = values.email;
      const res = await checkExistEmailId({ email: email, id: id });
      if (res?.success) {
        if (res?.data) {
          // SUCCESS: atom에 id, email 저장. 이메일 인증으로 진행.
          setIdAndEmailInFindPwd(id, email);
          router.push("/auth/find/pwd/auth-check");
        } else {
          // ERROR: ID 미 존재시 팝업 노출
          setPopupContent({
            subText: [
              intl.formatMessage({ id: "popup_not_exists_email_id1" }),
              intl.formatMessage({ id: "popup_not_exists_email_id2" }),
            ],
          });
          setOpenPopup(true);
        }
      }
    } catch (err) {
      console.error(err.response.data.message);
      setStatus({ success: false });
      setErrors({ submit: err.response.data.message });
      setSubmitting(false);
    }
  };
  return (
    <Box
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
        <Grid xs={12} pb={8}>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            <FormattedMessage id="find_pw_title" />
          </Typography>
          <Typography
            pt={1}
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "1rem",
              color: "#333333",
              fontWeight: "400",
            }}
          >
            <FormattedMessage id="find_pw_description1" />
          </Typography>
          <Typography
            // pr={20}
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "1rem",
              color: "#333333",
              fontWeight: "400",
            }}
          >
            <FormattedMessage id="find_pw_description2" />
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Formik
            initialValues={{
              id: "",
              email: "",
            }}
            validationSchema={Yup.object().shape({
              id: Yup.string().required({
                formatMessageId: "validation-id-empty-role",
              }),
              email: Yup.string()
                .email({ formatMessageId: "validation-email-format-role" })
                .required({ formatMessageId: "validation_empty_email" }),
            })}
            // validateOnMount
            // validateOnChange={false}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              values,
              errors,
              dirty,
              isValid,
              handleChange,
              ...props
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid xs={12} item pb={5}>
                  <Box mb={2}>
                    <AuthTextField
                      type="text"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      autoComplete="off"
                      placeholder={intl.formatMessage({
                        id: "placeholder_id_in_find_pw",
                      })}
                      title={intl.formatMessage({ id: "title-id" })}
                      name="id"
                      value={values.id}
                      error={errors.id}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <AuthTextField
                      type="email"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      autoComplete="off"
                      placeholder={intl.formatMessage({
                        id: "placeholder_email_in_find_pw",
                      })}
                      title={intl.formatMessage({ id: "title-email" })}
                      name="email"
                      value={values.email}
                      error={errors.email}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Divider />
                <Grid xs={12} item pt={5}>
                  <AuthButton
                    type="submit"
                    color="info"
                    disabled={!(dirty && isValid)}
                  >
                    <FormattedMessage id="find_pw_title" />
                  </AuthButton>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
        }}
        message={message}
      />
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
              width: "19rem",
              textAlign: "center",
              fontFamily: "NotoSans-Regular",
            }}
          >
            <Typography>{popupContent.title}</Typography>
            {popupContent.subText.map((v) => (
              <Typography key={v}>{v}</Typography>
            ))}
          </Box>
          <FlexBox pt={3} pb={2} sx={{ width: "100%" }}>
            <AuthButton color="darkgray" onClick={() => setOpenPopup(false)}>
              <FormattedMessage id="popup_confirm" />
            </AuthButton>
            <AuthButton
              color="blue"
              onClick={() => router.push("/auth/find/id")}
            >
              <FormattedMessage id="find_pw_go_findid_btn" />
            </AuthButton>
          </FlexBox>
        </Box>
      </AuthAlert>
    </Box>
  );
};

export default FindPwdByEmail;
