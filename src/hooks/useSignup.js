import React from "react";
import {
  Terms,
  UserInfo,
  PassInfo,
  FindIdInfo,
  FindPwdInfo,
  SignupUser,
  SocialUser,
  SignupProcess,
} from "src/atoms/signup";
import { useAtom } from "jotai";

const useSignup = () => {
  const [terms, setTerms] = useAtom(Terms);
  const [passInfo, setPassInfo] = useAtom(PassInfo);
  const [userInfo, setUserInfo] = useAtom(UserInfo);
  const [findIdInfo, setFindIdInfo] = useAtom(FindIdInfo);
  const [findPwdInfo, setFindPwdInfo] = useAtom(FindPwdInfo);
  const [signupUser, setSignupUser] = useAtom(SignupUser);
  const [socialUser, setSocialUser] = useAtom(SocialUser);
  const [isSignup, setIsSignup] = useAtom(SignupProcess);

  const setTermsValue = (key, value) => {
    setTerms({
      ...terms,
      [key]: value,
    });
  };
  const setAllTerms = (value) => {
    setTerms({
      ...terms,
      isOverFourteen: value,
      privacyPolicy: value,
      marketingPolicy: value,
      servicePolicy: value,
      nightNotiAgree: value,
    });
  };

  const initTerms = () => {
    setTerms({
      ...terms,
      isOverFourteen: false,
      servicePolicy: false,
      privacyPolicy: false,
      marketingPolicy: false,
      nightNotiAgree: false,
    });
  };

  const setPassInfoValue = (key, value) => {
    setPassInfo({
      ...passInfo,
      [key]: value,
    });
  };

  const setPassInfoObject = (obj) => {
    setPassInfo({
      ...passInfo,
      ...obj,
    });
  };

  const initPassInfo = () => {
    setPassInfo({
      ...passInfo,
      authType: "",
      birthDate: "",
      connInfo: "",
      dupInfo: "",
      gender: "",
      isOverFourteen: "",
      mobileCo: "",
      mobileNo: "",
      name: "",
      nationalInfo: "",
      requestNumber: "",
      responseNumber: "",
    });
  };

  const setFindIdArray = (array) => {
    setFindIdInfo({
      ...findIdInfo,
      isPassed: true,
      idList: [...array],
    });
  };

  const initFindId = () => {
    setFindIdInfo({
      ...findIdInfo,
      isPassed: false,
      email: "",
      id: "",
    });
  };

  const setFindPwdInfoValue = (id, connInfo) => {
    setFindPwdInfo({
      ...findPwdInfo,
      isPassed: true,
      id: id,
      connInfo: connInfo,
    });
  };

  const setFindPwdInfoConnInfo = (connInfo) => {
    setFindPwdInfo({
      ...findPwdInfo,
      isPassed: true,
      connInfo: connInfo,
    });
  };

  const initPasswordInfo = () => {
    setFindPwdInfo({
      ...findPwdInfo,
      isPassed: false,
      email: "",
      id: "",
      connInfo: "",
    });
  };

  // 아이디 찾기 - 아이디 저장
  const setIdInFindId = (id) => {
    setFindIdInfo({
      ...findIdInfo,
      isPassed: true,
      id: id,
    });
  };

  // 비밀번호 찾기 - 아이디, 이메일 저장
  const setIdAndEmailInFindPwd = (id, email) => {
    setFindPwdInfo({
      ...findPwdInfo,
      isPassed: true,
      id: id,
      email: email,
    });
  };

  const setSignupUserInfo = (id, signupDt, moonCode) => {
    setSignupUser({
      ...signupUser,
      id: id,
      signupDt: signupDt,
      moonCode: moonCode,
    });
  };

  const initSignupUser = () => {
    setSignupUser({
      ...signupUser,
      id: "",
      signupDt: "",
      moonCode: "",
    });
  };

  const setSocialUserInfo = (userid, accessToken, email, provider) => {
    setSocialUser({
      ...socialUser,
      userid,
      accessToken,
      email,
      provider,
    });
  };

  const initSocialUserInfo = () => {
    setSocialUser({
      ...socialUser,
      userid: "",
      accessToken: "",
      email: "",
      provider: "",
    });
  };

  return {
    terms,
    setTermsValue,
    setAllTerms,
    initTerms,
    passInfo,
    setPassInfoValue,
    setPassInfoObject,
    initPassInfo,
    findIdInfo,
    setFindIdArray,
    initFindId,
    findPwdInfo,
    setFindPwdInfoValue,
    setFindPwdInfoConnInfo,
    initPasswordInfo,
    setIdInFindId,
    setIdAndEmailInFindPwd,
    signupUser,
    setSignupUserInfo,
    initSignupUser,
    socialUser,
    setSocialUserInfo,
    initSocialUserInfo,
    isSignup,
    setIsSignup,
  };
};

export default useSignup;
