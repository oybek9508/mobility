export const loadKakaoSdk = () => {
  return new Promise((resolve, reject) => {
    const js = document.createElement("script");

    js.id = "kakao-sdk";
    js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    js.onload = resolve;

    document.body.append(js);
  });
};

export const removeKakaoSdk = () => {
  const sdk = document.getElementById("kakao-sdk");
  sdk.remove();
};

export const kakaoLogin = () => {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const kakaoObj = {
              ...authObj,
              ...res,
            };

            resolve(kakaoObj);
          },
          fail: function (error) {
            reject(error);
          },
        });
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
