import { useRouter } from "next/router";
import { Container, Box, Typography, TextField, Grid } from "@mui/material";
import AuthButton from "src/components/AuthButton";
import { Span } from "src/components/Typography";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import useError from "src/hooks/useError";
import useAuth from "src/hooks/useAuth";
import useMember from "src/hooks/useMember";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import { useIntl, FormattedMessage } from "react-intl";
import StyledTextField from "src/components/AuthTextField/StyledTextField";

const CheckPasswordForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { checkPassword } = useMember();
  const [error, setError, ErrorMessageBox] = useError("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");

  const intl = useIntl();

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, setFieldValue }
  ) => {
    try {
      console.log(`submit_values====`, values);
      const res = await checkPassword(values.password);
      console.log(res);
      if (res?.data?.success) {
        localStorage.setItem("isCheckedAuth", "true");
        setStatus({ success: true });
        setSubmitting(false);
        setTimeout(() => {
          router.push("/me/user-info/edit");
        }, 500);
      } else {
        localStorage.setItem("isCheckedAuth", "false");
        setMessage(
          intl.formatMessage({
            id: "alert-msg-oldpw-not-matched",
          })
        );
        setOpenAlert(true);
      }
    } catch (err) {
      localStorage.setItem("isCheckedAuth", "false");
      console.error(err.response.data.message);
      setError(err.response.data.message);
      setStatus({ success: false });
      setErrors({ submit: err.response.data.message });
      setSubmitting(false);

      setMessage(err.response.data.message);
      setOpenAlert(true);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        borderRadius: 5,
        px: { xs: 2, sm: 2, md: 14, lg: 14 },
        py: { xs: 6, sm: 6, md: 14, lg: 14 },
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ fontFamily: "GmarketSansTTFMedium" }}>
          {intl.formatMessage({ id: "re-check-password-title" })}
        </Typography>
        <Typography sx={{ fontFamily: "GmarketSansTTFMedium" }}>
          {intl.formatMessage({ id: "re-check-password-description" })}
        </Typography>
      </Box>
      <Formik
        initialValues={{ id: user?.id, password: "" }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          password: Yup.string().required(
            intl.formatMessage({ id: "validation-oldpw-empty" })
          ),
        })}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors, dirty, isValid, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ alignItems: "center" }} spacing={2}>
              <Grid item xs={12} sm={2}>
                <Typography component="span">
                  {intl.formatMessage({ id: "title-id" })}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    name="id"
                    sx={{ width: "100%" }}
                    value={values.id}
                    error={errors.id}
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ alignItems: "center", mt: 4, mb: 8 }}
              spacing={2}
            >
              <Grid item xs={12} sm={2}>
                <Typography component="span" sx={{ width: 100 }}>
                  {intl.formatMessage({ id: "title-oldpw-title" })}
                  <Span sx={{ color: "red" }}>*</Span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="password"
                    variant="outlined"
                    placeholder={intl.formatMessage({
                      id: "validation-oldpw-empty",
                    })}
                    name="password"
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
            <AuthButton
              type="submit"
              color="edit-info"
              disabled={!(dirty && isValid)}
            >
              {intl.formatMessage({ id: "btn_ok" })}
            </AuthButton>
          </form>
        )}
      </Formik>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
        }}
        message={message}
      />
    </Box>
  );
};

export default CheckPasswordForm;
