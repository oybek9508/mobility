import { Grid } from "@mui/material";
import AuthSelect from "../AuthSelect";

const TermsDropDown = (props) => {
  const { value, onChange, options, name } = props;

  return (
    <Grid container xs={12}>
      <Grid xs={6} sm={4} lg={3} pb={2}>
        <AuthSelect
          type="text"
          variant="outlined"
          sx={{ width: "100%" }}
          name="date"
          value={value}
          onChange={onChange}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default TermsDropDown;
