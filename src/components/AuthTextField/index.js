import StyledTextField from "./StyledTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  Container,
  Box,
  FormHelperText,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";

const AuthTextField = ({ ...rest }) => {
  const {
    value,
    error,
    touched,
    type,
    title,
    name,
    resend,
    showAuthCheckButton,
    handleClickButton,
    disabled,
    isStartTimer,
    isExpired,
    isCorrectAuthNum,
  } = rest;
  // 비밀번호에 사용
  const [showPwd, setShowPwd] = useState(false);

  const success = touched && !error;
  const isDisableSendBtn =
    (resend && isStartTimer && !isExpired) || error || value.trim().length === 0
      ? true
      : false;
  const isDisableCheckAuthBtn =
    value.trim().length === 0 || isCorrectAuthNum ? true : false;

  const titleDisplay = () => {
    if (title.includes("*")) {
      return (
        <p>
          {title.replace("*", "")}
          <span style={{ color: "red" }}>*</span>
        </p>
      );
    }
    return title;
  };

  return (
    <Box display="flex" flexDirection="column">
      {title ? (
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
          {titleDisplay()}
        </Typography>
      ) : (
        // <Box pt={3.8}></Box>
        <Typography
          variant="caption"
          pb={1}
          sx={{
            // fontWeight: 'bold',
            fontSize: "14px",
            fontFamily: "Noto Sans",
            color: "#333333",
            fontWeight: "400",
            cursor: "default",
          }}
        >
          &nbsp;
        </Typography>
      )}
      {type === "password" ? (
        <StyledTextField
          {...rest}
          type={showPwd ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ zIndex: 999 }}>
                {type === "password" && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd((showPwd) => !showPwd)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    sx={{ left: !success && !error ? -20 : -50 }}
                  >
                    {showPwd ? (
                      <VisibilityIcon
                        sx={{
                          fontSize: 24,
                          color: "#a1a1a1",
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        sx={{
                          fontSize: 24,
                          color: "#a1a1a1",
                        }}
                      />
                    )}
                  </IconButton>
                )}
                {success && (
                  <CheckIcon
                    sx={{
                      fontSize: 24,
                      color: "#037dd6",
                      marginLeft: -5,
                    }}
                  />
                )}
                {error && (
                  <ReportProblemIcon
                    sx={{
                      fontSize: 24,
                      color: "#fa375a",
                      marginLeft: -5,
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: false }}
        />
      ) : (
        <>
          {!showAuthCheckButton && (
            <StyledTextField
              {...rest}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ zIndex: 999 }}>
                    {type === "password" && (
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={() =>
                        //   setShowPwd((showPwd) => ({
                        //     ...showPwd,
                        //     password: !showPwd.password,
                        //   }))
                        // }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        sx={{ left: !success && !error ? -20 : -50 }}
                      >
                        <VisibilityIcon
                          sx={{
                            fontSize: 24,
                            color: "#a1a1a1",
                          }}
                        />
                      </IconButton>
                    )}
                    {success && (
                      <CheckIcon
                        sx={{
                          fontSize: 24,
                          color: "#037dd6",
                          marginLeft: -5,
                        }}
                      />
                    )}
                    {error && (
                      <ReportProblemIcon
                        sx={{
                          fontSize: 24,
                          color: "#fa375a",
                          marginLeft: -5,
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: false }}
            />
          )}
        </>
      )}
      {/* 아이디/비밀번호 찾기 - 이메일 인증번호 전송 field */}
      {name === "email" && showAuthCheckButton && (
        <StyledTextField
          {...rest}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ zIndex: 999 }}>
                <IconButton
                  sx={{
                    color: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => handleClickButton()}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  disabled={isDisableSendBtn ? true : false}
                >
                  <SendAuthNumButton
                    resend={resend}
                    isDisableSendBtn={isDisableSendBtn}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: false }}
        />
      )}
      {/* 아이디/비밀번호 찾기 - 인증번호 입력 field */}
      {name === "authNum" && showAuthCheckButton && (
        <StyledTextField
          {...rest}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ zIndex: 999 }}>
                <IconButton
                  sx={{
                    color: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={() => handleClickButton()}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  disabled={isDisableCheckAuthBtn}
                >
                  {(!disabled || isCorrectAuthNum) && (
                    <CheckAuthNumButton
                      isDisableCheckAuthBtn={isDisableCheckAuthBtn}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: false }}
        />
      )}
      {!error?.formatMessageId && error && (
        <Box pl={1}>
          <Typography
            variant="caption"
            pb={1}
            sx={{
              // fontWeight: 'bold',
              fontSize: "14px",
              color: "#fa375a",
              fontWeight: "400",
              cursor: "default",
            }}
          >
            {error}
          </Typography>
        </Box>
      )}
      {error?.formatMessageId && (
        <Box pl={1}>
          <Typography
            variant="caption"
            pb={1}
            sx={{
              // fontWeight: 'bold',
              fontSize: "14px",
              color: "#fa375a",
              fontWeight: "400",
              cursor: "default",
            }}
          >
            <FormattedMessage id={error?.formatMessageId} />
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuthTextField;

const SendAuthNumButton = ({ resend, isDisableSendBtn }) => {
  return (
    <Box
      sx={{
        background: isDisableSendBtn ? "rgba(0, 0, 0, 0.12)" : "#0288d1",
        fontSize: 14,
        color: isDisableSendBtn ? "rgba(0, 0, 0, 0.26)" : "#ffffff",
        py: 1,
        px: 2,
        borderRadius: 1,
        fontFamily: "NotoSansKR-Regular",
      }}
    >
      {resend ? (
        <FormattedMessage id="btn_resend_auth" />
      ) : (
        <FormattedMessage id="btn_send_auth" />
      )}
    </Box>
  );
};
const CheckAuthNumButton = ({ isDisableCheckAuthBtn }) => {
  return (
    <Box
      sx={{
        background: isDisableCheckAuthBtn ? "rgba(0, 0, 0, 0.12)" : "#0288d1",
        fontSize: 14,
        color: isDisableCheckAuthBtn ? "rgba(0, 0, 0, 0.26)" : "#ffffff",
        py: 1,
        px: 2,
        borderRadius: 1,
        fontFamily: "NotoSansKR-Regular",
      }}
    >
      <FormattedMessage id="btn_ok" />
    </Box>
  );
};
