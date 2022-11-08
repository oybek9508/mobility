import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import useAuth from "src/hooks/useAuth";
import { Container, Box, Typography } from "@mui/material";
import EditUserInfoForm from "src/components/me/userInfo/EditUserInfoForm";
import { useEffect, useState } from "react";
import FlexBox from "src/components/FlexBox";
import EditPassword from "src/components/me/userInfo/EditPassword";
import { useIntl, FormattedMessage } from "react-intl";

const EditUserInfo = () => {
  const router = useRouter();
  const { user, provider } = useAuth();
  const intl = useIntl();
  const [isSnsLogin, setIsSnsLogin] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const isCheckedAuth = localStorage.getItem("isCheckedAuth");
    if (isCheckedAuth === "true") return;
    alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
  }, []);

  useEffect(() => {
    if (!provider || provider === "" || provider === "LOCAL") return;
    setIsSnsLogin(true);
  }, [provider]);

  if (!user) return null;
  return (
    <Layout>
      <Container component="main" maxWidth="md" sx={{ mt: 17, mb: 10 }}>
        {/* <Typography sx={{ fontSize: 18, fontFamily: "NotoSansKR-Bold" }}>
          나의 정보 수정
        </Typography> */}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
            borderRadius: 5,
            pb: { xs: 6, sm: 6, md: 10, lg: 10 },
          }}
        >
          <FlexBox sx={{ mb: 4 }}>
            <Box
              sx={{
                py: 2,
                width: isSnsLogin ? "100%" : "50%",
                fontSize: 18,
                fontFamily: "Jalnan",
                textAlign: "center",
                background:
                  tabIndex === 0
                    ? `linear-gradient(to top, #fd1b83, #fe5726)`
                    : "rgba(0, 0, 0, 0.26)",
                WebkitBackgroundClip: `text`,
                WebkitTextFillColor: `transparent`,
                cursor: "pointer",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                borderImage:
                  tabIndex === 0
                    ? `linear-gradient(to top, #fd1b83, #fe5726)`
                    : `rgba(0, 0, 0, 0.12)`,
                borderImageSlice: 1,
              }}
              onClick={() => setTabIndex(0)}
            >
              <FormattedMessage id="btn_edit_my_info" />
            </Box>
            {!isSnsLogin && (
              <Box
                sx={{
                  py: 2,
                  width: "50%",
                  fontSize: 18,
                  fontFamily: "Jalnan",
                  textAlign: "center",
                  background:
                    tabIndex === 1
                      ? `linear-gradient(to top, #fd1b83, #fe5726)`
                      : "rgba(0, 0, 0, 0.26)",
                  WebkitBackgroundClip: `text`,
                  WebkitTextFillColor: `transparent`,
                  cursor: "pointer",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                  borderImage:
                    tabIndex === 1
                      ? `linear-gradient(to top, #fd1b83, #fe5726)`
                      : `rgba(0, 0, 0, 0.12)`,
                  borderImageSlice: 1,
                }}
                onClick={() => {
                  setTabIndex(1);
                  // pass params 제거
                  router.replace("/me/user-info/edit", undefined, {
                    shallow: true,
                  });
                }}
              >
                <FormattedMessage id="btn_change_pw" />
              </Box>
            )}
          </FlexBox>
          <Box sx={{ px: { xs: 2, sm: 4, md: 10, lg: 10 }, mt: 5 }}>
            {tabIndex === 0 && <EditUserInfoForm isSnsLogin={isSnsLogin} />}
            {tabIndex === 1 && <EditPassword />}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default EditUserInfo;
