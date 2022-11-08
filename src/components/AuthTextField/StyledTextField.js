import { styled } from "@mui/styles";
import { TextField as MuiTextField } from "@mui/material";
const StyledTextField = styled(MuiTextField)({
  // 기본 TextField 의 형태
  "& .MuiInputBase-root": {
    borderRadius: 6,
    backgroundColor: "#fbfbfb",
    height: "48px",
    border: "1px solid #f1f1f1",
    padding: "1px 8px 8px 8px",
    fontFamily: "Noto Sans",
  },
  // HelperText 부분
  "& p.MuiFormHelperText-root": {
    fontSize: 16,
    color: "#5F71FF",
    fontWeight: 500,
    "&.Mui-error": {
      color: "#f44336",
    },
  },
  // Label 일반 상태
  "& label": {
    fontFamily: "Noto Sans",
    fontSize: 16,
    color: "#808080",
    fontWeight: "300",
    top: -5.5,
    left: 10,
  },
  // Label 포커스가 있을때
  "& label.Mui-focused": {
    // color: '#ff9000',
    fontSize: 16,
    visibility: "hidden",
  },
  // Label 에러일때
  "& label.Mui-error": {
    color: "#f44336",
    fontSize: 16,
  },
  // Label 에러이면서 포커스가 있을때
  "& label.Mui-error.Mui-focused": {
    color: "#f44336",
    fontSize: 16,
    top: -3,
  },
  "& legend": {
    display: "none",
  },
  // Input 안에 내용이 있을때
  "& label.MuiFormLabel-filled": {
    visibility: "hidden",
  },
  // variant 값이 outlined 인 경우
  "& .MuiOutlinedInput-root": {
    height: "48px",
    borderColor: "transparent",
    "& fieldset": {
      borderColor: "#f1f1f1",
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: "#fbfbfb",
    },
    "& input": {
      fontSize: 16,
      zIndex: 99,
      // padding: '33px 0 35px',
      // padding: '8px 8px 8px 16px',
      // paddingLeft: 28,
    },
    "& .MuiAutocomplete-inputRoot": {
      backgroundColor: "white !important",
    },
    "&:hover fieldset": {
      borderColor: "#037dd6 !important",
    },
    "&:-webkit-autofill input": {
      boxShadow: "0 0 0 1000px white inset",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#037dd6 !important",
      backgroundColor: "#f6fbff !important",
    },
    "&.Mui-focused input": {
      color: "#037dd6 !important",
      zIndex: 99,
    },

    "&.Mui-error fieldset": {
      backgroundColor: "#fff0f2 !important",
      border: "1px solid #fa375a !important",
    },
    "&.Mui-error input": {
      color: "#fa375a",
      zIndex: 99,
    },
  },
});
export default StyledTextField;
