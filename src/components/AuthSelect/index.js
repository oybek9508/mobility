import { Box, Typography, Select, MenuItem } from "@mui/material";
import StyledSelectField from "./styeldSelectField";
import { makeStyles } from "@mui/styles";

// options Array
/*
	[
		{value : "v", label : 'label"}
	]
*/

const useStyles = makeStyles((theme) => ({
  menuPaper: {
    maxHeight: 300,
  },
}));

const AuthSelect = ({ ...rest }) => {
  const classes = useStyles();
  const { success, error, type, title, options, placeholder } = rest;

  const titleDisplay = () => {
    if (title.includes("*")) {
      return (
        <p>
          {title.replace("*", "")}
          <span style={{ color: "red" }}>*</span>
        </p>
      );
    }
    return title;
  };

  return (
    <Box display="flex" flexDirection="column">
      {title ? (
        <Typography
          variant="caption"
          pb={1}
          sx={{
            // fontWeight: 'bold',
            fontSize: "14px",
            fontFamily: "Noto Sans",
            color: "#333333",
            fontWeight: "400",
          }}
        >
          {titleDisplay()}
        </Typography>
      ) : (
        <Typography
          variant="caption"
          pb={1}
          sx={{
            // fontWeight: 'bold',
            fontSize: "14px",
            fontFamily: "Noto Sans",
            color: "#333333",
            fontWeight: "400",
            cursor: "default",
          }}
        >
          &nbsp;
        </Typography>
      )}

      <Select
        {...rest}
        input={<StyledSelectField />}
        MenuProps={{ classes: { paper: classes.menuPaper } }}
      >
        <MenuItem value="-1" disabled selected>
          {placeholder}
        </MenuItem>
        {options.map((v) => (
          <MenuItem value={v.value}>{v.label}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AuthSelect;
