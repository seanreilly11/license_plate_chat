import { config } from "../../config"; // config file for base url
import { unauthenticatedHeader } from "../unauthenticatedHeader";

export const authenticationService = {
    signIn,
    signOut,
    verifyEmail,
    restoreToken,
    register,
};

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }

            const error = {
                message: data?.error || response.statusText,
                status: response.status,
            };
            return Promise.reject(error);
        }
        return data;
    });
}

async function signIn(email, password) {
    const requestOptions = {
        method: "POST",
        headers: unauthenticatedHeader(),
        dataType: "json",
        body: JSON.stringify({ email, password }),
    };

    return fetch(`${config.env}/users/login`, requestOptions).then(
        handleResponse
    );
}

async function signOut(userId) {
    const requestOptions = {
        method: "PATCH",
        headers: unauthenticatedHeader(),
        dataType: "json",
        body: JSON.stringify({ userId }),
    };

    return fetch(`${config.env}/users/logout`, requestOptions).then(
        handleResponse
    );
}

async function verifyEmail(token) {
    const requestOptions = {
        method: "PATCH",
        headers: unauthenticatedHeader(),
        dataType: "json",
    };

    return fetch(
        `${config.env}/users/email?token=${token}`,
        requestOptions
    ).then(handleResponse);
}

async function restoreToken() {
    return;
    // AsyncStorage.multiGet([STORAGE_TOKEN, STORAGE_UID]).then(
    //     (result) => {
    //         const token = result[0][1];
    //         const uid = result[1][1];

    //         if (token && uid) {
    //             return { token, uid };
    //         } else {
    //             const error = {
    //                 message: "Unable to restore token.",
    //             };
    //             return Promise.reject(error);
    //         }
    //     }
    // );
}

async function register(passport) {
    const requestOptions = {
        method: "POST",
        headers: unauthenticatedHeader(),
        dataType: "json",
        body: JSON.stringify(passport),
    };

    return fetch(`${config.env}/users`, requestOptions).then(handleResponse);
}
