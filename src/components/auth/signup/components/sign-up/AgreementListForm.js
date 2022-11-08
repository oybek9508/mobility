import React, { useMemo, useState, useEffect } from "react";
import { Button, Box, Grid, Divider, CardMedia } from "@mui/material";
import { useIntl, FormattedMessage } from "react-intl";
import CheckBox from "./components/CheckBox";
import AgreementItem from "./components/AgreementItem";
import useSignup from "src/hooks/useSignup";

const AgreementListForm = (props) => {
  const { onOpenPopup } = props;
  const [all, setAll] = useState(false);
  const { terms, setTermsValue, setAllTerms } = useSignup();

  const onClickAllAgree = () => {
    const v = !all;
    setAllTerms(v);
    setAll(v);
  };

  useEffect(() => {
    const everyAll = Object.values(terms).every((x) => x);
    if (!everyAll) setAll(false);
  }, [terms]);

  return (
    <Box py={3}>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            borderRadius: "6px",
            backgroundColor: "#fbfbfb",
            border: "solid 1px #f1f1f1",
            minHeight: "64px",
            color: "#333333",
            p: 2,
            fontSize: "1rem",
            fontFamily: "Noto Sans",
            fontWeight: "bold",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <CheckBox onClick={onClickAllAgree} value={all} />
          </Box>
          <Box sx={{ flexGrow: 3, textAlign: "left", pl: 1 }}>
            <FormattedMessage
              id="signup-agreement-all"
              values={{ br: <br /> }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
        <Box pt={2} pl={2} pb={2}>
          <Grid
            display="flex"
            justifyContent="start"
            flexDirection="column"
            sx={{ gap: 1 }}
          >
            <AgreementItem
              label={
                <FormattedMessage
                  id="signup-agreement-overfourteen"
                  values={{ br: <br /> }}
                />
              }
              value={terms.isOverFourteen}
              onClickCheckbox={() =>
                setTermsValue("isOverFourteen", !terms.isOverFourteen)
              }
              showDetail={false}
            />
            <AgreementItem
              label={
                <FormattedMessage
                  id="signup-agreement-servicePolicy"
                  values={{ br: <br /> }}
                />
              }
              value={terms.servicePolicy}
              onClickCheckbox={() =>
                setTermsValue("servicePolicy", !terms.servicePolicy)
              }
              onClickOpen={() => onOpenPopup("servicePolicy")}
              showDetail={true}
            />
            <AgreementItem
              label={
                <FormattedMessage
                  id="signup-agreement-privacyPolicy"
                  values={{ br: <br /> }}
                />
              }
              value={terms.privacyPolicy}
              onClickCheckbox={() =>
                setTermsValue("privacyPolicy", !terms.privacyPolicy)
              }
              onClickOpen={() => onOpenPopup("privacyPolicy")}
              showDetail={true}
            />
            <AgreementItem
              label={
                <FormattedMessage
                  id="signup-agreement-marketingPolicy"
                  values={{ br: <br /> }}
                />
              }
              value={terms.marketingPolicy}
              onClickCheckbox={() =>
                setTermsValue("marketingPolicy", !terms.marketingPolicy)
              }
              onClickOpen={() => onOpenPopup("marketingPolicy")}
              showDetail={true}
            />
            <AgreementItem
              label={
                <FormattedMessage
                  id="signup-agreement-nightNotiAgree"
                  values={{ br: <br /> }}
                />
              }
              value={terms.nightNotiAgree}
              onClickCheckbox={() =>
                setTermsValue("nightNotiAgree", !terms.nightNotiAgree)
              }
              // showDetail={true}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AgreementListForm;
