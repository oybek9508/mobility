import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Button,
  Box,
  Grid,
  Divider,
  CardMedia,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import AuthButton from "src/components/AuthButton";

import { useRouter } from "next/router";
import useAuth from "src/hooks/useAuth";
import AuthApi from "src/api/auth-api";

const Api = new AuthApi();

const SignupCompleteMetaMask = (props) => {
  const { user } = useAuth();
  const router = useRouter();

  const { address } = useAccount();
  const { connect, isLoading, isSuccess } = useConnect({
    connector: new InjectedConnector(),
  });

  const handleClickNext = () => {
    router.push("/auth/sign-up/complete");
  };

  const updateUser = async () => {
    const payload = {
      meemzAccountId: user.id,
      walletAddress: address,
      cryptocurrencyWalletTypeName: "ETH",
    };
    try {
      await Api.updateWallet(payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function handleConnect() {
      const fetchedWallet = await Api.getWallet();
      if (!fetchedWallet) await updateUser();
      router.push("/auth/sign-up/complete");
    }
    if (isSuccess) handleConnect();
  }, [isSuccess]);

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
        <Grid
          xs={12}
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          pt={5}
        >
          <CardMedia
            src="/assets/images/nft-signup/btn_link.png"
            alt="link"
            component="img"
            sx={{
              width: "4rem",
              height: "4rem",
            }}
          />
          <Typography
            pt={3}
            sx={{
              fontFamily: "NotoSans-Display",
              fontWeight: "bold",
              fontSize: "1.75rem",
            }}
          >
            지갑연결
          </Typography>
          <Typography
            pt={2}
            px={5}
            sx={{
              fontFamily: "NotoSans-Regular",
              fontWeight: "normal",
              fontSize: "1rem",
              textAlign: "center",
              color: "#333333",
            }}
          >
            <p>MEEMZ의 NFT 서비스를 이용하시려면</p>
            <p>지갑 연결이 필요해요.</p>
            <p> 지갑 연결을 진행해주세요.</p>
          </Typography>
        </Grid>
        <Grid xs={12} item pt={6}>
          <Grid xs={12} py={2}>
            <AuthButton color="info" onClick={connect}>
              {!isLoading ? (
                <>
                  <CardMedia
                    src="/assets/images/nft-signup/metamask_logo.png"
                    alt="link"
                    component="img"
                    sx={{
                      width: "33px",
                      height: "29px",
                    }}
                  />
                  <Box pl={2}>MetaMask 연결</Box>
                </>
              ) : (
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "#FFFFFF",
                    }}
                  >
                    연결중...
                  </Box>
                  <Box sx={{ paddingLeft: ".5rem" }}>
                    <CircularProgress color="inherit" size="1rem" />
                  </Box>
                </Stack>
              )}
            </AuthButton>
          </Grid>
          <Grid xs={12} pt={2} pb={3}>
            <AuthButton color="second-info" onClick={handleClickNext}>
              다음에 할게요!
            </AuthButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupCompleteMetaMask;
