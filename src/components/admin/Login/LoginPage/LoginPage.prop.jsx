import { apost } from "../../../utils/util_axios";

export async function requestLoginAPI(email, password) {

    apost("/auth/login", { email, password }, (err, res) => {
        if (err) {
            return {
                status: 400,
                message: "Login failed. Please try again later."
            }
        }
        console.log(res)

        return {
            status: 200,
            data: res
        }
    });
}