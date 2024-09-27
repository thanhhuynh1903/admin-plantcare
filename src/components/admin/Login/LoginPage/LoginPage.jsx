import { Button, TextField } from "@mui/material";
import "./LoginPage.scss";
import Checkbox from "../../commons/Checkbox/Checkbox";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import TextFieldPassword from "../../commons/TextFieldPassword/TextFieldPassword";
import { setPageHeadTitle } from "../../../utils/util_web";
import { useEffect, useState } from "react";
import { requestLoginAPI } from "./LoginPage.prop";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

    const login = async () => {
    setProcessing(true);
    try {
      await requestLoginAPI(email, password);
    } catch (err) {
      console.error(err);
    }
    setProcessing(false);
  };

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
        <TextFieldBasic
          className="input-field"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextFieldPassword
          className="input-field"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="meta">
        <div className="meta-remember-me">
          <Checkbox label={"Remember me"} selectedColor={"#FF0000"} onChange={(e) => setRememberMe(e.target.checked)} />
        </div>
        <a href="#" className="btn-forgot-password">
          Forgot Password?
        </a>
      </div>

      <Button className="btn-login" variant="contained" disabled={processing} onClick={login}>
        Login
      </Button>
    </div>
  );
}
