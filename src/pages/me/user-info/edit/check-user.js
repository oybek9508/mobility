import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import { Container, Box, Typography } from "@mui/material";
import CheckPasswordForm from "src/components/me/userInfo/CheckPasswordForm";
import CheckSnsLogin from "src/components/me/userInfo/CheckSnsLogin";
import useAuth from "src/hooks/useAuth";
import { useEffect, useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const CheckUser = () => {
  const router = useRouter();
  const { user, provider } = useAuth();
  const intl = useIntl();
  const [isSnsLogin, setIsSnsLogin] = useState(false);

  useEffect(() => {
    localStorage.removeItem("isCheckedAuth");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return;
    alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  }, []);

  useEffect(() => {
    // SNS 로그인 상태인지, 일반 로그인 상태인지 체크.
    if (!provider || provider === "" || provider === "LOCAL") return;
    setIsSnsLogin(true);
  }, [provider]);

  if (!user) return null;
  return (
    <Layout>
      <Container component="main" maxWidth="md" sx={{ mt: 17, mb: 17 }}>
        <Typography sx={{ fontSize: 18, fontFamily: "Jalnan" }}>
          <FormattedMessage id="my-info-edit" />
        </Typography>
        {isSnsLogin ? <CheckSnsLogin /> : <CheckPasswordForm />}
      </Container>
    </Layout>
  );
};

export default CheckUser;
