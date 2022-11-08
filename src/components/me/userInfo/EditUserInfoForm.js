import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Checkbox,
} from "@mui/material";
import moment from "moment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthButton from "src/components/AuthButton";
import { Span } from "src/components/Typography";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import useError from "src/hooks/useError";
import useAuth from "src/hooks/useAuth";
import FlexBox from "src/components/FlexBox";
import useSignup from "src/hooks/useSignup";
import useMember from "src/hooks/useMember";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import PassAuth from "src/components/signup/PassAuth";
import ApiEndpoint from "src/api/api";
import { useIntl, FormattedMessage } from "react-intl";
import StyledTextField from "src/components/AuthTextField/StyledTextField";

const Api = new ApiEndpoint();

const rex_nickname = /^[가-힣|a-z|0-9|A-Z]{2,8}$/;
const rex_phoneNo = /^[0-9]+$/;
const rex_Eng =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/;

export function GetValue(plaindata, key) {
  const arrData = plaindata.split(":");
  let value = "";
  // eslint-disable-next-line
  for (let i in arrData) {
    const item = arrData[i];
    if (item.indexOf(key) === 0) {
      const valLen = parseInt(item.replace(key, ""), 10);
      value = arrData[++i].substr(0, valLen);
      break;
    }
  }
  return value;
}

const EditUserInfoForm = ({ isSnsLogin }) => {
  const router = useRouter();
  const { user } = useAuth();
  const intl = useIntl();
  const {
    checkDuplEmail,
    checkDuplNickname,
    checkPass,
    postPassAuthData,
    patchUserInfoData,
  } = useMember();
  const { terms, setTermsValue, setPassInfoObject, passInfo } = useSignup();
  const [error, setError, ErrorMessageBox] = useError("");
  const formRef = useRef();
  const [alertType, setAlertType] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [passStart, setPassStart] = useState(false);
  const { fail, pass, EncodeData } = router.query;
  // 이메일 중복여부 체크
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  // 닉네임 중복여부 체크
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  // 휴대폰 인증성공 여부 체크
  const [isPassAuth, setIsPassAuth] = useState(false);
  const [isFirstPass, setIsFirstPass] = useState(true);

  const createErrorPath = () => {
    return `${router.locale === "ko" ? "" : "/en"}/me/user-info/edit?fail=true`;
  };
  const createReturnPath = () => {
    return `${router.locale === "ko" ? "" : "/en"}/me/user-info/edit?pass=true`;
  };
  console.log(user);
  // pass 인증하기 전, form data 임시 저장.
  const setPrevValues = () => {
    if (!formRef.current) return;
    const temp = {
      id: formRef.current.values.id,
      userName: formRef.current.values.userName,
      emailAddress: formRef.current.values.emailAddress,
      nickname: formRef.current.values.nickname,
      phoneNo: formRef.current.values.phoneNo,
      birthDay: formRef.current.values.birthDay,
      marketingReceiveAgreement:
        formRef.current.values.marketingReceiveAgreement,
      nightMarketingReceiveAgreement:
        formRef.current.values.nightMarketingReceiveAgreement,
      isCheckedEmail: isCheckedEmail,
      isCheckedNickname: isCheckedNickname,
    };
    localStorage.setItem("tempInfo", JSON.stringify(temp));
    setPassStart(true);
  };

  // pass 인증 후, 저장했던 수정가능한 데이터 form에 넣기
  const getPrevValues = () => {
    const tempInfo = JSON.parse(localStorage.getItem("tempInfo"));
    if (!tempInfo) return;
    formRef.current.setFieldValue("id", tempInfo.id);
    formRef.current.setFieldValue("emailAddress", tempInfo.emailAddress);
    formRef.current.setFieldValue("nickname", tempInfo.nickname);
    formRef.current.setFieldValue(
      "marketingReceiveAgreement",
      tempInfo.marketingReceiveAgreement
    );
    formRef.current.setFieldValue(
      "nightMarketingReceiveAgreement",
      tempInfo.nightMarketingReceiveAgreement
    );
    setIsCheckedEmail(tempInfo.isCheckedEmail);
    setIsCheckedNickname(tempInfo.isCheckedNickname);
    // 넣고 다시 삭제
    localStorage.removeItem("tempInfo");
  };

  const validateField = (values) => {
    const errors = {};
    if (!values.id) {
      errors.id = intl.formatMessage({ id: "validation_id_empty" });
    }
    if (!values.emailAddress) {
      errors.emailAddress = intl.formatMessage({
        id: "validation_email_empty",
      });
    }
    if (!values.nickname) {
      errors.nickname = intl.formatMessage({ id: "validation_nickname_empty" });
    }
    if (values.id && values.emailAddress && values.nickname) {
      return false;
    }
    return errors;
  };

  // pass 인증 여부 체크
  const checkPassAuth = async (id) => {
    try {
      const res = await checkPass(id);
      if (res?.data) {
        // 이미 인증한 경우
        setIsFirstPass(false);
        setIsPassAuth(true);
      } else {
        // 미인증
        setIsFirstPass(true);
      }
    } catch (err) {
      console.log(`err`, err);
    }
  };
  // 이메일 중복 체크
  const checkEmail = async (email) => {
    if (!email || email === "") {
      formRef.current.setErrors({
        ...formRef.current.errors,
        emailAddress: intl.formatMessage({ id: "validation_email_empty" }),
      });
      return;
    }
    try {
      const res = await checkDuplEmail(email);
      // console.log(`res.data.data`, res.data.data)
      // 서버에서 없는 이메일에 대해서는 res.data.data 가 false
      if (!res.data.data) {
        setIsCheckedEmail(true);
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_possible_email" }));
        setOpenAlert(true);
      } else {
        setIsCheckedEmail(false);
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_already_email" }));
        setOpenAlert(true);
      }
    } catch (err) {
      setIsCheckedEmail(false);
      console.log(`err`, err);
    }
  };
  // 닉네임 중복 체크
  const checkNickname = async (nickname) => {
    if (!nickname || nickname === "") {
      formRef.current.setErrors({
        ...formRef.current.errors,
        nickname: intl.formatMessage({ id: "validation_nickname_empty" }),
      });
      return;
    }
    try {
      const res = await checkDuplNickname(nickname);
      // console.log(`res.data.data`, res.data.data)
      // 서버에서 없는 아이디에 대해서는 res.data.data 가 false
      if (!res.data.data) {
        setIsCheckedNickname(true);
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_possible_nickname" }));
        setOpenAlert(true);
      } else {
        setIsCheckedNickname(false);
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_already_nickname" }));
        setOpenAlert(true);
      }
    } catch (err) {
      setIsCheckedNickname(false);
      console.log(`err`, err);
    }
  };

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const errors = validateField(values);
      if (errors) {
        setErrors(errors);
        return;
      }
      // 14세 미만인경우
      if (user?.under14YearsOld) {
        setAlertType("UNDER14");
        setMessage(intl.formatMessage({ id: "alert_msg_under_14yearsold" }));
        setOpenAlert(true);
        return;
      }
      // 중복확인, 휴대폰인증 체크
      if (!isCheckedEmail) {
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_check_dupl_email" }));
        setOpenAlert(true);
        return;
      }
      if (!isCheckedNickname) {
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_check_dupl_nickname" }));
        setOpenAlert(true);
        return;
      }
      if (!isPassAuth) {
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_not_done_passAuth" }));
        setOpenAlert(true);
        return;
      }
      const passPayload = {
        emailAddress: values.emailAddress,
        nickname: values.nickname,
        phoneNo: passInfo.mobileNo,
        userName: passInfo.name,
        birthDay: moment(passInfo.birthDate).format("YYYY-MM-DD"),
        parentAgreement: "N",
        connectingInformation: passInfo.connInfo,
        duplicationInformation: passInfo.dupInfo,
        marketingReceiveAgreement: values.marketingReceiveAgreement ? "Y" : "N",
        nightMarketingReceiveAgreement: values.nightMarketingReceiveAgreement
          ? "Y"
          : "N",
      };
      // 재수정 가능
      const updatePayload = {};
      if (user?.emailAddress !== values.emailAddress) {
        updatePayload.emailAddress = values.emailAddress;
      }
      if (user?.nickname !== values.nickname) {
        updatePayload.nickname = values.nickname;
      }
      updatePayload.marketingReceiveAgreement = values.marketingReceiveAgreement
        ? "Y"
        : "N";
      updatePayload.nightMarketingReceiveAgreement =
        values.nightMarketingReceiveAgreement ? "Y" : "N";

      console.log(`submit_values====`, values);
      console.log(`passPayload====`, passPayload);
      console.log(`updatePayload====`, updatePayload);
      console.log(`passInfo====`, passInfo);
      if (isFirstPass) {
        // [나의 정보 수정] 첫 pass 인증인경우
        const res = await postPassAuthData(values.id, passPayload);
        if (res?.success) {
          // 나의 정보 수정 성공한 경우
          setStatus({ success: true });
          setSubmitting(false);
          setAlertType("SUCCESS");
          setMessage(
            intl.formatMessage({ id: "alert_msg_success_edit_userInfo" })
          );
          setOpenAlert(true);
        } else {
          setStatus({ success: false });
          setSubmitting(false);
          if (
            res?.response?.data?.message.indexOf("이미 가입된 정보입니다") > -1
          ) {
            setAlertType("ALREADY_EXISTS");
            setMessage(
              intl.formatMessage({ id: "alert_msg_already_exits_passAuth" })
            );
          } else {
            setAlertType("ERROR");
            setMessage(
              intl.formatMessage({ id: "alert_msg_failed_edit_userInfo" })
            );
          }
          setOpenAlert(true);
        }
      } else {
        // [나의 정보 수정] 이미 인증했던 회원인 경우
        const res = await patchUserInfoData(values.id, updatePayload);
        if (res?.success) {
          // 나의 정보 수정 성공한 경우
          setStatus({ success: true });
          setSubmitting(false);
          setAlertType("SUCCESS");
          setMessage(
            intl.formatMessage({ id: "alert_msg_success_edit_userInfo" })
          );
          setOpenAlert(true);
        } else {
          setStatus({ success: false });
          setSubmitting(false);
          setAlertType("ERROR");
          setMessage(
            intl.formatMessage({ id: "alert_msg_failed_edit_userInfo" })
          );
          setOpenAlert(true);
        }
      }
    } catch (err) {
      console.error(err.response.data.message);
      setError(err.response.data.message);
      setStatus({ success: false });
      setErrors({ submit: err.response.data.message });
      setSubmitting(false);
    }
  };

  const requestDec = async () => {
    try {
      const res = await Api.postDecrypt({ target: EncodeData });
      console.log(`res.data.data`, res.data.data);
      const sDecData = res.data.data;
      console.log(`sDecData`, sDecData);
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
      });

      // pass 인증 결과
      if (pass) {
        console.log("PASS");
        setIsPassAuth(true);
        // pass 인증 후 본인인증 데이터 넣기
        formRef.current.setFieldValue("userName", name);
        formRef.current.setFieldValue("phoneNo", mobileNo);
        formRef.current.setFieldValue(
          "birthDay",
          moment(birthDate).format("YYYY-MM-DD")
        );
        // pass 인증 후 tempInfo 데이터 넣기
        getPrevValues();
      } else {
        console.log("NONPASS");
        setIsPassAuth(false);
        setAlertType("OK");
        setMessage(intl.formatMessage({ id: "alert_msg_failed_passAuth" }));
        setOpenAlert(true);
      }
    } catch (err) {
      console.log(`err`, err);
      setIsPassAuth(false);
    }
  };

  useEffect(() => {
    if (!EncodeData || EncodeData === "") return;
    requestDec();
  }, [EncodeData]);

  useEffect(() => {
    if (!user || !formRef.current) return;
    setIsCheckedEmail(
      user?.emailAddress === formRef.current.values.emailAddress
    );
    setIsCheckedNickname(user?.nickname === formRef.current.values.nickname);
    // pass 인증 여부 체크
    checkPassAuth(user?.id);
    // 최초 접근 여부 체크
    if (
      (!user?.nickname ||
        !user?.connectingInformation ||
        !user?.duplicationInformation ||
        !user?.userName ||
        !user?.phoneNo ||
        !user?.birthDay) &&
      !EncodeData &&
      !fail &&
      !pass
    ) {
      setAlertType("OK");
      setMessage(intl.formatMessage({ id: "alert_msg_notice_add_userInfo" }));
      setOpenAlert(true);
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        // bfcache로 페이지가 복원되었을 때 실행
        const tempInfo = localStorage.getItem("tempInfo");
        if (tempInfo && !isPassAuth) {
          localStorage.removeItem("tempInfo");
          router.reload(window.location.pathname);
        }
      }
    });
  }, []);

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          id: user?.id,
          userName: user?.userName || "",
          emailAddress: user?.emailAddress || "",
          nickname: user?.nickname || "",
          phoneNo: user?.phoneNo || "",
          birthDay: user?.birthDay || "",
          marketingReceiveAgreement: user?.marketingReceiveAgreement,
          nightMarketingReceiveAgreement: user?.nightMarketingReceiveAgreement,
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          emailAddress: Yup.string().email(
            intl.formatMessage({ id: "validation-email-format-role" })
          ),
          nickname: Yup.string()
            .min(2, intl.formatMessage({ id: "validation_nickname_length" }))
            .max(8, intl.formatMessage({ id: "validation_nickname_length" }))
            .matches(rex_nickname, {
              message: intl.formatMessage({
                id: "validation_nickname_use_role",
              }),
              excludeEmptyString: true,
            }),
          phoneNo: Yup.string()
            .matches(rex_phoneNo, {
              message: intl.formatMessage({
                id: "validation_phoneNo_only_num",
              }),
              excludeEmptyString: true,
            })
            .min(10, intl.formatMessage({ id: "validation_phoneNo_length" })),
        })}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors, dirty, isValid, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-id" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    name="id"
                    sx={{ width: "100%" }}
                    value={values.id}
                    error={errors.id}
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-name" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    name="userName"
                    sx={{ width: "100%" }}
                    value={values.userName}
                    error={errors.userName}
                    onChange={handleChange}
                    disabled={true}
                  />
                  {errors.userName && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.userName}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            {/* Email */}
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-email" />
                </Typography>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="email"
                    variant="outlined"
                    name="emailAddress"
                    sx={{ width: "100%" }}
                    value={values.emailAddress}
                    error={errors.emailAddress}
                    onChange={(e) => {
                      handleChange(e);
                      setIsCheckedEmail(user?.emailAddress === e.target.value);
                    }}
                    disabled={isSnsLogin && user?.emailAddress ? true : false}
                  />
                  {errors.emailAddress && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.emailAddress}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                md={2}
                sx={{ pl: "5px !important", pt: "12px !important" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    width: 100,
                    height: 51,
                    fontSize: router.locale === "ko" ? "0.875rem" : "0.75rem",
                    textTransform: "none",
                  }}
                  onClick={() => checkEmail(values.emailAddress)}
                  disabled={
                    isCheckedEmail || errors.emailAddress ? true : false
                  }
                >
                  <FormattedMessage
                    id="btn_check_dupl"
                    values={{ br: <br /> }}
                  />
                </Button>
              </Grid>
            </Grid>
            {/* 닉네임 */}
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-nickname" />
                </Typography>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    name="nickname"
                    sx={{ width: "100%" }}
                    value={values.nickname}
                    error={errors.nickname}
                    onChange={(e) => {
                      handleChange(e);
                      setIsCheckedNickname(user?.nickname === e.target.value);
                    }}
                  />
                  {errors.nickname && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.nickname}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                md={2}
                sx={{ pl: "5px !important", pt: "12px !important" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    width: 100,
                    height: 51,
                    fontSize: router.locale === "ko" ? "0.875rem" : "0.75rem",
                    textTransform: "none",
                  }}
                  onClick={() => checkNickname(values.nickname)}
                  disabled={isCheckedNickname || errors.nickname ? true : false}
                >
                  <FormattedMessage
                    id="btn_check_dupl"
                    values={{ br: <br /> }}
                  />
                </Button>
              </Grid>
            </Grid>
            {/* 휴대폰 */}
            <Grid container sx={{ my: 2 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-phoneNo" />
                </Typography>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="tel"
                    inputProps={{ maxLength: 11 }}
                    variant="outlined"
                    name="phoneNo"
                    sx={{ width: "100%" }}
                    value={values.phoneNo}
                    error={errors.phoneNo}
                    onChange={handleChange}
                    disabled={true}
                  />
                  {errors.phoneNo && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.phoneNo}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={4}
                md={2}
                sx={{ pl: "5px !important", pt: "12px !important" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    width: 100,
                    height: 51,
                    fontSize: router.locale === "ko" ? "0.875rem" : "0.75rem",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setPrevValues();
                  }}
                  disabled={
                    user?.phoneNo || isPassAuth || !isFirstPass ? true : false
                  }
                >
                  <FormattedMessage
                    id="btn_phone_passAuth"
                    values={{ br: <br /> }}
                  />
                </Button>
              </Grid>
            </Grid>
            {/* 생년월일 */}
            <Grid container sx={{ mt: 2, mb: 6 }} spacing={2}>
              <Grid
                item
                xs={12}
                md={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography component="span" fontSize={14}>
                  <FormattedMessage id="title-birthDay" />
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ width: "100%" }}>
                  <StyledTextField
                    type="text"
                    variant="outlined"
                    name="birthDay"
                    sx={{ width: "100%" }}
                    value={values.birthDay}
                    error={errors.birthDay}
                    onChange={handleChange}
                    disabled={true}
                  />
                  {errors.birthDay && (
                    <Typography sx={{ fontSize: 12, color: "#fa375a" }}>
                      {errors.birthDay}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 10 }}>
              <Grid
                item
                xs={12}
                md={3}
                fontSize={14}
                sx={{ mb: { xs: 2, sm: 2, md: 0, lg: 0 } }}
              >
                <FormattedMessage id="marketing_receive_argreement_title" />
              </Grid>
              <Grid item xs={12} md={9}>
                <FlexBox sx={{ alignItems: "center" }}>
                  <Field type="checkbox" name="marketingReceiveAgreement" />
                  <Typography sx={{ ml: 2, fontSize: 14 }}>
                    <FormattedMessage id="checkbox_marketing_receive_greement" />
                  </Typography>
                </FlexBox>
                <FlexBox mt={2} sx={{ alignItems: "center" }}>
                  <Field
                    type="checkbox"
                    name="nightMarketingReceiveAgreement"
                  />
                  <Typography sx={{ ml: 2, fontSize: 14 }}>
                    <FormattedMessage id="checkbox_nightmarketing_receive_greement" />
                  </Typography>
                </FlexBox>
              </Grid>
            </Grid>
            <AuthButton
              type="submit"
              color="edit-info"
              disabled={!(dirty && isValid)}
            >
              <FormattedMessage id="btn_edit_my_info" />
            </AuthButton>
          </form>
        )}
      </Formik>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
          if (alertType === "ALREADY_EXISTS") {
            // 이미 pass 인증된 휴대폰번호인경우
            formRef.current.setFieldValue("userName", "");
            formRef.current.setFieldValue("phoneNo", "");
            formRef.current.setFieldValue("birthDay", "");
            setIsPassAuth(false);
            router.replace("/me/user-info/edit", undefined, {
              shallow: true,
            });
          }
          if (alertType === "SUCCESS" || alertType === "UNDER14") {
            // alert 닫히고 내 정보 화면으로 이동
            router.push("/me/user-info");
          }
        }}
        message={message}
      />
      <PassAuth
        passStart={passStart}
        createErrorPath={createErrorPath}
        createReturnPath={createReturnPath}
      />
    </>
  );
};

export default EditUserInfoForm;
