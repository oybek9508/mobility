import { useEffect, useState } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

import ApiEndpoint from "src/api/api";
import { GetValue } from "src/libs/utils/utils";

import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import useSignup from "src/hooks/useSignup";
const Api = new ApiEndpoint();

const NftFindIdPassComplete = () => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", subText: [] });
  //   const query = new URLSearchParams(window.location.search);
  const { EncodeData, isOverFourteen } = router.query;
  const { setFindIdArray } = useSignup();
  const handleClickConfirm = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    requestDec();
  }, []);

  const requestDec = async () => {
    try {
      const res = await Api.postDecrypt({ target: EncodeData });
      // console.log(`res.data.data`, res.data.data)
      const sDecData = res.data.data;
      // console.log(`sDecData`, sDecData)
      const requestNumber = decodeURIComponent(GetValue(sDecData, "REQ_SEQ")); //CP요청 번호 , main에서 생성한 값을 되돌려준다. 세션등에서 비교 가능
      const responseNumber = decodeURIComponent(GetValue(sDecData, "RES_SEQ")); //고유 번호 , 나이스에서 생성한 값을 되돌려준다.
      const authType = decodeURIComponent(GetValue(sDecData, "AUTH_TYPE")); //인증수단
      const name = decodeURIComponent(GetValue(sDecData, "UTF8_NAME")); //이름
      const birthDate = decodeURIComponent(GetValue(sDecData, "BIRTHDATE")); //생년월일(YYYYMMDD)
      const gender = decodeURIComponent(GetValue(sDecData, "GENDER")); //성별
      const nationalInfo = decodeURIComponent(
        GetValue(sDecData, "NATIONALINFO")
      ); //내.외국인정보
      const dupInfo = decodeURIComponent(GetValue(sDecData, "DI")); //중복가입값(64byte)
      const connInfo = decodeURIComponent(GetValue(sDecData, "CI")); //연계정보 확인값(88byte)
      const mobileNo = decodeURIComponent(GetValue(sDecData, "MOBILE_NO")); //휴대폰번호(계약된 경우)
      const mobileCo = decodeURIComponent(GetValue(sDecData, "MOBILE_CO")); //통신사(계약된 경우)

      const res2 = await Api.postFindId(connInfo);
      // console.log(`res2.data.data`, res2.data.data)
      if (res2.data.success) {
        // console.log(`res2.data.data.ids.length`, res2.data.data.ids.length)
        // ID 존재시 아이디찾기 결과페이지로 redirect
        if (res2.data.data.ids.length > 0) {
          const foundIds = res2.data.data.ids;
          setFindIdArray(foundIds);
          router.push(`/auth/find/id/complete?passComplete=true`);
        } else {
          // TODO: 존재하는 아이디가 없을때
          setPopupContent({
            title: "회원 등록이 되어 있지 않습니다",
            subText: ["밈즈에 가입해 주세요."],
          });
          setOpenPopup(true);
        }
      } else {
        // ID 미 존재시 팝업 노출
        setPopupContent({
          title: "회원 등록이 되어 있지 않습니다",
          subText: ["밈즈에 가입해 주세요."],
        });
        setOpenPopup(true);
      }
    } catch (err) {
      console.log(err);
      console.log(`err.response.data.message`, err.response.data.message);

      setPopupContent({
        title: "회원 등록이 되어 있지 않습니다",
        subText: ["밈즈에 가입해 주세요."],
      });
      setOpenPopup(true);
    }
  };

  return (
    <AuthAlert
      open={openPopup}
      onClose={() => setOpenPopup(false)}
      // title={popupContent.title}
      // subText1={popupContent.subText}
      // mainBtnText='확인'
      // mainBtnAction={() => {
      // 	console.log(`typeof window.Unity`, typeof window.Unity)
      // 	if (typeof window.Unity !== 'undefined') {
      // 		window.Unity.call('CLOSE_WEBVIEW')
      // 	} else {
      // 		router.push('/signup')
      // 	}
      // }}
      // disableEscapeKeyDown
      // disableBackdropClick
    >
      <Box
        p={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <CardMedia
            src="/assets/images/nft-signup/warning.svg"
            alt="link"
            component="img"
            sx={{
              width: "64px",
              height: "64px",
            }}
          />
        </Box>
        <Box
          pt={3}
          sx={{
            width: "19rem",
            textAlign: "center",
            fontFamily: "NotoSans-Regular",
          }}
        >
          <Typography>{popupContent.title}</Typography>
          {popupContent.subText.map((v) => (
            <Typography key={v}>{v}</Typography>
          ))}
        </Box>
        <Box pt={3} pb={2} sx={{ width: "10rem" }}>
          <AuthButton onClick={handleClickConfirm}>확인</AuthButton>
        </Box>
      </Box>
    </AuthAlert>
  );
};

export default NftFindIdPassComplete;
