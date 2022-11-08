import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cartverse from "/src/components/sections/Cartverse";
import Event from "/src/components/sections/Event";
import Designs from "/src/components/sections/Designs";
import Customize from "/src/components/sections/Customize";
import NftMarket from "/src/components/sections/NftMarket";
import Tokens from "/src/components/sections/Tokens";
import Roadmap from "/src/components/sections/Roadmap";
import Footer from "src/components/Footer";
import Layout from "src/components/Layout";

import Header from "/src/components/Header";
import Intro from "/src/components/Intro";
import Dim from "/src/components/Dim";
import { Grid } from "@mui/material";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { isDesktop } from "react-device-detect";

const Home = () => {
  const [intro, setIntro] = useState(true);
  const [dim, setDim] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIntro(isDesktop);
    setDim(isDesktop);
  }, []);

  return (
    <>
      {intro ? (
        <Intro onOff={() => setIntro(false)} />
      ) : (
        <Layout isFullWidth={true}>
          <Grid sx={{ backgroundColor: "#1c1b18", overflowX: "hidden" }}>
            {dim && <Dim onOff={() => setDim(false)} />}
            <Header />
            <Cartverse />
            <Event />
            <Designs />
            <Customize />
            <NftMarket />
            <Tokens />
            <Roadmap />
          </Grid>
        </Layout>
      )}
    </>
  );
};

export default Home;
