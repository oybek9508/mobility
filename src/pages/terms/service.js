import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import ServiceTermMd from "src/libs/terms/serviceTerm";
import { Button, Container } from "@mui/material";
import TermsDropDown from "src/components/TermDropDown";
import useTerms from "src/hooks/useTerms";
import { SERVICE_TERM } from "src/libs/terms/config";

const ServiceTerms = () => {
  const [terms, options, date, handleVersionChange] = useTerms(SERVICE_TERM);
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
            return (
              <p
                style={{
                  wordBreak: "keep-all",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                {...props}
              />
            );
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
                  paddingLeft: "32px",
                  paddingRight: "16px",
                }}
                {...props}
              />
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
        // rehypePlugins={[rehypeRaw]}
      >
        {terms}
      </ReactMarkdown>
    </Container>
  );
};
export default ServiceTerms;
