import Layout from "src/components/Layout";
import { useRouter } from "next/router";
import useAuth from "src/hooks/useAuth";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Span } from "src/components/Typography";
import { useIntl, FormattedMessage } from "react-intl";

const MyInfo = () => {
  const router = useRouter();
  const { user, provider } = useAuth();
  const intl = useIntl();

  const phoneNumberAutoFormat = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, "");
    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
    if (number.length < 11)
      return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
    return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  // 이름 마스킹 처리
  const maskingName = (name) => {
    const nameLength = name.length;
    if (nameLength < 3) {
      const maskedName = name.replace(/(?<=.{1})./gi, "*");
      return maskedName;
    } else {
      const maskedName = [...name].map((ch, i) => {
        if (i === 0 || i === nameLength - 1) return ch;
        return "*";
      });
      return maskedName;
    }
  };
  // 휴대폰 마스킹 처리
  const maskingPhoneNo = (phoneNo) => {
    const phoneNumber = phoneNumberAutoFormat(phoneNo);
    const phoneArray = phoneNumber.match(/\d{3}-\d{3,4}-\d{4}/gi);
    if (/-[0-9]{3}-/.test(phoneArray)) {
      // 000-00*-****
      const maskedPhoneNo = [...phoneNumber]
        .map((ch, i) => {
          if (ch !== "-" && i > 5) return "*";
          return ch;
        })
        .join("");
      return maskedPhoneNo;
    } else if (/-[0-9]{4}-/.test(phoneArray)) {
      // 000-00**-****
      const maskedPhoneNo = [...phoneNumber]
        .map((ch, i) => {
          if (ch !== "-" && i > 5) return "*";
          return ch;
        })
        .join("");
      return maskedPhoneNo;
    }
    return phoneNumber;
  };
  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        borderRadius: 5,
        px: { xs: 2, sm: 4, md: 10, lg: 10 },
        pt: { xs: 3, sm: 3, md: 5, lg: 5 },
        pb: { xs: 6, sm: 6, md: 10, lg: 10 },
        fontFamily: "GmarketSansTTFMedium",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{
            width: "80px",
            boxShadow: "none",
            borderRadius: 2,
            border: `1px solid #fe5726`,
            ":hover": {
              border: `1px solid #fe5726`,
              background: `linear-gradient(to top, #fd1b83, #fe5726)`,
              "& p": {
                color: "#fff",
                WebkitTextFillColor: `#fff`,
              },
            },
          }}
          onClick={() => router.push("/me/user-info/edit/check-user")}
        >
          <Typography
            sx={{
              background: `linear-gradient(to top, #fd1b83, #fe5726)`,
              WebkitBackgroundClip: `text`,
              WebkitTextFillColor: `transparent`,
              fontFamily: "GmarketSansTTFMedium",
              textTransform: "none",
            }}
          >
            <FormattedMessage id="btn-edit" />
          </Typography>
        </Button>
      </Box>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-id" />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {user?.id || "-"}
          {provider === "FACEBOOK" && (
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/assets/images/icons/pngwing.png"
                width={18}
                height={18}
              />
              <Span sx={{ fontSize: 14, ml: 1 }}>
                {" "}
                <FormattedMessage id="link_facebook" />
              </Span>
            </Box>
          )}
          {provider === "KAKAO" && (
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/assets/images/icons/kakaotalk.png"
                width={18}
                height={18}
              />
              <Span sx={{ fontSize: 14, ml: 1 }}>
                <FormattedMessage id="link_kakao" />
              </Span>
            </Box>
          )}
          {provider === "NAVER" && (
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/assets/images/icons/naver.png"
                width={18}
                height={18}
              />
              <Span sx={{ fontSize: 14, ml: 1 }}>
                <FormattedMessage id="link_naver" />
              </Span>
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-name" />
        </Grid>
        <Grid item xs={12} md={9}>
          {(user?.userName && maskingName(user?.userName)) || "-"}
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-email" />
        </Grid>
        <Grid item xs={12} md={9}>
          {user?.emailAddress || "-"}
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-nickname" />
        </Grid>
        <Grid item xs={12} md={9}>
          {user?.nickname || "-"}
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-phoneNo" />
        </Grid>
        <Grid item xs={12} md={9}>
          {(user?.phoneNo && maskingPhoneNo(user?.phoneNo)) || "-"}
        </Grid>
      </Grid>
      <Grid container my={1}>
        <Grid item xs={12} md={3}>
          <FormattedMessage id="title-birthDay" />
        </Grid>
        <Grid item xs={12} md={9}>
          {user?.birthDay || "-"}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyInfo;
