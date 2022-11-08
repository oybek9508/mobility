import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AuthButton from "src/components/AuthButton";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import useEvent from "src/hooks/useEvent";
import useAuth from "src/hooks/useAuth";
import useSignup from "src/hooks/useSignup";
import AlertMsgPopup from "./AlertMsgPopup";
import { useRouter } from "next/router";
import { Span } from "../Typography";
import { useIntl, FormattedMessage } from "react-intl";

const StaffAuthPopup = ({ open, setOpen, eventType, round }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { signupUser } = useSignup();
  const { putEventUser, completeStamp } = useEvent();
  const [num, setNum] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState("");
  const intl = useIntl();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setNum("");
    setOpen(false);
  };
  const handleNumChange = (event) => {
    const limit = 4;
    setNum(event.target.value.slice(0, limit));
  };
  const onlyNumbers = (str) => {
    return /^[0-9]+$/.test(str);
  };
  // 직원 인증하기
  const startStaffAuth = () => {
    switch (eventType) {
      case "member": // 신규 가입 Event
        memberStaffAuth();
        break;
      case "stamp": // 도장 찍기 Event
        stampStaffAuth();
        break;
      default:
        break;
    }
  };

  const memberStaffAuth = async () => {
    let moonCode = "";
    const message = intl.formatMessage({ id: "popup_staff_auth" });
    if (user?.moonCode) {
      moonCode = user.moonCode;
    } else {
      moonCode = signupUser.moonCode;
    }
    const res = await putEventUser({
      moonCode: moonCode,
      confirmCode: num,
    });
    if (res?.data) {
      if (res.data.couponYn === "Y") {
        // 인증 성공인 경우
        setAlertType("Success");
        setMessage(message);
        setOpenAlert(true);
      } else {
        showErrorPopup();
      }
    } else {
      showErrorPopup();
    }
  };

  const stampStaffAuth = async () => {
    const message = intl.formatMessage({ id: "popup_staff_auth" });
    const res = await completeStamp({
      moonCode: user.moonCode,
      confirmCode: num,
      round: round,
    });
    if (res?.data) {
      if (res.data.couponYn === "Y") {
        // 인증 성공인 경우
        setAlertType("Success");
        setMessage(message);
        setOpenAlert(true);
      } else {
        showErrorPopup();
      }
    } else {
      showErrorPopup();
    }
  };

  const showErrorPopup = () => {
    const message = intl.formatMessage({ id: "popup_staff_auth_fail" });
    // 인증 실패인 경우
    setAlertType("Error");
    setMessage(message);
    setOpenAlert(true);
  };

  // 확인 버튼 클릭
  const handleCloseAlertMsg = () => {
    setOpenAlert(false);
    if (alertType === "Success") {
      handleClose();
      if (router.pathname === "/") {
        router.reload("/");
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (onlyNumbers(num) && num.length === 4) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [num]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box p={3}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box>
            {eventType === "member" && (
              <Typography gutterBottom>
                <FormattedMessage id="popup_staff_message1" />
              </Typography>
            )}
            {eventType === "stamp" && (
              <Typography gutterBottom>
                <FormattedMessage id="popup_staff_message2" />
              </Typography>
            )}
            <Typography gutterBottom>
              <FormattedMessage id="popup_staff_message3" />
            </Typography>
          </Box>
          <Box my={2}>
            <Typography sx={{ fontSize: 14 }}>
              <FormattedMessage id="popup_staff_message4" />
            </Typography>
          </Box>
          <Typography sx={{ fontFamily: "NotoSansKR-Bold" }}>
            <FormattedMessage id="popup_staff_message5" />
          </Typography>
          <Box sx={{ mt: 1, mb: 3 }}>
            <TextField
              required
              autoComplete="off"
              sx={{ width: "100%" }}
              type="text"
              name="num"
              value={num}
              onChange={handleNumChange}
            />
          </Box>
          <AuthButton
            disabled={activeBtn ? false : true}
            onClick={() => startStaffAuth()}
          >
            <FormattedMessage id="popup_staff_message6" />
          </AuthButton>
        </DialogContent>
      </Dialog>
      <AlertMsgPopup
        open={openAlert}
        handleClose={handleCloseAlertMsg}
        message={message}
      />
    </>
  );
};

export default StaffAuthPopup;
