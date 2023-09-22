import { authenticationConstants } from "../constants/authentication.constants";
import { auth } from "../../hooks/useAuthConst";

const initialState = {
    token: auth?.token,
    id: auth?.id,
    name: auth?.firstname,
    error: null,
    loading: false,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case authenticationConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case authenticationConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                id: action.data.id,
                name: action.data.firstname,
                token: action.data.token,
            };
        case authenticationConstants.SIGN_IN_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                loading: false,
            };

        case authenticationConstants.SIGN_OUT_REQUEST:
            return {
                ...state,
            };
        case authenticationConstants.SIGN_OUT_SUCCESS:
            return {
                ...state,
                id: null,
                token: null,
                name: null,
            };
        case authenticationConstants.SIGN_OUT_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                name: null,
                loading: false,
            };
        case authenticationConstants.VERIFY_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case authenticationConstants.VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case authenticationConstants.VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                error: action.error,
            };

        case authenticationConstants.RESTORE_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case authenticationConstants.RESTORE_TOKEN_SUCCESS:
            return {
                ...state,
                id: action.data.id,
                token: action.data.token,
                loading: false,
            };
        case authenticationConstants.RESTORE_TOKEN_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                loading: false,
            };

        case authenticationConstants.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case authenticationConstants.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case authenticationConstants.REGISTER_FAILURE:
            return {
                error: action.error,
                token: null,
                id: null,
                loading: false,
            };
        default:
            return state;
    }
}
