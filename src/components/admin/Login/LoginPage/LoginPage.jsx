import { Button, TextField } from "@mui/material";
import "./LoginPage.scss";
import Checkbox from "../../commons/Checkbox/Checkbox";

export default function LoginPage() {
  return (
    <div className="page-login">
      <img className="logo" src="/src/assets/logo.png" alt="logo" />
      <h1>Adminstrative Login</h1>
      <p className="main-label">
        Please fill your detail to access your account
      </p>
      <div>
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
      </div>
      <div className="meta">
        <div className="meta-remember-me">
          <Checkbox label={"Remember me"} />
        </div>
        <a href="#" className="btn-forgot-password">Forgot Password?</a>
      </div>

      <Button className="btn-login" variant="contained">Login</Button>
    </div>
  );
}
