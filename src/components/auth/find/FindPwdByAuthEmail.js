import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import {
  Button,
  Box,
  Grid,
  Divider,
  Typography,
  CardMedia,
} from "@mui/material";
import * as Yup from "yup";
import moment from "moment";
import useAuth from "src/hooks/useAuth";
import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import AuthTextField from "src/components/AuthTextField";
import FlexBox from "src/components/FlexBox";
import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";
import useMember from "src/hooks/useMember";
import AlertMsgPopup from "src/components/popup/AlertMsgPopup";
import { useIntl, FormattedMessage } from "react-intl";

const FindPwdByAuthEmail = (props) => {
  const intl = useIntl();
  const router = useRouter();
  const formRef = useRef();
  const countdownRef = useRef();
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", subText: [] });
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [expireAt, setExpireAt] = useState();
  // 재전송
  const [resend, setResend] = useState(false);
  const [isCorrectAuthNum, setIsCorrectAuthNum] = useState(false);
  const { findPwdInfo } = useSignup();
  const { sendEmailAuthNum, postTemporaryToken, checkExistEmailId } =
    useMember();

  useEffect(() => {
    if (!findPwdInfo.email || findPwdInfo.email === "") {
      alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (!findPwdInfo.email || findPwdInfo.email === "") return;
    // 페이지 랜딩 - 인증번호 바로 전송
    handleSendAuthNum();
  }, [findPwdInfo]);

  useEffect(() => {
    if (!isStartTimer) return;
    countdownRef.current = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          setIsStartTimer(false);
          setIsExpired(true);
          clearInterval(countdownRef.current);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, [minutes, seconds, isStartTimer]);

  const resetTimer = () => {
    setMinutes(5);
    setSeconds(0);
    setIsStartTimer(false);
    setIsExpired(false);
    formRef.current.setFieldValue("authNum", "");
  };

  const extendTimer = () => {
    resetTimer();
    setIsStartTimer(true);
  };

  // 만료시간으로 타이머 설정
  const setTimer = (expireAt) => {
    if (!expireAt || expireAt === "") return;
    const time1 = moment().format("YYYY-MM-DD hh:mm:ss");
    const time2 = moment(expireAt, "YYYY-MM-DD hh:mm:ss");
    const diffSeconds = moment.duration(time2.diff(time1)).asSeconds();
    const diffTime = moment()
      .startOf("day")
      .seconds(diffSeconds)
      .format("mm:ss");
    setMinutes(moment(diffTime, "mm:ss").minutes());
    setSeconds(moment(diffTime, "mm:ss").seconds());
  };

  //   인증번호 전송 버튼 클릭 시
  const handleSendAuthNum = async () => {
    resetTimer();
    try {
      const res = await sendEmailAuthNum({
        email: findPwdInfo.email,
        contents: "FIND_PW",
      });
      if (res?.success) {
        // SUCCESS: 인증번호가 성공적으로 전송이 되면 타이머 시작, 인증번호 입력 필드 활성화
        const expireAt = res?.data?.expireAt;
        setExpireAt(expireAt);
        setTimer(expireAt);
        if (!resend) {
          setMessage(intl.formatMessage({ id: "alert_msg_send_email_auth" }));
          setOpenAlert(true);
        }
        setResend(true);
        setIsStartTimer(true);
      } else {
        if (
          res?.response?.data?.message?.indexOf("없는 이메일 정보입니다.") > -1
        ) {
          setMessage(intl.formatMessage({ id: "alert_msg_not_exists_email" }));
          setOpenAlert(true);
        } else if (
          res?.response?.data?.message?.indexOf("횟수를 초과하였습니다.") > -1
        ) {
          setMessage(intl.formatMessage({ id: "alert_msg_exceeded_times" }));
          setOpenAlert(true);
        }
      }
    } catch (err) {
      console.log(`err`, err);
    }
  };
  // 인증번호 확인 버튼 클릭 시
  const handleAuthNumCheck = async () => {
    try {
      const authNum = formRef.current.values.authNum;
      const res = await postTemporaryToken({
        numbers: authNum,
        email: findPwdInfo.email,
        contents: "FIND_PW",
      });
      if (res?.success) {
        const { temporaryToken } = res?.data;
        localStorage.setItem("temporaryToken", temporaryToken);
        // SUCCESS: 인증번호가 맞으면 하단 다음단계 버튼 활성화, 타이머 제거
        setIsCorrectAuthNum(true);
        if (countdownRef.current) clearInterval(countdownRef.current);
      } else {
        if (res?.response?.data?.message === "유효하지 않는 인증번호 입니다.") {
          setMessage(intl.formatMessage({ id: "alert_msg_invalid_authNum" }));
          setOpenAlert(true);
        } else if (
          res?.response?.data?.message?.indexOf("유효시간이 만료되었습니다.") >
          -1
        ) {
          setMessage(intl.formatMessage({ id: "alert_msg_timeout" }));
          setOpenAlert(true);
          if (countdownRef.current) clearInterval(countdownRef.current);
        } else if (
          res?.response?.data?.message?.indexOf("없는 이메일 정보입니다.") > -1
        ) {
          setMessage(intl.formatMessage({ id: "alert_msg_not_exists_email" }));
          setOpenAlert(true);
        } else if (
          res?.response?.data?.message?.indexOf("중복된 이메일 주소 입니다.") >
          -1
        ) {
          setMessage(
            `${intl.formatMessage({
              id: "alert_msg_error_dupl_email",
            })}\nfoodverse@marvrus.com`
          );
          setOpenAlert(true);
        }
      }
    } catch (err) {
      console.log(`err`, err);
    }
  };

  const maskEmail = (email) => {
    const split = email.split("@");
    if (split[0].length < 3) return email;
    return (
      email.substr(0, 2) +
      new Array(split[0].length - 2).fill("*").join("") +
      "@" +
      split[1]
    );
  };

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    try {
      // 다음단계
      router.push("/auth/find/pwd/complete");
      setStatus({ success: true });
      setSubmitting(true);
    } catch (err) {
      console.error(err.response.data.message);
      setStatus({ success: false });
      setErrors({ submit: err.response.data.message });
      setSubmitting(false);
    }
  };
  return (
    <Box
      // p={3}
      pt={3}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{
        maxWidth: "480px",
        width: "100%",
      }}
    >
      <Grid container xs={12} display="flex" flexDirection="column">
        {/* 버튼 위치 */}
        <Grid xs={12} pb={8}>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            <FormattedMessage id="find_pw_title" />
          </Typography>
          <Typography
            pt={1}
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "1rem",
              color: "#333333",
              fontWeight: "400",
            }}
          >
            <FormattedMessage
              id="find_pw_description"
              values={{ br: <br /> }}
            />
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Formik
            innerRef={formRef}
            initialValues={{
              email: findPwdInfo.email || "",
              authNum: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email({ formatMessageId: "validation-email-format-role" })
                .required({ formatMessageId: "validation-email-empty-role" }),
              // authNum: Yup.string().required("인증번호를 입력해주세요."),
            })}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, errors, handleChange, ...props }) => (
              <form onSubmit={handleSubmit}>
                <Grid xs={12} item pb={5}>
                  <Box mb={2}>
                    <AuthTextField
                      disabled
                      resend={resend}
                      isStartTimer={isStartTimer}
                      isExpired={isExpired}
                      handleClickButton={() => {
                        handleSendAuthNum();
                      }}
                      showAuthCheckButton={true}
                      type="email"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      title={intl.formatMessage({ id: "title-email" })}
                      name="email"
                      // atom에 저장된 email 값 넣기
                      value={maskEmail(findPwdInfo.email)}
                      error={errors.email}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box>
                    <AuthTextField
                      disabled={
                        isStartTimer && !isExpired && !isCorrectAuthNum
                          ? false
                          : true
                      }
                      handleClickButton={() => {
                        handleAuthNumCheck();
                      }}
                      isCorrectAuthNum={isCorrectAuthNum}
                      showAuthCheckButton={true}
                      type="text"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      title={intl.formatMessage({ id: "authNum_title" })}
                      name="authNum"
                      value={values.authNum}
                      error={errors.authNum}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                {isStartTimer && !isExpired && !isCorrectAuthNum && (
                  <FlexBox
                    sx={{ fontSize: 14, justifyContent: "space-between" }}
                  >
                    <Box>
                      <FormattedMessage id="authNum_send_success_msg" /> (
                      <FormattedMessage id="authNum_valid_duration" />: 0
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                    </Box>
                    {/* <Box>
                      <Button
                        sx={{ p: 0, textDecoration: "underline" }}
                        onClick={() => extendTimer()}
                      >
                        시간연장
                      </Button>
                    </Box> */}
                  </FlexBox>
                )}
                {isCorrectAuthNum && (
                  <Typography>
                    <FormattedMessage id="authNum_correct_msg" />
                  </Typography>
                )}
                {isExpired && !isCorrectAuthNum && (
                  <Box>
                    <Typography sx={{ fontSize: 14, color: "red" }}>
                      <FormattedMessage id="authNum_expired_msg1" />
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "red" }}>
                      <FormattedMessage id="authNum_expired_msg2" />
                    </Typography>
                  </Box>
                )}
                <Divider />
                <Grid xs={12} item pt={5}>
                  <AuthButton
                    type="submit"
                    color="info"
                    disabled={isCorrectAuthNum ? false : true}
                  >
                    <FormattedMessage id="btn_find_pw_next" />
                  </AuthButton>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
      <AlertMsgPopup
        open={openAlert}
        handleClose={() => {
          setOpenAlert(false);
        }}
        message={message}
      />
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
            <Typography>{popupContent?.title}</Typography>
            {popupContent?.subText.map((v) => (
              <Typography>{v}</Typography>
            ))}
          </Box>
          <Box pt={3} pb={2} sx={{ width: "10rem" }}>
            <AuthButton onClick={() => setOpenPopup(false)}>
              <FormattedMessage id="popup_confirm" />
            </AuthButton>
          </Box>
        </Box>
      </AuthAlert>
    </Box>
  );
};

export default FindPwdByAuthEmail;
