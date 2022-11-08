import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import AuthTextField from "src/components/AuthTextField";
import AuthButton from "src/components/AuthButton";
import { useIntl, FormattedMessage } from "react-intl";

const InputForm = ({
  values,
  errors,
  toucheds,
  handleChange,
  handleSubmit,
}) => {
  const intl = useIntl();
  return (
    <Grid flexDirection="column" item xs={12} justifyContent="center">
      <Grid xs={12} py={2} item>
        <AuthTextField
          name="id"
          type="text"
          value={values.id}
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={handleChange}
          placeholder={intl.formatMessage({ id: "nft-login-form-id-title" })}
          title={intl.formatMessage({ id: "nft-login-form-id-title" })}
        />
      </Grid>
      <Grid xs={12} py={1} item>
        <AuthTextField
          type="password"
          name="password"
          value={values.password}
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={handleChange}
          title={intl.formatMessage({ id: "nft-login-form-pwd-title" })}
          placeholder={intl.formatMessage({ id: "nft-login-form-pwd-title" })}
        />
      </Grid>
    </Grid>
  );
};

export default InputForm;
