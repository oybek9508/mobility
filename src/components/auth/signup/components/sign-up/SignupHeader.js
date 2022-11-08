import React from "react";
import { Box, Typography } from "@mui/material";
import { useIntl, FormattedMessage } from "react-intl";
import LevelDisplay from "./components/LevelDisplay";

const SignupHeader = ({ step }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          fontSize: "1.25rem",
          fontFamily: "Noto Sans",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <FormattedMessage id="signup-header-welcome" />
      </Box>
      <Box
        sx={{
          pt: 1,
          px: 3,
          fontSize: "1rem",
          fontFamily: "Noto Sans",
          fontWeight: "400",
          textAlign: "center",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "1.5",
          letterSpacing: "normal",
        }}
      >
        <FormattedMessage id="signup-header-des" values={{ br: <br /> }} />
      </Box>

      {/* 단계 표시 */}
      <Box display="flex" alignItems="start" pt={3}>
        <LevelDisplay
          number={1}
          active={step === 1}
          line={step === 1}
          check={step === 2}
        >
          {/* <p>본인인증</p> */}
          <p>
            <FormattedMessage
              id="signup-header-step1"
              values={{ br: <br /> }}
            />
          </p>
        </LevelDisplay>
        <LevelDisplay number={2} line={step === 2}>
          <p>
            <FormattedMessage
              id="signup-header-step2"
              values={{ br: <br /> }}
            />
          </p>
        </LevelDisplay>

        <LevelDisplay number={3}>
          <p>
            <FormattedMessage
              id="signup-header-step3"
              values={{ br: <br /> }}
            />
          </p>
        </LevelDisplay>
      </Box>
    </Box>
  );
};

export default SignupHeader;
