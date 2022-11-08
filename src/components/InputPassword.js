import { useState, useEffect, useRef } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StyledTextField from "./AuthTextField/StyledTextField";

const InputPassword = (props) => {
  const { variant, placeholder, name, sx, value, error, onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledTextField
      type={showPassword ? `text` : `password`}
      variant={variant}
      placeholder={placeholder}
      name={name}
      sx={sx}
      value={value}
      error={error}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ zIndex: 999 }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
              sx={{ left: -20 }}
            >
              {showPassword ? (
                <VisibilityIcon
                  sx={{
                    fontSize: 24,
                    color: "#a1a1a1",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  sx={{
                    fontSize: 24,
                    color: "#a1a1a1",
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputPassword;
