import React from "react";
import { Grid, CardMedia } from "@mui/material";
import CheckBox from "./CheckBox";

const AgreementItem = (props) => {
  const { label, value, onClickCheckbox, onClickOpen, showDetail } = props;
  return (
    <Grid
      xs={12}
      container
      display="flex"
      flexDirection="row"
      alignItems="center"
      py={{
        sm: 1,
        xs: 2,
      }}
      sx={{
        height: "2rem",
      }}
    >
      <Grid xs={2} sm={1.5} item>
        <CheckBox value={value} onClick={onClickCheckbox} />
      </Grid>
      <Grid xs={8} sm={9.5} item sx={{ textAlign: "left", pl: 1 }}>
        {label}
      </Grid>
      {showDetail && (
        <Grid
          sm={1}
          item
          sx={{ width: "2rem", display: "flex", justifyContent: "end" }}
        >
          <CardMedia
            src="/assets/images/nft-signup/vector_btn.svg"
            alt="deactivated"
            component="img"
            sx={{
              width: "0.8rem",
              height: "0.8rem",
              zIndex: 3,
            }}
            onClick={onClickOpen}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default AgreementItem;
