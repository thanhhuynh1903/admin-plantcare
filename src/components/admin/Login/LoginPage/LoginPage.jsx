import { Button, TextField } from "@mui/material";
import "./LoginPage.scss";
import Checkbox from "../../commons/Checkbox/Checkbox";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import TextFieldPassword from "../../commons/TextFieldPassword/TextFieldPassword";
import { setPageHeadTitle } from "../../../utils/util_web";
import { useEffect } from "react";

export default function LoginPage() {

  useEffect(() => {
    setPageHeadTitle("Login");
  }, []);

  return (
    <div className="page-login">
      <img className="logo" src="/src/assets/logo.png" alt="logo" />
      <h1>Adminstrative Login</h1>
      <p className="main-label">
        Please fill your detail to access your account
      </p>
      <div>
        <TextFieldBasic className="input-field" placeholder="Your email"  />
      </div>
      <div>
        <TextFieldPassword className="input-field" placeholder="Your password" />
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
