import { useEffect, useState } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

import ApiEndpoint from "src/api/api";
import { GetValue } from "src/libs/utils/utils";

import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import useSignup from "src/hooks/useSignup";
const Api = new ApiEndpoint();

const NftPassAuthComplete = () => {
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", subText: [] });
  //   const query = new URLSearchParams(window.location.search);
  const { EncodeData, isOverFourteen } = router.query;
  //   const EncodeData = query.get("EncodeData");
  //   const isOverFourteen = query.get("isOverFourteen");
  //   const err = query.get("err");
  const { setPassInfoValue, setPassInfoObject } = useSignup();
  const handleClickConfirm = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!EncodeData || EncodeData === "") return;
    requestDec();
  }, [EncodeData]);

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

      setPassInfoObject({
        requestNumber,
        responseNumber,
        authType,
        name,
        birthDate,
        gender,
        nationalInfo,
        dupInfo,
        connInfo,
        mobileNo,
        mobileCo,
        isOverFourteen,
      });

      // TODO: pass 인증 결과로 이미 생성된 아이디 존재 유무 체크
      // console.log(`isOverFourteen`, isOverFourteen)
      // console.log(`typeof isOverFourteen`, typeof isOverFourteen)
      const res2 = await Api.postPassAvailability({
        connectingInformation: connInfo,
        duplicationInformation: dupInfo,
        parentAgreement: isOverFourteen === "true" ? "N" : "Y",
      });
      //   console.log(`res2.data.data`, res2.data.data);
      router.push(`/auth/sign-up/agreement?passComplete=true`);
    } catch (err) {
      // console.log(err)
      console.log(`err.response.data.message`, err.response.data.message);
      if (isOverFourteen === "true") {
        // TODO: 14세 이상 이미 가입한 아이디가 있는 경우
        setPopupContent({
          title: "이미 가입된 정보입니다",
          subText: [
            "계정정보가 기억나지 않으시면,",
            "아이디 찾기를 이용해주세요.",
            "확인을 누르시면, 로그인으로 이동합니다.",
          ],
        });
      } else {
        // TODO: 14세 미만 이미 가입한 아이디가 3개가 넘는경우
        setPopupContent({
          title: "이미 가입된 정보입니다",
          subText: [
            "1명의 보호자(법적대리인)은",
            " 3명까지 밈즈 인증이 가능합니다.",
            "이미 가입하신 아이디를 찾거나,",
            "고객센터로 문의주세요.",
            "확인을 누르시면 로그인으로 이동합니다.",
          ],
        });
      }
      setOpenPopup(true);
    }
  };

  return (
    <AuthAlert open={openPopup} onClose={() => setOpenPopup(false)}>
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

export default NftPassAuthComplete;
