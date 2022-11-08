import React, { useState, useEffect, useRef } from "react";
import ApiEndpoint from "src/api/api";

const Api = new ApiEndpoint();
const PassAuth = ({ passStart, createErrorPath, createReturnPath }) => {
  const [EncData, setEncData] = useState("");
  const formRef = useRef();

  useEffect(() => {
    if (!formRef.current) return;
    if (!passStart) return;

    async function start() {
      await createEncString();
      //   formRef.current.submit();
    }
    start();
  }, [formRef, passStart]);

  useEffect(() => {
    if (EncData === "") return;
    formRef.current.submit();
  }, [EncData]);

  const createEncString = async () => {
    const errorPath =
      typeof createErrorPath === "function"
        ? createErrorPath()
        : `/pass-auth/fail`;
    const returnPath =
      typeof createReturnPath === "function"
        ? createReturnPath()
        : `/pass-auth/complete`;
    const sSiteCode = "BV094";
    // var sSitePW = 'qxwy4id9KZKX'
    const sAuthType = ""; //없으면 기본 선택화면, M(휴대폰), X(인증서공통), U(공동인증서), F(금융인증서), S(PASS인증서), C(신용카드)
    const sCustomize = ""; //없으면 기본 웹페이지 / Mobile : 모바일페이지
    const sReturnUrl = window.location.origin + returnPath; // 성공시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)
    const sErrorUrl = window.location.origin + errorPath; // 실패시 이동될 URL (방식 : 프로토콜을 포함한 절대 주소)
    const d = new Date();
    const sCPRequest = sSiteCode + "_" + d.getTime();
    // prettier-ignore
    const target = "7:REQ_SEQ" + sCPRequest.length + ":" + sCPRequest +
		"8:SITECODE" + sSiteCode.length + ":" + sSiteCode +
		"9:AUTH_TYPE" + sAuthType.length + ":" + sAuthType +
		"7:RTN_URL" + sReturnUrl.length + ":" + sReturnUrl +
		"7:ERR_URL" + sErrorUrl.length + ":" + sErrorUrl +
		"9:CUSTOMIZE" + sCustomize.length + ":" + sCustomize;
    console.log(target);
    try {
      const res = await Api.postEncrpyt({ target });
      // console.log(`res.data.data`, res.data.data)
      setEncData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      ref={formRef}
      name="form_chk"
      method="post"
      target="_self"
      action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb"
    >
      <input type="hidden" name="m" value="checkplusService" />
      <input type="hidden" name="EncodeData" value={EncData} />
      <input type="hidden" name="recvMethodType" value="get" />
    </form>
  );
};

export default PassAuth;
