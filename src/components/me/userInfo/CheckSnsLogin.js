import { useRouter } from "next/router";
import { Container, Box, Typography, Button } from "@mui/material";
import AuthButton from "src/components/AuthButton";
import useAuth from "src/hooks/useAuth";
import { useEffect, useState } from "react";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import { useIntl, FormattedMessage } from "react-intl";
import FacebookLoginButton from "src/components/FacebookLoginButton";
import KakaoLoginButton from "src/components/KakaoLoginButton";
import NaverLoginButton from "src/components/NaverLoginButton";

const CheckSnsLogin = () => {
  const intl = useIntl();
  const router = useRouter();
  const { provider } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState(
    intl.formatMessage({ id: "alert_msg_failed_sns_login" })
  );
  const [isPassAuth, setIsPassAuth] = useState(false);

  useEffect(() => {
    if (isPassAuth) {
      localStorage.setItem("isCheckedAuth", "true");
    } else {
      localStorage.setItem("isCheckedAuth", "false");
    }
  }, [isPassAuth]);

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: 2,
        borderRadius: 5,
        px: { xs: 2, sm: 2, md: 14, lg: 14 },
        py: { xs: 6, sm: 6, md: 14, lg: 14 },
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography
          sx={{ fontSize: 18, fontFamily: "GmarketSansTTFBold", mb: 2 }}
        >
          <FormattedMessage id="sns_id_pass_title" />
        </Typography>
        <Typography sx={{ fontFamily: "GmarketSansTTFMedium" }}>
          <FormattedMessage
            id="sns_id_pass_description"
            values={{ br: <br /> }}
          />
        </Typography>
      </Box>
      {provider === "FACEBOOK" && (
        <FacebookLoginButton
          setIsPassAuth={setIsPassAuth}
          setOpenAlert={setOpenAlert}
        />
      )}
      {provider === "KAKAO" && (
        <KakaoLoginButton
          setIsPassAuth={setIsPassAuth}
          setOpenAlert={setOpenAlert}
        />
      )}
      {provider === "NAVER" && (
        <NaverLoginButton
          setIsPassAuth={setIsPassAuth}
          setOpenAlert={setOpenAlert}
        />
      )}
      <AuthButton
        type="submit"
        color="edit-info"
        onClick={() => {
          if (!isPassAuth) return;
          router.push("/me/user-info/edit");
        }}
        disabled={isPassAuth ? false : true}
      >
        <FormattedMessage id="btn_ok" />
      </AuthButton>
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

export default CheckSnsLogin;
