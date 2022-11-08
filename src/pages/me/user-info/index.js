import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import useAuth from "src/hooks/useAuth";
import { Container, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MyInfo from "src/components/me/userInfo/MyInfo";
import { useIntl, FormattedMessage } from "react-intl";

const UserInfo = () => {
  const router = useRouter();
  const { user, initialize } = useAuth();
  const intl = useIntl();

  useEffect(() => {
    initialize();
    localStorage.removeItem("isCheckedAuth");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return;
    alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
    setTimeout(() => {
      router.push("/nft-auth/login");
    }, 500);
  }, []);

  if (!user) return null;
  return (
    <Layout>
      <Container component="main" maxWidth="md" sx={{ mt: 17, mb: 17 }}>
        <Typography sx={{ fontSize: 18, fontFamily: "Jalnan" }}>
          <FormattedMessage id="title_my_info" />
        </Typography>
        <MyInfo />
      </Container>
    </Layout>
  );
};

export default UserInfo;
