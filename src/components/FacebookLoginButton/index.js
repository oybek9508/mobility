import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookButton from "./FacebookButton";

import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";
import useAuth from "src/hooks/useAuth";

const FacebookLoginButton = () => {
  const router = useRouter();
  const { setSocialUserInfo } = useSignup();
  const { social_login } = useAuth();

  const handleSuccess = async (res) => {
    const { userID, accessToken, email } = res;

    if (res?.status === "unknown") return;

    setSocialUserInfo(userID, accessToken, email, "FACEBOOK");

    try {
      const meemzResult = await social_login({
        provider: "FACEBOOK",
        token: accessToken,
        providerId: userID,
        service: "MOBILITY",
      });

      console.log("meemzResult", meemzResult);

      if (meemzResult) {
        const storage = globalThis?.sessionStorage;
        if (!storage) {
          router.push("/");
          return;
        }
        const prevPath = storage.getItem("prevPath");
        // 이전 페이지가 회원가입 완료 페이지이면, 메인 홈으로 이동
        if (prevPath.includes("auth")) {
          router.push("/");
        } else {
          router.push(prevPath);
        }
      } else {
        router.push("/auth/sns-sign-up");
      }
    } catch (err) {
      console.log(err);
      router.push("/auth/sns-sign-up");
    }
  };

  const handleFail = () => {
    alert("실패");
  };

  return (
    <div>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        fields="email"
        autoLoad={false}
        callback={handleSuccess}
        disableMobileRedirect={true}
        // icon="fa-facebook"
        render={(renderProps) => (
          <FacebookButton onClick={renderProps.onClick} />
        )}
      />
    </div>
  );
};

export default FacebookLoginButton;
