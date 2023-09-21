import { conversationConstants } from "../constants/conversation.constants";
import { conversationService } from "../services/conversation.services";

export const conversationActions = {
    getAll,
    getSingle,
    findConversationId,
    removeFoundConvo,
};

function getAll() {
    return (dispatch) => {
        dispatch(request());

        conversationService.getAll().then(
            (data) => {
                dispatch(success(data));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: conversationConstants.GETALL_REQUEST };
    }
    function success(data) {
        return { type: conversationConstants.GETALL_SUCCESS, data };
    }
    function failure(error) {
        return { type: conversationConstants.GETALL_FAILURE, error };
    }
}

function getSingle(id) {
    return (dispatch) => {
        dispatch(request());

        conversationService.getSingle(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: conversationConstants.GETSINGLE_REQUEST };
    }
    function success(data) {
        return { type: conversationConstants.GETSINGLE_SUCCESS, data };
    }
    function failure(error) {
        return { type: conversationConstants.GETSINGLE_FAILURE, error };
    }
}

function findConversationId(id) {
    return (dispatch) => {
        dispatch(request());

        conversationService.findConversationId(id).then(
            (data) => dispatch(success(data)),
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: conversationConstants.FINDCONVO_REQUEST };
    }
    function success(data) {
        return { type: conversationConstants.FINDCONVO_SUCCESS, data };
    }
    function failure(error) {
        return { type: conversationConstants.FINDCONVO_FAILURE, error };
    }
}

function removeFoundConvo() {
    return (dispatch) => {
        dispatch(request());
    };

    function request() {
        return { type: conversationConstants.REMOVECONVO_REQUEST };
    }
}
