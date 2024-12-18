import { apost } from "../../../utils/util_axios";

export async function requestLoginAPI(email, password) {
  if (!validateEmail(email)) {
    return {
      status: 400,
      message: "Invalid email format.",
    };
  }

  if (!validatePassword(password)) {
    return {
      status: 400,
      message: "Password is required.",
    };
  }

  let res = await apost("/auth/login", { email: email, password: password })
    .then((res) => {
      if (res.status === 200) {
        return {
          status: 200,
          message: "Login successful",
          accessToken: res.data.accessToken,
        };
      }
    })
    .catch((err) => {
      if (err.response.status === 400) {
        return {
          status: 400,
          message: "Email and password are required",
        };
      } else if (err.response.status === 401) {
        return {
          status: 401,
          message: "Invalid login credentials. Try again",
        };
      } else if (err.response.status === 404) {
        return {
          status: 404,
          message: "User not found. Try again",
        };
      } else if (err.response.status === 500) {
        return {
          status: 500,
          message: "Internal server error. Try again",
        };
      } else {
        return {
          status: 500,
          message: "Internal server error. Try again",
        };
      }
    });

  return res;
}

export function validateEmail(email) {
  if (!email) return false;
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password) {
  if (!password) return false;
  return true;
}
