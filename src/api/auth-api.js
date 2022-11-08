import axios from "axios";
import _ from "lodash";

// prettier-ignore
const HOME_URL = process.env.NEXT_PUBLIC_API_URL
// console.log(`HOME_URL`, HOME_URL)
export const BASE_URL = `${HOME_URL}/api/v1`;

export const ApiPending = (state, action) => {
  state.error = undefined;
};
export const ApiReject = (state, action) => {
  state.error = action.payload;
};

export default class AuthApi {
  constructor() {
    this.token = undefined;
  }
  getBasePath = () => `${BASE_URL}`;

  // 로그인
  postLogin = async (payload) => {
    const { id, password } = payload;
    const JSEncrypt = (await import("jsencrypt")).default;
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(process.env.NEXT_PUBLIC_MARV_AUTH_KEY);
    const accessToken = localStorage.getItem("accessToken");
    // console.log('accessToken', accessToken)
    if (accessToken) localStorage.removeItem("accessToken");
    // localStorage.removeItem('accessToken')
    const encryptedPassword = encrypt.encrypt(password);
    // console.log('login_payload', {
    // 	id,
    // 	encryptedPassword,
    // })

    const res = await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/login`,
      method: "POST",
      data: {
        id,
        password: encryptedPassword,
      },
    });

    // console.log('res', res)
    return res.data;
  };

  Logout = async () => {
    const res = await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/logout`,
      method: "POST",
    });

    // console.log('res', res)
    return res.data;
  };

  getUserInfo = async (id) => {
    const res = await this.callAPI({
      // url: `${BASE_URL}/accounts/login-admin`,
      url: `${BASE_URL}/auth/accounts/${id}`,
      method: "GET",
      // data: payload,
    });
    // console.log(`res`, res)
    // console.log(`res`, res.data.data)
    return res.data;
  };

  addWallet = async (payload) => {
    /*
			Payload

			{
				"cryptocurrencyWalletTypeName": "string",
				"meemzAccountId": "string",
				"walletAddress": "string"
			}
		
		*/
    const res = await this.callAPI({
      url: `${BASE_URL}/my-wallet`,
      data: payload,
      method: "POST",
    });

    return res.data;
  };

  updateWallet = async (payload) => {
    /*
			Payload

			{
				"cryptocurrencyWalletTypeName": "string",
				"meemzAccountId": "string",
				"walletAddress": "string"
			}
		
		*/
    const res = await this.callAPI({
      url: `${BASE_URL}/my-wallet`,
      data: payload,
      method: "PUT",
    });

    return res.data;
  };

  getWallet = async () => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/my-wallet`,
        method: "GET",
      });

      return res.data;
    } catch (err) {
      // console.log('ERROR NETWORK')
      return false;
    }
  };

  deleteWallet = async () => {
    const res = await this.callAPI({
      url: `${BASE_URL}/my-wallet`,
      method: "DELETE",
    });

    return res.data;
  };

  addUserWallet = async (payload) => {
    /*
			Payload

			{
				"cryptocurrencyWalletTypeName": "string",
				"meemzAccountId": "string",
				"walletAddress": "string"
			}
		
		*/
    const res = await this.callAPI({
      url: `${BASE_URL}/user-wallet`,
      data: payload,
      method: "POST",
    });

    return res.data;
  };

  socialLogin = async (payload) => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log('accessToken', accessToken)
    if (accessToken) localStorage.removeItem("accessToken");
    const res = await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/login/social`,
      data: payload,
      method: "POST",
    });

    return res;
  };

  socialSignup = async (payload) => {
    const res = await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/social-signup`,
      data: payload,
      method: "POST",
    });

    return res.data;
  };

  // 총 보유 코인
  getTotalCoin = async () => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/coins`,
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 비밀번호 변경
  patchPassword = async (payload) => {
    try {
      const JSEncrypt = (await import("jsencrypt")).default;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(process.env.NEXT_PUBLIC_MARV_AUTH_KEY);
      const encryptedOldPassword = encrypt.encrypt(payload.oldPassword);
      const encryptedPassword = encrypt.encrypt(payload.password);
      const encryptedPasswordConfirm = encrypt.encrypt(payload.passwordConfirm);
      const res = await this.callAPI({
        url: `${BASE_URL}/marvrus/auth/password`,
        method: "PATCH",
        data: {
          oldPassword: encryptedOldPassword,
          password: encryptedPassword,
          passwordConfirm: encryptedPasswordConfirm,
        },
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // pass 인증 여부 확인
  getPassData = async (userId) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/accounts/${userId}/pass`,
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [나의 정보 수정] 첫 pass 인증인경우
  postPassData = async (userId, payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/accounts/${userId}/pass`,
        method: "PATCH",
        data: payload,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [나의 정보 수정] 이미 pass 인증완료 한경우 - 회원 수정 api
  patchUserInfo = async (userId, payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/accounts/users/${userId}`,
        method: "PATCH",
        data: payload,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 나의 정보 수정 (일반로그인) - 비밀번호 재확인
  getCheckPassword = async (password) => {
    const JSEncrypt = (await import("jsencrypt")).default;
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(process.env.NEXT_PUBLIC_MARV_AUTH_KEY);
    const encryptedPassword = encrypt.encrypt(password);
    console.log("encryptedPassword", encryptedPassword);
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/check-password`,
      method: "PATCH",
      data: { password: encryptedPassword },
    });
  };

  // 로그인 유지
  loginRefresh = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/marvrus/auth/login/refresh-token`,
        method: "POST",
        data: payload,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 이메일로 인증번호 요청 (이메일당 1일 3회 제한)
  postEmailAuthNum = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/temporary-credentials/email`,
        method: "POST",
        data: payload,
        isFindIdPw: true,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 이메일로 전송된 인증번호로 임시토큰을 발행
  postEmailAuthToken = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/temporary-credentials/token`,
        method: "POST",
        data: payload,
        isFindIdPw: true,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 아이디&이메일로 유저 확인 API
  postExistEmailId = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/marvrus/auth/exist/email-id`,
        method: "POST",
        data: payload,
        isFindIdPw: true,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 이메일 토큰으로 아이디 찾기 API
  getIdByTemporaryToken = async () => {
    const temporaryToken = localStorage.getItem("temporaryToken");
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/temporary-credentials/id`,
        method: "GET",
        temporaryToken: temporaryToken,
        isFindIdPw: true,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 이메일 인증 토큰으로 비밀번호 변경 API
  putPasswordByTemporaryToken = async (payload) => {
    const temporaryToken = localStorage.getItem("temporaryToken");
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/temporary-credentials/password`,
        method: "PUT",
        data: payload,
        temporaryToken: temporaryToken,
        isFindIdPw: true,
      });
      return res.data;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  callAPI = ({
    url,
    method,
    data,
    cancelToken,
    temporaryToken,
    isFindIdPw = false,
  }) => {
    let token = localStorage.getItem("accessToken");
    if (isFindIdPw && temporaryToken) {
      token = temporaryToken;
    } else if (isFindIdPw) {
      token = undefined;
    }
    // console.log('token check : ', _.isNull(token) || _.isUndefined(token))
    const headers =
      _.isNull(token) || _.isUndefined(token)
        ? { "Content-Type": "application/json" }
        : {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          };
    // console.log(`token`, token);
    // console.log(`headers`, headers);
    return axios({
      url,
      method,
      data,
      headers: headers,
      // headers: {
      // 	'Content-Type': 'application/json',
      // },
      cancelToken,
    });
  };
}
