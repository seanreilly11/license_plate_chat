import { messageConstants } from "../constants/message.constants";
import { messageService } from "../services/message.services";

export const messageActions = {
    getAll,
    getSingle,
    newMessage,
    viewMessage,
};

function getAll() {
    return (dispatch) => {
        dispatch(request());

        messageService.getAll().then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: messageConstants.GETALL_REQUEST };
    }
    function success(data) {
        return { type: messageConstants.GETALL_SUCCESS, data };
    }
    function failure(error) {
        return { type: messageConstants.GETALL_FAILURE, error };
    }
}

function getSingle(id) {
    return (dispatch) => {
        dispatch(request());

        messageService.getSingle(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: messageConstants.GETSINGLE_REQUEST };
    }
    function success(data) {
        return { type: messageConstants.GETSINGLE_SUCCESS, data };
    }
    function failure(error) {
        return { type: messageConstants.GETSINGLE_FAILURE, error };
    }
}

function newMessage(msg) {
    return (dispatch) => {
        dispatch(request());

        messageService.newMessage(msg).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: messageConstants.NEWMESSAGE_REQUEST };
    }
    function success(data) {
        return { type: messageConstants.NEWMESSAGE_SUCCESS, data };
    }
    function failure(error) {
        return { type: messageConstants.NEWMESSAGE_FAILURE, error };
    }
}

function viewMessage(id) {
    return (dispatch) => {
        dispatch(request());

        messageService.viewMessage(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: messageConstants.VIEWVIDEO_REQUEST };
    }
    function success(data) {
        return { type: messageConstants.VIEWVIDEO_SUCCESS, data };
    }
    function failure(error) {
        return { type: messageConstants.VIEWVIDEO_FAILURE, error };
    }
}
