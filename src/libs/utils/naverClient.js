export const loadNaverSdk = () => {
  return new Promise((resolve, reject) => {
    const js = document.createElement("script");

    js.id = "naver-login-sdk";
    js.src = "//static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
    js.onload = resolve;

    document.body.append(js);
  });
};

export const removeNaverSdk = () => {
  const sdk = document.getElementById("naver-login-sdk");
  sdk.remove();
};

export const initNaverLogin = (callbackHandle, isPopup) => {
  const protocol = window.location.protocol;
  const host = window.location.host;

  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: process.env.NEXT_PUBLIC_NAVER_APP_ID,
    callbackUrl: `${protocol}//${host}/auth/naver-complete`,
    callbackHandle: callbackHandle,
    isPopup: isPopup,
    loginButton: {
      color: "green",
      type: 3,
      height: 56,
    },
  });

  return naverLogin;
};
