import React, { useState, useCallback } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import AuthTextField from "src/components/AuthTextField";
import AuthSelect from "src/components/AuthSelect";
import MaleBox from "./components/MaleBox";
import userInfoValidations from "./validations/userInfo";
import useSignup from "src/hooks/useSignup";
import { useIntl, FormattedMessage } from "react-intl";

const UserInfoForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const { passInfo } = useSignup();
  const isOverFourteen = passInfo.isOverFourteen === "true";
  const intl = useIntl();

  console.log("errors", errors);

  const inputYMDNumber = (event) => {
    if (event.keyCode != 8) {
      if (event.target.value.replace(/[0-9 \-]/g, "").length == 0) {
        let number = event.target.value.replace(/[^0-9]/g, "");
        let ymd = "";

        if (number.length < 4) {
          return number;
        } else if (number.length < 6) {
          ymd += number.substr(0, 4);
          ymd += "-";
          ymd += number.substr(4);
        } else {
          ymd += number.substr(0, 4);
          ymd += "-";
          ymd += number.substr(4, 2);
          ymd += "-";
          ymd += number.substr(6);
        }

        event.target.value = ymd;
      } else {
        alert("숫자 이외의 값은 입력하실 수 없습니다.");

        event.target.value = event.target.value.replace(/[^0-9 ^\-]/g, "");

        return false;
      }
    } else {
      return false;
    }
  };

  const onClickPostSearch = () => {
    if (!window.daum) return;
    new window.daum.Postcode({
      oncomplete: function (data) {
        // console.log('Post Code ', data)

        let FullAddress = data.address;
        if (data.buildingName) FullAddress += " " + data.buildingName;

        // 우편번호
        setFieldValue("zipCode", data.zonecode);
        setFieldValue("address", FullAddress);
      },
    }).open();
  };

  return (
    <Grid container item xs={12} py={2} display="flex" justifyContent="center">
      <Grid xs={12} item py={2}>
        <AuthTextField
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "signup-userinfo-id-label" })}
          title={intl.formatMessage({ id: "signup-userinfo-id-title" })}
          name="id"
          value={values.id}
          error={errors.id}
          touched={touched.id}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item py={2}>
        <AuthTextField
          type="password"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "signup-userinfo-pw-label" })}
          title={intl.formatMessage({ id: "signup-userinfo-pw-title" })}
          name="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item py={2}>
        <AuthTextField
          type="password"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "signup-userinfo-pw-confirm-label" })}
          title={intl.formatMessage({ id: "signup-userinfo-pw-confirm-title" })}
          name="passwordConfirm"
          value={values.passwordConfirm}
          error={errors.passwordConfirm}
          touched={touched.passwordConfirm}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
      {/* <Grid xs={12} item py={2}>
        <AuthTextField
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          label="닉네임을 입력해주세요"
          title="닉네임*"
          name="nickname"
          value={values.nickname}
          error={errors.nickname}
          touched={touched.nickname}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid> */}
      {/* <Grid xs={12} item py={2} display="flex" flexDirection="column">
        <AuthTextField
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          label="YYYY-MM-DD"
          title="생년월일*"
          name="birthDay"
          inputProps={{ readOnly: isOverFourteen }}
          value={values.birthDay}
          error={errors.birthDay}
          touched={touched.birthDay}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyUp={inputYMDNumber}
          maxLength={10}
        />
      </Grid> */}
      {/* <Grid xs={12} item display="flex" flexDirection="column" py={2}>
        <Typography
          variant="caption"
          pb={1}
          sx={{
            // fontWeight: 'bold',
            fontSize: "14px",
            fontFamily: "Noto Sans",
            color: "#333333",
            fontWeight: "400",
          }}
        >
          성별<span style={{ color: "red" }}>*</span>
        </Typography>
        <Grid xs={12} display="flex" gap={2}>
          <MaleBox
            isSelected={values.male === "MALE"}
            onClick={() => setFieldValue("male", "MALE")}
            error={errors.male}
          >
            <p>남성</p>
          </MaleBox>
          <MaleBox
            isSelected={values.male === "FEMALE"}
            onClick={() => setFieldValue("male", "FEMALE")}
            error={errors.male}
          >
            <p>여성</p>
          </MaleBox>
        </Grid>
        {errors.male && (
          <Typography
            variant="caption"
            pb={1}
            sx={{
              // fontWeight: 'bold',
              fontSize: "14px",
              fontFamily: "Noto Sans",
              color: "red",
              fontWeight: "400",
              cursor: "default",
            }}
          >
            {errors.male}
          </Typography>
        )}
      </Grid> */}
      <Grid xs={12} item py={2}>
        <AuthTextField
          type="email"
          variant="outlined"
          sx={{ width: "100%" }}
          label={intl.formatMessage({ id: "signup-userinfo-email-label" })}
          title={intl.formatMessage({ id: "signup-userinfo-email-title" })}
          name="email"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Grid>
      {/* <Grid
        xs={12}
        item
        pt={2}
        display="flex"
        flexDirection="row"
        gap={{ xs: 1, sm: 2 }}
      >
        <Grid xs={7} sm={8}>
          <AuthTextField
            type="text"
            variant="outlined"
            sx={{ width: "100%" }}
            label="우편번호"
            title="주소"
            name="zipCode"
            value={values.zipCode}
            error={errors.zipCode}
            onChange={handleChange}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid xs={5} sm={4} pt={3.4}>
          <Button
            variant="contained"
            color="info"
            onClick={onClickPostSearch}
            // disabled={!isOverFourteen && !isChecked}
            sx={{
              width: "100%",
              borderRadius: "6px",
              height: "50px",
              fontFamily: "Noto Sans",
              fontSize: { xs: "12px", sm: "1rem" },
              fontWeight: "bold",
              boxShadow: "none",
              whiteSpace: "nowrap",
            }}
          >
            우편번호찾기
          </Button>
        </Grid>
      </Grid> */}
      {/* <Grid xs={12} item>
        <AuthTextField
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          label="우편번호 찾기로 주소를 입력해주세요"
          name="address"
          value={values.address}
          error={errors.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12} item>
        <AuthTextField
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          label="나머지 주소를 입력해주세요"
          name="detailAddress"
          value={values.detailAddress}
          error={errors.detailAddress}
          onChange={handleChange}
        />
      </Grid> */}
      {errors.submit && (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            color: "#fa375a",
          }}
        >
          {errors.submit}
        </Typography>
      )}
    </Grid>
  );
};

export default UserInfoForm;
