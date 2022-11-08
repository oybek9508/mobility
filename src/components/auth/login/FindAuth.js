import { Button, Grid } from "@mui/material";
import React from "react";
import { useRouter } from "next/Router";
import Checkbox from "@mui/material/Checkbox";
import FlexBox from "src/components/FlexBox";
import { H6 } from "src/components/Typography";
import { useIntl, FormattedMessage } from "react-intl";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FindAuth = ({ isRememberId, setIsRememberId }) => {
  const router = useRouter();
  const handleIsRememberIdChecked = () => {
    setIsRememberId(!isRememberId);
  };

  const handleFindLink = (path) => {
    router.push(path);
  };
  return (
    <Grid container mt={3} fullWidth>
      <FlexBox justify="space-between" width="100%">
        <FlexBox>
          <Checkbox
            disableRipple
            sx={{ p: 0 }}
            checked={isRememberId}
            onClick={handleIsRememberIdChecked}
          />
          <Button
            variant="text"
            sx={{ color: "#888888", padding: 0, ml: 1 }}
            checked={isRememberId}
            onClick={handleIsRememberIdChecked}
          >
            <FormattedMessage id="nft-login-remember-id" />
          </Button>
        </FlexBox>
        <FlexBox>
          <Button
            variant="text"
            sx={{ color: "#888888", padding: 0 }}
            onClick={() => handleFindLink("/auth/find/id")}
          >
            <FormattedMessage id="nft-login-form-search-id" />
          </Button>
          <H6 sx={{ mx: 1, fontWeight: "normal" }}>|</H6>
          <Button
            variant="text"
            sx={{ color: "#888888", padding: 0 }}
            onClick={() => handleFindLink("/auth/find/pwd")}
          >
            <FormattedMessage id="nft-login-form-search-pwd" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Grid>
  );
};

export default FindAuth;
