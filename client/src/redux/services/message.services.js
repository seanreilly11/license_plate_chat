import { config } from "../../config"; // config file for base url
import { authHeader } from "../authHeader"; // any repeating header for ajax

export const messageService = {
    getAll,
    getSingle,
    newMessage,
    viewMessage,
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

async function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/messages`, requestOptions).then(handleResponse);
}

async function getSingle(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/messages/${id}`, requestOptions).then(
        handleResponse
    );
}

async function newMessage(msg) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(msg),
    };

    return fetch(`${config.env}/messages`, requestOptions).then(handleResponse);
}

async function viewMessage(id) {
    const requestOptions = {
        method: "PATCH",
        headers: authHeader(),
    };

    return fetch(`${config.env}/messages/view/${id}`, requestOptions).then(
        handleResponse
    );
}
