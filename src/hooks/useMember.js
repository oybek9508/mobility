import ApiEndpoint from "src/api/api";
import AuthApi from "src/api/auth-api";

const api = new ApiEndpoint();
const authApi = new AuthApi();

const useMember = () => {
  const checkDuplEmail = async (email) => {
    try {
      const res = await api.postCheckDuplEmail(email);
      console.log("checkDuplEmail res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const checkDuplNickname = async (nickname) => {
    try {
      const res = await api.postCheckDuplNickname(nickname);
      console.log("checkDuplNickname res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  const changePassword = async (payload) => {
    try {
      const res = await authApi.patchPassword(payload);
      console.log("changePassword res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // pass 인증 여부 확인
  const checkPass = async (id) => {
    try {
      const res = await authApi.getPassData(id);
      console.log("getPassAuthData res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [나의 정보 수정] 첫 pass 인증인경우
  const postPassAuthData = async (id, payload) => {
    try {
      const res = await authApi.postPassData(id, payload);
      console.log("postPassAuthData res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [나의 정보 수정] pass 휴대폰 인증 완료한 경우
  const patchUserInfoData = async (id, payload) => {
    try {
      const res = await authApi.patchUserInfo(id, payload);
      console.log("patchUserInfoData res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // 비밀번호 재확인
  const checkPassword = async (password) => {
    try {
      const res = await authApi.getCheckPassword(password);
      console.log("checkPassword res", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [아이디/비밀번호 찾기] 이메일로 인증번호 요청
  const sendEmailAuthNum = async (payload) => {
    try {
      const res = await authApi.postEmailAuthNum(payload);
      console.log("sendEmailAuthNum", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [아이디/비밀번호 찾기] 이메일로 전송된 인증번호로 임시토큰을 발행
  const postTemporaryToken = async (payload) => {
    try {
      const res = await authApi.postEmailAuthToken(payload);
      console.log("postTemporaryToken", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [비밀번호 찾기] 아이디&이메일로 유저 확인
  const checkExistEmailId = async (payload) => {
    try {
      const res = await authApi.postExistEmailId(payload);
      console.log("checkExistEmailId", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [아이디 찾기] 이메일 토큰으로 아이디 찾기
  const getIdByTempToken = async () => {
    try {
      const res = await authApi.getIdByTemporaryToken();
      console.log("getIdByTempToken", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  // [비밀번호 찾기] 이메일 인증 토큰으로 비밀번호 변경
  const changePasswordByTempToken = async (payload) => {
    try {
      const res = await authApi.putPasswordByTemporaryToken(payload);
      console.log("changePasswordByTempToken", res);
      return res;
    } catch (err) {
      console.log(`err`, err);
      return err;
    }
  };

  return {
    checkDuplEmail,
    checkDuplNickname,
    changePassword,
    checkPass,
    postPassAuthData,
    patchUserInfoData,
    checkPassword,
    sendEmailAuthNum,
    postTemporaryToken,
    checkExistEmailId,
    getIdByTempToken,
    changePasswordByTempToken,
  };
};

export default useMember;
