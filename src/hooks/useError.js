import { useState, useEffect } from "react";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";

const useError = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!error || error === "") return;
    // 에러메시지가 표출된후 3초후에 제거
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    // eslint-disable-next-line consistent-return
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [error]);

  const ErrorMessageBox = ({ sx }) => (
    <Box sx={{ ...sx, fontSize: 12, color: red[500], fontFamily: "Noto Sans" }}>
      {error}
    </Box>
  );

  return [error, setError, ErrorMessageBox];
};

export default useError;
