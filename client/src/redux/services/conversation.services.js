import { config } from "../../config"; // config file for base url
import { authHeader } from "../authHeader";

export const conversationService = {
    getAll,
    getSingle,
    getUserConversations,
    findConversationId,
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

    return fetch(`${config.env}/conversations`, requestOptions).then(
        handleResponse
    );
}

async function getSingle(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/conversations/${id}`, requestOptions).then(
        handleResponse
    );
}

async function getUserConversations(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/conversations/user/${id}`, requestOptions).then(
        handleResponse
    );
}

async function findConversationId(id, loggedInUserID) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(
        `${config.env}/conversations/find/${id}?loggedInUserID=${loggedInUserID}`,
        requestOptions
    ).then(handleResponse);
}
