import { atom, selectAtom } from "jotai";

export const Terms = atom({
  isOverFourteen: false,
  servicePolicy: false,
  privacyPolicy: false,
  marketingPolicy: false,
  nightNotiAgree: false,
});

export const PassInfo = atom({
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

export const UserInfo = atom({
  id: "",
  password: "",
  passwordConfirm: "",
  birthday: "",
  phono: "",
  ci: "",
  di: "",
});

export const FindIdInfo = atom({
  isPassed: false,
  email: "", // email 추가
  id: "",
  // idList: [],
});

export const FindPwdInfo = atom({
  isPassed: false,
  email: "", // email 추가
  id: "",
});

export const SignupUser = atom({
  id: "",
  signupDt: "",
  moonCode: "",
});

export const SocialUser = atom({
  userid: "",
  accessToken: "",
  email: "",
  provider: "",
});

export const SignupProcess = atom(false);
