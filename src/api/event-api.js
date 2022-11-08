import axios from "axios";
import _ from "lodash";
import qs from "qs";

// prettier-ignore
const HOME_URL = process.env.NEXT_PUBLIC_API_URL
// console.log(`HOME_URL`, HOME_URL)
export const BASE_URL = `${HOME_URL}/api`;

export const ApiPending = (state, action) => {
  state.error = undefined;
};
export const ApiReject = (state, action) => {
  state.error = action.payload;
};

export default class EventApi {
  constructor() {
    this.token = undefined;
  }
  getBasePath = () => `${BASE_URL}`;

  // 회원가입 완료 쿠폰 지급 확인 moonCode
  checkEventMember = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-member`,
        data: payload,
        method: "POST",
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 회원가입 완료 쿠폰 직원 인증 moonCode, confirmCode(직원 인증 코드)
  putEventMember = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-member/complete`,
        data: payload,
        method: "PUT",
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 도장 찍기 확인
  checkEventStamp = async (round) => {
    const queryString = qs.stringify({ round });
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-stamp?${queryString}`,
        method: "GET",
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 도장 찍기 생성
  createEventStamp = async (round, { moonCode }) => {
    const queryString = qs.stringify({ round, moonCode });
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-stamp?${queryString}`,
        method: "POST",
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 도장 찍기 업데이트 payload: (moonCode, round)
  updateEventStamp = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-stamp`,
        method: "PUT",
        data: payload,
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 도장 찍기 지급 완료 payload: (confirmCode, moonCode, round)
  completeEventStamp = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-stamp/complete`,
        method: "PUT",
        data: payload,
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 룰렛 확인
  checkEventRoulette = async () => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-roulette`,
        method: "GET",
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 룰렛 생성
  createEventRoulette = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-roulette`,
        method: "POST",
        data: payload,
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  // 룰렛 업데이트 payload: (moonCode)
  updateEventRoulette = async (payload) => {
    try {
      const res = await this.callAPI({
        url: `${BASE_URL}/event-roulette`,
        method: "PUT",
        data: payload,
      });
      return res.data;
    } catch (err) {
      return false;
    }
  };

  callAPI = ({ url, method, data, cancelToken }) => {
    const token = localStorage.getItem("accessToken");
    // console.log('token check : ', _.isNull(token) || _.isUndefined(token))
    const headers =
      _.isNull(token) || _.isUndefined(token)
        ? { "Content-Type": "application/json" }
        : {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          };
    // console.log(`token`, token)
    // console.log(`headers`, headers)
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
