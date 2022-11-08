import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Formik, useFormik } from "formik";
import { Button, Box, Grid, Divider } from "@mui/material";
import * as Yup from "yup";
import { useIntl, FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";
import useAuth from "src/hooks/useAuth";
import SignupHeader from "./components/sign-up/SignupHeader";
import UserInfoForm from "./components/sign-up/UserInfoForm";
import AuthButton from "src/components/AuthButton";
import ApiEndpoint from "src/api/api";

const Api = new ApiEndpoint();

function YMDFormatter(num) {
  if (!num) return "";
  let number = num;
  let formatNum = "";

  number = num.replace(/\s/gi, "");
  try {
    if (number.length == 8) {
      formatNum = number.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    }
  } catch (e) {
    formatNum = number;
    console.log(e);
  }
  return formatNum;
}

function YMDSpliter(num) {
  if (!num) return "";
  let number = num;
  let formatNum = "";

  number = num.replace(/\s/gi, "");
  try {
    if (number.length == 8) {
      formatNum = number.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    }
  } catch (e) {
    formatNum = [];
    console.log(e);
  }
  return formatNum;
}

const rex_pwd =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/;
// const rex_id = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_]{4,19}[A-Za-z\d]{1}$/
const rex_id = /^[-a-zA-Z0-9_]{5,20}$/;
const rex_nickname = /^[가-힣|a-z|0-9|A-Z]{2,8}$/;
const rex_birthDay = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

const SignupInfoForm = (props) => {
  const router = useRouter();
  const {
    terms,
    passInfo,
    setSignupUserInfo,
    initPassInfo,
    isSignup,
    signupUser,
  } = useSignup();
  const prevIdRef = useRef("");
  const isDuplIdRef = useRef(false);
  const [prevId, setPrevId] = useState("");
  const [isDuplId, setIsDuplId] = useState(false);
  const intl = useIntl();
  const { user, isAuthenticated } = useAuth();
  const [initState, setInitState] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  useEffect(() => {
    // 비정상적 접근 막기
    if (!isSignup || signupUser.id) {
      let path = "/auth/login";
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) path = "/";
      alert(intl.formatMessage({ id: "alert_msg_wrong_access" }));
      router.push(path);
      return;
    }
  }, []);

  const onSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm }
  ) => {
    // console.log('terms', terms)
    // console.log('passInfo', passInfo)
    // console.log('values', values)
    const JSEncrypt = (await import("jsencrypt")).default;
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(process.env.NEXT_PUBLIC_MARV_AUTH_KEY);
    const password = encrypt.encrypt(values.password);
    const passwordConfirm = encrypt.encrypt(values.passwordConfirm);

    const isOverFourteen = passInfo?.isOverFourteen === "true";

    try {
      const payload = {
        parentAgreement: terms?.isOverFourteen === true ? "N" : "Y",
        marketingReceiveAgreement: terms?.marketingPolicy ? "Y" : "N",
        privacyInfoUseAgreement: terms?.privacyPolicy ? "Y" : "N",
        servicePolicyAgreement: terms?.servicePolicy ? "Y" : "N",
        nightMarketingReceiveAgreement: terms?.nightNotiAgree ? "Y" : "N",
        id: values.id,
        password: password,
        passwordConfirm: passwordConfirm,
        emailAddress: values.email,
        signupSite: "MOBILITY",
      };

      console.log(`payload`, payload);
      const res = await Api.postSignup(payload);
      console.log(`res.data`, res.data);
      setStatus({ success: true });
      setSubmitting(false);
      if (res.data.success) {
        setSignupUserInfo(
          res.data.data.id,
          res.data.data.signupDt,
          res.data.data.moonCode
        );

        setTimeout(() => {
          router.push(`/auth/sign-up/complete`);
        }, 500);
      }

      // console.log('res', res)
      // router.back()
    } catch (err) {
      console.error(err?.response?.data.message);
      setStatus({ success: false });
      setErrors({ submit: err?.response?.data.message });
      setSubmitting(false);
    }
  };
  const formik = useRef();

  //   useEffect(() => {
  //     // pass 인증 제거
  //     // if (!passInfo.connInfo) {
  //     //   // 첫 페이지로 이동 되어야함
  //     //   // if (!passInfo.connInfo) {
  //     //   window.alert("잘못된 접근 입니다.");
  //     //   router.push("/nft-auth/login");
  //     //   // }
  //     //   return;
  //     // }

  //     if (passInfo?.isOverFourteen === "true") {
  //       const splitBirtdate = YMDSpliter(passInfo.birthDate);

  //       if (!splitBirtdate) return;

  //       setInitState({
  //         ...initState,
  //         // year: splitBirtdate[0],
  //         // month: splitBirtdate[1],
  //         // day: splitBirtdate[2],
  //         birthDay: splitBirtdate,
  //       });
  //     } else {
  //       return;
  //     }
  //   }, [passInfo?.connInfo]);

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
        <Grid xs={12} item display="flex">
          <SignupHeader step={2} />
        </Grid>
        <Grid xs={12} item>
          <Formik
            initialValues={initState}
            enableReinitialize
            validationSchema={Yup.object().shape({
              id: Yup.string()
                .min(5, intl.formatMessage({ id: "validation-id-text-role" }))
                .max(20, intl.formatMessage({ id: "validation-id-text-role" }))
                .matches(
                  rex_id,
                  intl.formatMessage({ id: "validation-id-text-role" })
                )
                .test(
                  "Unique ID",
                  intl.formatMessage({ id: "validation-id-exist-role" }),
                  function (value) {
                    if (!value) return true;
                    if (prevIdRef.current === value && isDuplIdRef.current)
                      return false;
                    prevIdRef.current = value;
                    return new Promise(async (resolve, reject) => {
                      try {
                        const res = await Api.postCheckDuplId(value);
                        console.log(`res.data.data unique id`, res.data.data);
                        // 서버에서 없는 아이디에 대해서는 res.data.data 가 false
                        resolve(!res.data.data);
                        isDuplIdRef.current = res.data.data;
                      } catch (err) {
                        console.log(
                          `err.response.data.message`,
                          err?.response?.data.message
                        );
                        resolve(false);
                      }
                    });
                  }
                )
                .required(
                  intl.formatMessage({ id: "validation-id-empty-role" })
                ),
              password: Yup.string()
                .min(8, intl.formatMessage({ id: "validation-pw-text-role" }))
                .max(20, intl.formatMessage({ id: "validation-pw-text-role" }))
                .matches(
                  rex_pwd,
                  intl.formatMessage({ id: "validation-pw-text-role" })
                )
                .required(
                  intl.formatMessage({ id: "validation-pw-empty-role" })
                ),
              passwordConfirm: Yup.string()
                .min(8, intl.formatMessage({ id: "validation-pw-text-role" }))
                .max(20, intl.formatMessage({ id: "validation-pw-text-role" }))
                .oneOf(
                  [Yup.ref("password"), null],
                  intl.formatMessage({ id: "validation-pw-not-matched-role" })
                )
                .matches(
                  rex_pwd,
                  intl.formatMessage({ id: "validation-pw-text-role" })
                )
                .required(
                  intl.formatMessage({ id: "validation-pw-empty-role" })
                ),
              //   nickname: Yup.string()
              //     .min(2, "닉네임은 최소 2자 ~ 최대 8자로 작성해주세요.")
              //     .max(8, "닉네임은 최소 2자 ~ 최대 8자로 작성해주세요.")
              //     .matches(rex_nickname, {
              //       message: "닉네임은 한글,영어,숫자만 사용해주세요.",
              //       excludeEmptyString: true,
              //     })
              //     .test(
              //       "Unique Nickname",
              //       "이미 사용중인 닉네임입니다.",
              //       function (value) {
              //         if (!value) return true;
              //         if (
              //           prevNickNameRef.current === value &&
              //           isDuplNickNameRef.current
              //         )
              //           return false;
              //         prevNickNameRef.current = value;
              //         return new Promise(async (resolve, reject) => {
              //           try {
              //             const res = await Api.postCheckDuplNickname(value);
              //             // console.log(`res.data.data`, res.data.data)
              //             // 서버에서 없는 아이디에 대해서는 res.data.data 가 false
              //             resolve(!res.data.data);
              //             isDuplNickNameRef.current = res.data.data;
              //             // isDupNickname = res.data.data
              //           } catch (err) {
              //             // console.log(`err`, err)
              //             resolve(false);
              //           }
              //         });
              //       }
              //     )
              //     .required("닉네임이 비었습니다."),
              //   male: Yup.string().required("성별을 선택해 주세요"),
              email: Yup.string()
                .email(
                  intl.formatMessage({ id: "validation-email-format-role" })
                )
                .required(
                  intl.formatMessage({ id: "validation-email-empty-role" })
                ),
              // year: Yup.string()
              // 	.required('년도를 선택해 주세요')
              // 	.test('Min Value', '년도를 선택해 주세요', function (value) {
              // 		return value > 0
              // 	}),
              // month: Yup.string()
              // 	.required('월을 선택해 주세요')
              // 	.test('Min Value', '월을 선택해 주세요', function (value) {
              // 		return value > 0
              // 	}),
              // day: Yup.string()
              // 	.required('일을 선택해 주세요')
              // 	.test('Min Value', '날짜를 선택해 주세요', function (value) {
              // 		return value > 0
              // 	}),
              //   birthDay: Yup.string()
              //     .matches(rex_birthDay, "생년월일을 올바르게 입력해주세요.")
              //     .test(
              //       "BirthDay Format",
              //       "생년월일을 올바르게 입력해주세요",
              //       function (value) {
              //         if (!value) return true;
              //         // console.log(value)
              //         try {
              //           const date = new Date(value);
              //           const year = date.getFullYear();
              //           const month =
              //             date.getMonth() < 9
              //               ? "0" + (date.getMonth() + 1)
              //               : date.getMonth() + 1;
              //           const day =
              //             date.getDate() < 10
              //               ? "0" + date.getDate()
              //               : date.getDate();

              //           if (value !== `${year}-${month}-${day}`) return false;
              //           return true;
              //         } catch (err) {
              //           console.log(err);
              //           return false;
              //         }
              //       }
              //     )
              //     .required("생년월일을 입력해 주세요"),
              //   zipCode: Yup.number("숫자만 입력할 수 있습니다."),
              //   address: Yup.string(),
              //   detailAddress: Yup.string(),
            })}
            // validateOnMount
            // validateOnChange={false}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, dirty, isValid, ...props }) => {
              // const handleCustomChange = (e) => {
              // 	console.log(idErrorRef.current)
              // 	if (idErrorRef.current) props.setFieldError('id', idErrorRef.current)
              // 	props.handleChange(e)
              // }
              return (
                <form onSubmit={handleSubmit}>
                  <UserInfoForm {...props} />
                  <Divider />
                  <Grid xs={12} item pt={3}>
                    <AuthButton
                      type="submit"
                      color="info"
                      disabled={!(dirty && isValid)}
                    >
                      <FormattedMessage id="signup-next-step" />
                    </AuthButton>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupInfoForm;
