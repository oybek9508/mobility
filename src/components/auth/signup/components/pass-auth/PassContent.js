import React from "react";
import { Box, Checkbox } from "@mui/material";
// import { FormattedMessage } from 'react-intl'

const PassContent = (props) => {
  const { isOverFourteen, isChecked, onClickCheckBox } = props;

  return (
    <Box
      sx={{
        fontFamily: "Noto Sans",
      }}
    >
      {isOverFourteen ? (
        <Box>
          <Box
            mt={3}
            sx={{
              borderRadius: "6px",
              backgroundColor: "#fbfbfb",
              border: "solid 1px #f1f1f1",
              minHeight: "130px",
              color: "#333333",
              p: 2,
            }}
          >
            {/* <FormattedMessage id='signup-pass-content-des1' /> */}
            밈즈 가입을 위해서는 본인인증이 필요합니다.
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          <Box
            pt={1}
            pb={2}
            sx={{
              color: "#037dd6",
              fontSize: "14px",
              textIndent: "-10px",
              pl: "10px",
            }}
          >
            {/* <FormattedMessage id='signup-pass-content-des2' /> */}* 만 14세
            미만 고객님께서는 가입 시 보호자(법정 대리인)의 동의가 필요합니다.
          </Box>
          <Box
            sx={{
              borderRadius: "6px",
              backgroundColor: "#fbfbfb",
              border: "solid 1px #f1f1f1",
              minHeight: "130px",
              color: "#333333",
              p: 2,
            }}
          >
            {/* <FormattedMessage
              id="signup-pass-content-des3"
              values={{ br: <br /> }}
            /> */}
            보호자 명의의 휴대폰으로 인증하실 수 있습니다.
            <br />
            (한 보호자 동의로 3개의 밈즈 아이디를 만들 수 있습니다.)
          </Box>
          <Box display="flex" justifyContent="start" alignItems="start" pt={3}>
            <Checkbox sx={{ p: 0, pr: 1 }} onClick={onClickCheckBox} />
            <Box
              sx={{
                color: "#333333",
                fontSize: "14px",
              }}
            >
              {/* <FormattedMessage
                id="signup-pass-content-des4"
                values={{ br: <br /> }}
              /> */}
              만 14세 미만 어린이 회원가입을 위한 보호자 명의 휴대폰 인증 정보
              수집을 동의합니다.
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PassContent;
