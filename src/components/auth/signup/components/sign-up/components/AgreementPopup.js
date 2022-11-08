import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button as MuiButton, Modal } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Title from "src/components/signup/Title";

import TermsDropDown from "src/components/TermDropDown";

import useTerms from "src/hooks/useTerms";
import {
  MARKETING_TERM,
  SERVICE_TERM,
  OPERATION_TERM,
  PRIVACY_TERM,
  MINOR_TERM,
  DELIVERY_TERM,
} from "src/libs/terms/config";

// import { createGlobalStyle } from "styled-components";

// const TdGolbalStyle = createGlobalStyle`
// 	td {
// 		border : 1px solid !important;
// 		text-align : center;
// 	}
// `;

const CloseButton = styled(MuiButton)({
  border: "none",
  boxShadow: "unset",
  padding: 25,

  background:
    "url(/assets/images/nft-signup/close.svg) no-repeat center center",
  width: "60px",
  minWidth: "55px",
  // position: 'absolute',
  backgroundSize: "contain",
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
    boxShadow: "unset",

    maxWidth: 1080,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    border: "unset",
    "@media (max-width: 768px)": {
      margin: 0,
      width: "100%",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Popup = (props) => {
  const {
    children,
    open,
    onClose,
    title,
    titleFontSize,
    options,
    date,
    onChange,
  } = props;
  console.log(`open`, open);
  return (
    <Modal
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      // maxWidth='lg'
      fullWidth
      onBackdropClick={() => {
        // console.log('here')
        onClose();
      }}
      sx={{ boder: "none" }}
    >
      <Box
        className="terms"
        dividers
        sx={{ overflowY: "hidden", borderTop: "none", borderBottom: "none" }}
      >
        <Box
          sx={{
            // py: 8,
            overflow: "hidden",
            // background:
            // 	'url(/assets/images/signup/join_container_lg.png) no-repeat 100% 100%',
            // backgroundSize: '100% 100%',
            maxHeight: 630,
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "95%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              px: { xs: 2, sm: 2, md: 8, lg: 8 },
              pt: 3,
              pb: 12,
              //   pr: 1,
              //   mr: 7,
              overflowY: "hidden",
              margin: "auto",
              // maxHeight: 640,
              // maxWidth: 950,
              width: { xs: "100%" },
              maxWidth: { xs: "100vw", sm: "50vw", lg: "50vw" },
              background: "#ffffff",
              // boxShadow: 'inset 0px 0px 13px #D7CAD7',
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              // '@media (min-height: 401px) and (max-height: 600px)': {
              // 	maxHeight: '70vh',
              // 	maxWidth: '65%',
              // },
              // '@media (min-height: 601px) and (max-height: 850px)': {
              // 	maxHeight: '70vh',
              // 	maxWidth: '70%',
              // },
              // '@media (min-height: 851px)': {
              // 	maxHeight: '70vh',
              // 	maxWidth: '70%',
              // },
            }}
          >
            <Box p={1} display="flex" justifyContent="end">
              <CloseButton onClick={onClose} />
            </Box>
            <Box
              sx={{
                overflow: "auto",
                // pr: 8,
                pb: 10,
                "@media (max-height: 400px)": {
                  maxHeight: 200,
                },
                "@media (min-height: 401px) and (max-height: 600px)": {
                  maxHeight: 350,
                },
                "@media (min-height: 601px) and (max-height: 850px)": {
                  maxHeight: 460,
                },
                "@media (min-height: 851px)": {
                  maxHeight: 580,
                },
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#fff",
                  borderRadius: 40,
                },
              }}
            >
              <TermsDropDown
                value={date}
                onChange={onChange}
                options={options}
              />
              <Title
                text={title}
                color="#000"
                minHeight="10vh"
                fontSize={titleFontSize}
              />
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => {
                    return <p style={{ wordBreak: "keep-all" }} {...props} />;
                  },
                  table: ({ node, ...props }) => {
                    return <table border="1" {...props} />;
                  },
                  h2: ({ node, ...props }) => {
                    return (
                      <h2
                        style={{
                          fontSize: "24px",
                          textAlign: "center",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        {...props}
                      />
                    );
                  },
                  ol: ({ node, ...props }) => {
                    return (
                      <ol
                        style={{
                          listStyleType: "decimal",
                          paddingLeft: "16px",
                          paddingRight: "16px",
                        }}
                        {...props}
                      />
                    );
                  },
                }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {children}
              </ReactMarkdown>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const MinorPolicyPopup = (props) => {
  const [terms, options, date, handleVersionChange] = useTerms(MINOR_TERM);
  return (
    <Popup
      {...props}
      title="14세 미만 아동 개인정보처리 약관"
      options={options}
      date={date}
      onChange={handleVersionChange}
      titleFontSize={30}
    >
      {terms}
    </Popup>
  );
};

const ServicePolicyPopup = (props) => {
  const [terms, options, date, handleVersionChange] = useTerms(SERVICE_TERM);
  return (
    <Popup
      {...props}
      title="서비스 이용약관"
      options={options}
      date={date}
      onChange={handleVersionChange}
      titleFontSize={28}
    >
      {terms}
    </Popup>
  );
};
const PrivacyPolicyPopup = (props) => {
  const [terms, options, date, handleVersionChange] = useTerms(PRIVACY_TERM);
  return (
    <Popup
      {...props}
      title="개인정보처리방침 이용약관"
      options={options}
      date={date}
      onChange={handleVersionChange}
      titleFontSize={26}
    >
      {terms}
    </Popup>
  );
};
const MarketingPolicyPopup = (props) => {
  const [terms, options, date, handleVersionChange] = useTerms(OPERATION_TERM);
  return (
    <>
      {/* <TdGolbalStyle /> */}
      <Popup
        {...props}
        title="마케팅 정보수신 이용약관"
        options={options}
        date={date}
        onChange={handleVersionChange}
        titleFontSize={28}
      >
        {terms}
      </Popup>
    </>
  );
};

export {
  ServicePolicyPopup,
  PrivacyPolicyPopup,
  MarketingPolicyPopup,
  MinorPolicyPopup,
};
