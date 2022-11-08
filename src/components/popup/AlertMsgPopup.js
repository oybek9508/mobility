import AuthAlert from "src/components/AuthAlert";
import AuthButton from "src/components/AuthButton";
import { Box, Typography } from "@mui/material";
import { useIntl, FormattedMessage } from "react-intl";

const AlertMsgPopup = ({ open, handleClose, message }) => {
  return (
    <AuthAlert open={open} onClose={handleClose}>
      <Box
        p={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          pt={3}
          sx={{
            color: "#000",
            width: "19rem",
            textAlign: "center",
            fontFamily: "NotoSans-Regular",
          }}
        >
          {message.split("\n").map((t, i) => {
            return <Typography key={i}>{t}</Typography>;
          })}
        </Box>
        <Box pt={3} pb={2} sx={{ width: "10rem" }}>
          <AuthButton onClick={handleClose}>
            <FormattedMessage id="popup_confirm" />
          </AuthButton>
        </Box>
      </Box>
    </AuthAlert>
  );
};

export default AlertMsgPopup;
