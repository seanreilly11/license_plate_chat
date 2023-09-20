import { messageConstants } from "../constants/message.constants";
import { messageService } from "../services/message.services";
import { conversationActions } from "./conversation.actions";
import { userActions } from "./user.actions";

export const messageActions = {
    getAll,
    getSingle,
    viewMessage,
    completeMessage,
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

function completeMessage(messageId, userId) {
    return (dispatch) => {
        dispatch(request());

        messageService.completeMessage(messageId, userId).then(
            (data) => {
                dispatch(success(data));
                dispatch(userActions.getCompletedItems(userId));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: messageConstants.COMPLETEMESSAGE_REQUEST };
    }
    function success(data) {
        return { type: messageConstants.COMPLETEMESSAGE_SUCCESS, data };
    }
    function failure(error) {
        return { type: messageConstants.COMPLETEMESSAGE_FAILURE, error };
    }
}
