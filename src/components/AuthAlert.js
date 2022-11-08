import { Modal, Box } from "@mui/material";
import React from "react";

const AuthAlert = (props) => {
  const { onOpen, open, onClose, children } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <Box
        sx={{
          minWidth: "22.5rem",
          minHeight: "11.5rem",
          borderRadius: "12px",
          border: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: 0,
          backgroundColor: "#fff",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default AuthAlert;
