import { config } from "../../config"; // config file for base url
import { authHeader } from "../authHeader";
// import { authHeader } from "../authHeader"; // any repeating header for ajax

export const userService = {
    getSingle,
    getAll,
    getPlateUsers,
    getUserStats,
    getCompletedItems,
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

async function getSingle(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/users/${id}`, requestOptions).then(
        handleResponse
    );
}

async function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/users`, requestOptions).then(handleResponse);
}

async function getPlateUsers(plate) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/users/plate/${plate}`, requestOptions).then(
        handleResponse
    );
}

async function getUserStats(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/users/stats/${id}`, requestOptions).then(
        handleResponse
    );
}

async function getCompletedItems(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.env}/users/completed/${id}`, requestOptions).then(
        handleResponse
    );
}
