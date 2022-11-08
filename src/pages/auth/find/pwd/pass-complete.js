import { useEffect, useState } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

import ApiEndpoint from "src/api/api";
import { GetValue } from "src/libs/utils/utils";

import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import useSignup from "src/hooks/useSignup";

const Api = new ApiEndpoint();

const NftFindPwdPassComplete = () => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", subText: [] });
  //   const query = new URLSearchParams(window.location.search);
  const { EncodeData, isOverFourteen } = router.query;
  const { findPwdInfo, setFindPwdInfoValue } = useSignup();
  const handleClickConfirm = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    requestDec();
  }, []);

  const requestDec = async () => {
    try {
      const res = await Api.postDecrypt({ target: EncodeData });
      const sDecData = res.data.data;

      const connInfo = decodeURIComponent(GetValue(sDecData, "CI")); //연계정보 확인값(88byte)

      const id = localStorage.getItem("find-pwd-id");
      setFindPwdInfoValue(id, connInfo);
      // TODO: pass 인증 결과로 이미 생성된 아이디 존재 유무 체크
      // console.log('findPwdInfo', findPwdInfo)
      // console.log(`isOverFourteen`, isOverFourteen)
      // console.log(`typeof isOverFourteen`, typeof isOverFourteen)
      const res2 = await Api.postFindExistId({
        id,
        connectingInformation: connInfo,
      });
      // console.log(res2.data)
      if (res2.data.data) {
        router.push(`/auth/find/pwd/complete?passComplete=true`);
      } else {
        // ID 미 존재시 팝업 노출
        setPopupContent({
          title: "등록된 회원정보가 아닙니다.",
          subText: [
            "아이디가 기억나지 않으시면,",
            "'아이디 찾기'를 이용해주세요.",
          ],
        });
        setOpenPopup(true);
      }
      // console.log(`res2.data`, res2.data)
    } catch (err) {
      // console.log(err)
      console.log(`err.response.data.message`, err.response.data.message);
      setPopupContent({
        title: "등록된 회원정보가 아닙니다.",
        subText: [
          "아이디가 기억나지 않으시면,",
          "'아이디 찾기'를 이용해주세요.",
        ],
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

export default NftFindPwdPassComplete;
