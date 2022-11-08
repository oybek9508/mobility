import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Box, Grid, Divider, Typography } from "@mui/material";

import AuthButton from "src/components/AuthButton";

import { useRouter } from "next/router";
import useSignup from "src/hooks/useSignup";

const FindIdPassComplete = (props) => {
  const { findIdInfo, initFindId } = useSignup();

  const router = useRouter();

  const handleClickLogin = () => {
    initFindId();
    router.push("/auth/login");
  };

  const handleClickFindPass = () => {
    initFindId();
    router.push("/auth/find/pwd");
  };

  useEffect(() => {
    if (!findIdInfo.isPassed) {
      window.alert("잘못된 접근 입니다.");
      router.push("/auth/login");
    }
  }, [findIdInfo.isPassed]);

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
        <Grid xs={12}>
          <Typography
            sx={{
              fontFamily: "NotoSans-Bold",
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            회원님의 아이디를
          </Typography>
          <Typography
            sx={{
              fontFamily: "NotoSans-Bold",
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            찾았어요!
          </Typography>
          <Typography
            pt={3}
            sx={{
              fontFamily: "NotoSans-Regular",
              fontSize: "1.25rem",
              color: "#333333",
            }}
          >
            해당 정보로 밈즈에 회원가입한
          </Typography>
          <Typography
            sx={{
              fontFamily: "NotoSans-Regular",
              fontSize: "1.25rem",
              color: "#333333",
            }}
          >
            아이디는 아래와 같습니다.
          </Typography>
        </Grid>
        <Grid xs={12} pt={4} py={3}>
          <Box
            sx={{
              minHeight: "154px",
              backgroundColor: "#fbfbfb",
              borderRadius: "20px",
              width: "100%",
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {findIdInfo.idList.map((id) => (
              <Typography
                key={id}
                p={0.5}
                sx={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: "1.25rem",
                  color: "#037dd6",
                  fontWeight: "bold",
                }}
              >
                {id}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Divider />
        <Grid xs={12} item pt={5} pb={2}>
          <AuthButton type="submit" color="info" onClick={handleClickLogin}>
            로그인 하기
          </AuthButton>
        </Grid>

        <Grid xs={12} item pt={1} pb={2}>
          <AuthButton
            type="submit"
            color="second-info"
            onClick={handleClickFindPass}
          >
            비밀번호 찾기
          </AuthButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindIdPassComplete;
