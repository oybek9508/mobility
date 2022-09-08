import React from "react";
import Section1 from "./cartverse/Cartverse";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";
import Section5 from "./section5/Section5";
import Section6 from "./section6/Section6";
import Section7 from "./section7/Section7";
import Section8 from "./section8/Section8";

import "./main.css";
import Header from "../components/Header";

function LandingHome() {
  return (
    <div style={{ backgroundColor: "#1c1b18", overflowX: "hidden" }}>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
    </div>
  );
}

export default LandingHome;
