import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import MinorPolicyTermMd from "src/libs/terms/minorTerm";
import { Button, Container } from "@mui/material";

const MinorPolicyTerms = () => {
  return (
    <Container>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => {
            return <p style={{ wordBreak: "keep-all" }} {...props} />;
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {MinorPolicyTermMd}
      </ReactMarkdown>
    </Container>
  );
};
export default MinorPolicyTerms;
