import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import PrivacyTermMd from "src/libs/terms/privacyTerm";
import PrivacyTermMd_ver2 from "src/libs/terms_ver2/privacyTerm";
import { Button, Container, Box, Grid } from "@mui/material";
import TermsDropDown from "src/components/TermDropDown";
import useTerms from "src/hooks/useTerms";
import { PRIVACY_TERM } from "src/libs/terms/config";

const PrivacyTerms = () => {
  // console.log(`PrivacyTermMd`, PrivacyTermMd)
  const [terms, options, date, handleVersionChange] = useTerms(PRIVACY_TERM);

  return (
    <Container className="terms">
      <TermsDropDown
        value={date}
        onChange={handleVersionChange}
        options={options}
      />

      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => {
            return <p style={{ wordBreak: "keep-all" }} {...props} />;
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {terms}
      </ReactMarkdown>
    </Container>
  );
};
export default PrivacyTerms;
