import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import {
  loadKakaoSdk,
  kakaoLogin,
  removeKakaoSdk,
} from "src/libs/utils/kakaoClient";
import { Box } from "@mui/material";
import KakaoButton from "./KakaoButton";

import useSignup from "src/hooks/useSignup";
import useAuth from "src/hooks/useAuth";

const KakaoLoginButton = () => {
  const router = useRouter();
  const { social_login } = useAuth();
  const { setSocialUserInfo } = useSignup();

  useEffect(() => {
    initKakao();

    return () => {
      removeKakaoSdk();
    };
  }, []);

  const initKakao = async () => {
    await loadKakaoSdk();
    if (window.Kakao) {
      const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAOTALK_APP_ID;
      window.Kakao.init(KAKAO_KEY);
    }
  };

  const handleClickKakaoLogin = async () => {
    try {
      const res = await kakaoLogin();
      const { id, kakao_account, access_token } = res;
      if (!access_token) {
        return;
      }
      setSocialUserInfo(id, access_token, kakao_account?.email, "KAKAO");

      const meemzResult = await social_login({
        provider: "KAKAO",
        token: access_token,
        providerId: id,
        service: "MOBILITY",
      });

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

  const KakaoLogin = ({ component }) => {
    return (
      <Box onClick={handleClickKakaoLogin} sx={{ mt: 1 }}>
        {component}
      </Box>
    );
  };

  return (
    <>
      <KakaoLogin component={<KakaoButton />} />
    </>
  );
};

export default KakaoLoginButton;
