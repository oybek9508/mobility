import React from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { Button, Container } from "@mui/material";
import TermsDropDown from "src/components/TermDropDown";
import useTerms from "src/hooks/useTerms";
import { OPERATION_TERM } from "src/libs/terms/config";

const OperationTerms = () => {
  const [terms, options, date, handleVersionChange] = useTerms(OPERATION_TERM);

  return (
    <Container className="terms">
      {/* <TdGolbalStyle /> */}
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
          table: ({ node, ...props }) => {
            return <table border="1" {...props} />;
          },
          tr: ({ node, ...props }) => {
            return <tr style={{ border: "1px solid" }} {...props} />;
          },
          thead: ({ node, ...props }) => {
            return <thead border="1" {...props} />;
          },
          tbody: ({ node, ...props }) => {
            return <tbody border="1" {...props} />;
          },
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {terms}
      </ReactMarkdown>
    </Container>
  );
};
export default OperationTerms;
