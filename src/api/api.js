import axios from "axios";
import _ from "lodash";
import qs from "qs";
// import { encryptPasswords } from "./users";
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

export default class ApiEndpoint {
  constructor() {
    this.token = undefined;
  }
  getBasePath = () => `${BASE_URL}`;

  // 회원 등록
  postUserSignup = async (payload) => {
    return await this.callAPI({
      url: `${BASE_URL}/accounts/signup`,
      method: "POST",
      data: payload,
    });
  };

  // PASS 암호 암호화
  postEncrpyt = async (payload) => {
    return await this.callAPI({
      url: `${BASE_URL}/pass-crypt/encrypt`,
      method: "POST",
      data: payload,
    });
  };

  // PASS 암호 복호화
  postDecrypt = async (payload) => {
    return await this.callAPI({
      url: `${BASE_URL}/pass-crypt/decrypt`,
      method: "POST",
      data: payload,
    });
  };

  // 이메일 중복체크
  getUserDuplicated = async (payload) => {
    const changeType = JSON.stringify(payload, null, 2);
    // console.log(changeType)
    return await this.callAPI({
      url: `${BASE_URL}/accounts/email-duplicate`,
      method: "POST",
      data: changeType,
    });
  };

  // 이메일 중복여부 체크
  postCheckDuplEmail = async (email) => {
    const payload = JSON.stringify({ email });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/duplicate/email`,
      method: "POST",
      data: payload,
    });
  };

  postAccountCert = async (moonCode, certKey) => {
    const payload = JSON.stringify({ certKey });
    return await this.callAPI({
      url: `${BASE_URL}/accounts/${moonCode}/cert`,
      method: "POST",
      data: payload,
    });
  };

  // 아이디 중복여부 체크
  postCheckDuplId = async (id) => {
    const payload = JSON.stringify({ id });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/duplicate/id`,
      method: "POST",
      data: payload,
    });
  };

  // 닉네임 중복여부 체크
  postCheckDuplNickname = async (nickname) => {
    const payload = JSON.stringify({ nickname });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/duplicate/nickname`,
      method: "POST",
      data: payload,
    });
  };

  // 회원가입 처리
  postSignup = async (form) => {
    const payload = JSON.stringify({ ...form });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/uncertified-signup`,
      method: "POST",
      data: payload,
    });
  };

  // pass인증결과로 아이디 찾기
  postFindExistId = async ({ id, connectingInformation }) => {
    const payload = JSON.stringify({ id, connectingInformation });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/exist/id-ci`,
      method: "POST",
      data: payload,
    });
  };

  // 아이디 찾기
  postFindId = async (connectingInformation) => {
    const payload = JSON.stringify({ connectingInformation });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/find/id`,
      method: "POST",
      data: payload,
    });
  };

  // pass ci로 가입가능 여부
  postPassAvailability = async (body) => {
    const payload = JSON.stringify({ ...body });
    // console.log(`payload`, payload)
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/pass/availability`,
      method: "POST",
      data: payload,
    });
  };

  // 비밀번호 재설정
  putResetPassword = async (body) => {
    const payload = JSON.stringify({ ...body });
    return await this.callAPI({
      url: `${BASE_URL}/marvrus/auth/reset/password`,
      method: "PUT",
      data: payload,
    });
  };

  callAPI = ({ url, method, data, cancelToken }) => {
    // const token = localStorage.getItem('accessToken')
    // console.log('token check : ', _.isNull(token) || _.isUndefined(token))
    // const headers =
    // 	_.isNull(token) || _.isUndefined(token)
    // 		? { 'Content-Type': 'application/json' }
    // 		: {
    // 				Authorization: `${token}`,
    // 				'Content-Type': 'application/json',
    // 		  }
    // console.log(`token`, token)
    // console.log(`headers`, headers)
    return axios({
      url,
      method,
      data,
      // headers: headers,
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken,
    });
  };
}
