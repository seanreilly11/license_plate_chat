import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.services";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

export const userActions = {
    getSingle,
    getAll,
    getUserStats,
    getCompletedItems,
};

function getSingle(id) {
    return (dispatch) => {
        dispatch(request());

        userService.getSingle(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GETSINGLE_REQUEST };
    }
    function success(data) {
        return { type: userConstants.GETSINGLE_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.GETSINGLE_FAILURE, error };
    }
}

function getAll() {
    return (dispatch) => {
        dispatch(request());

        userService.getAll().then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GETALL_REQUEST };
    }
    function success(data) {
        return { type: userConstants.GETALL_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error };
    }
}

function getUserStats(id) {
    return (dispatch) => {
        dispatch(request());

        userService.getUserStats(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GET_USER_STATS_REQUEST };
    }
    function success(data) {
        return { type: userConstants.GET_USER_STATS_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.GET_USER_STATS_FAILURE, error };
    }
}

function getCompletedItems(id) {
    return (dispatch) => {
        dispatch(request());

        userService.getCompletedItems(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GETCOMPLETED_REQUEST };
    }
    function success(data) {
        return { type: userConstants.GETCOMPLETED_SUCCESS, data };
    }
    function failure(error) {
        return { type: userConstants.GETCOMPLETED_FAILURE, error };
    }
}
