import { auth } from "../hooks/useAuthConst";

export function authHeader() {
    // return authorization header with jwt token
    // get user token from state
    // console.log(auth.token);
    return {
        Accept: "/",
        "Content-Type": "application/json",
        authorization: "Bearer " + auth.token,
    };
}
