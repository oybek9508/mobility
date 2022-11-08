import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider, Typography } from "@mui/material";

import AuthButton from "src/components/AuthButton";

import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";
import { useIntl, FormattedMessage } from "react-intl";

const FindIdByEmailComplete = (props) => {
  const { findIdInfo, initFindId } = useSignup();
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (findIdInfo.isPassed) return;
    alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
    router.push("/auth/login");
    return () => {
      initFindId();
    };
  }, []);

  const handleClickLogin = () => {
    router.push("/auth/login");
  };

  const handleClickFindPass = () => {
    router.push("/auth/find/pwd");
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
        <Grid xs={12}>
          <Typography
            sx={{
              fontFamily: "NotoSans-Bold",
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            <FormattedMessage id="find_id_title" />
          </Typography>
          <Typography
            pt={3}
            sx={{
              fontFamily: "NotoSans-Regular",
              fontSize: "1rem",
              color: "#333333",
            }}
          >
            <FormattedMessage id="find_id_complete_description" />
          </Typography>
        </Grid>
        <Grid xs={12} pt={4} py={3}>
          <Box
            sx={{
              minHeight: "154px",
              backgroundColor: "#fbfbfb",
              borderRadius: "20px",
              width: "100%",
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              p={0.5}
              sx={{
                fontFamily: "NotoSans-Bold",
                fontSize: "1.25rem",
                color: "#037dd6",
                fontWeight: "bold",
              }}
            >
              {findIdInfo.id}
            </Typography>
          </Box>
        </Grid>
        <Divider />
        <Grid xs={12} item pt={5} pb={2}>
          <AuthButton type="submit" color="info" onClick={handleClickLogin}>
            <FormattedMessage id="find_id_go_login_btn" />
          </AuthButton>
        </Grid>

        <Grid xs={12} item pt={1} pb={2}>
          <AuthButton
            type="submit"
            color="second-info"
            onClick={handleClickFindPass}
          >
            <FormattedMessage id="find_id_go_pass_btn" />
          </AuthButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindIdByEmailComplete;
