import { Button } from "@mui/material";
import "./LoginPage.scss";
import Checkbox from "../../commons/Checkbox/Checkbox";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import TextFieldPassword from "../../commons/TextFieldPassword/TextFieldPassword";
import { setPageHeadTitle } from "../../../utils/util_web";
import { useEffect, useReducer } from "react";
import {
  requestLoginAPI,
  validateEmail,
  validatePassword,
} from "./LoginPage.prop";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";

const initialState = {
  errorState: "",
  email: "",
  password: "",
  processing: false,
  rememberMe: false,
  errors: {
    email: "",
    password: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR_STATE":
      return { ...state, errorState: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PROCESSING":
      return { ...state, processing: action.payload };
    case "SET_REMEMBER_ME":
      return { ...state, rememberMe: action.payload };
    case "SET_ERROR":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    setPageHeadTitle("Login");
  }, []);

  const validateEmailField = () => {
    if (!validateEmail(state.email)) {
      dispatch({ type: "SET_ERROR", payload: { ...state.errors, email: "Invalid email format" } });
    } else {
      dispatch({ type: "SET_ERROR", payload: { ...state.errors, email: "" } });
    }
  };

  const validatePasswordField = () => {
    if (!validatePassword(state.password)) {
      dispatch({
        type: "SET_ERROR",
        payload: { ...state.errors, password: "Password is required" },
      });
    } else {
      dispatch({ type: "SET_ERROR", payload: { ...state.errors, password: "" } });
    }
  };

  const login = async () => {
    dispatch({ type: "SET_PROCESSING", payload: true });

    try {
      let res = await requestLoginAPI(state.email, state.password);
      if (res.status !== 200) {
        dispatch({ type: "SET_ERROR_STATE", payload: res.message });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR_STATE", payload: "An error has occured. Please try again later." });
    } finally {
      dispatch({ type: "SET_PROCESSING", payload: false });
    }
  };

  return (
    <div className="page-login">
      <img className="logo" src={logo} alt="logo" />
      <h1>Adminstrative Login</h1>
      <p className="main-label">
        Please fill your detail to access your account
      </p>
      <p className="error-msg">{state.errorState}</p>
      <div>
        <TextFieldBasic
          className="input-field"
          placeholder="Your email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          error={state.errors.email !== ""}
          helperText={state.errors.email}
          onBlur={validateEmailField}
        />
      </div>
      <div>
        <TextFieldPassword
          className="input-field"
          placeholder="Your password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          error={state.errors.password !== ""}
          helperText={state.errors.password}
          onBlur={validatePasswordField}
        />
      </div>
      <div className="meta">
        <div className="meta-remember-me">
          <Checkbox
            label={"Remember me"}
            selectedColor={"#FF0000"}
            onChange={(e) =>
              dispatch({ type: "SET_REMEMBER_ME", payload: e.target.checked })
            }
          />
        </div>
        <a href="#" className="btn-forgot-password">
          Forgot Password?
        </a>
      </div>

      <Button
        className="btn-login"
        variant="contained"
        disabled={state.processing}
        onClick={login}
      >
        Login
      </Button>
    </div>
  );
}


