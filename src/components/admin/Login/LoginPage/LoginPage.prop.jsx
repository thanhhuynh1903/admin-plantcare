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

  try {
    let res = await apost("/auth/login", { email: email, password: password });

    if (res.status === 200) {
      return {
        status: 200,
        data: res.data,
      };
    } else {
      return {
        status: 400,
        message: res.data.message,
      };
    }
  } catch (err) {
    return {
      status: 404,
      message: "An error has occured. Please try again later.",
    };
  }
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
