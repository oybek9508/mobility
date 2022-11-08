import React from "react";
import { Grid } from "@mui/material";
import AuthTextField from "src/components/AuthTextField";
import { useIntl, FormattedMessage } from "react-intl";

const PasswordChangeForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const intl = useIntl();
  return (
    <Grid container item xs={12} display="flex" justifyContent="center">
      <Grid xs={12} item py={1}>
        <AuthTextField
          type="password"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "edit_pw_label_password" })}
          title={intl.formatMessage({ id: "edit_pw_title_password" })}
          name="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item py={1}>
        <AuthTextField
          type="password"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "edit_pw_label_password_confirm" })}
          title={intl.formatMessage({ id: "edit_pw_title_password_confirm" })}
          name="passwordConfirm"
          value={values.passwordConfirm}
          error={errors.passwordConfirm}
          touched={touched.passwordConfirm}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordChangeForm;
