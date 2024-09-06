import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const TextFieldPassword = ({
  placeholder = "Enter password",
  sx = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      className="common-text-field-password"
      id="outlined-password-input"
      label="Password"
      variant="outlined"
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      sx={{ width: "100%", ...sx }} // Example of applying styles
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props} // Pass any additional props
    />
  );
};

export default TextFieldPassword;
