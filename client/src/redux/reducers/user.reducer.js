import { userConstants } from "../constants/user.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
    item: null,
    completed: null,
    stats: null,
};

export function users(state = initialState, action) {
    switch (action.type) {
        //
        // GET ALL
        //
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.data,
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                completed: null,
            };
        //
        // GET SINGLE
        //
        case userConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                loading: true,
                item: null,
            };
        case userConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.data,
            };
        case userConstants.GETSINGLE_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                completed: null,
            };
        //
        // GET USER STATS
        //
        case userConstants.GET_USER_STATS_REQUEST:
            return {
                ...state,
                loading: true,
                stats: null,
            };
        case userConstants.GET_USER_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                stats: action.data,
            };
        case userConstants.GET_USER_STATS_FAILURE:
            return {
                error: action.error,
                loading: false,

                stats: null,
            };
        //
        // GET USERS COMPLETED ITEMS
        //
        case userConstants.GETCOMPLETED_REQUEST:
            return {
                ...state,
                completed: null,
                loading: true,
            };
        case userConstants.GETCOMPLETED_SUCCESS:
            return {
                ...state,
                completed: action.data,
                loading: false,
            };
        case userConstants.GETCOMPLETED_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
                completed: null,
            };
        // //
        // // TAKE LEAD
        // //
        // case userConstants.TAKELEAD_REQUEST:
        //   return {
        //     ...state,
        //     loadingTakeLead: true,
        //   };
        // case userConstants.TAKELEAD_SUCCESS:
        //   return {
        //     ...state,
        //     loadingTakeLead: false,
        //   };
        // case userConstants.TAKELEAD_FAILURE:
        //   return {
        //     error: action.error,
        //   };
        // //
        // // DELETE
        // //
        // case userConstants.DELETE_REQUEST:
        //   // add 'deleting:true' property to user being deleted
        //   return {
        //     ...state,
        //     items: state.items.map(user =>
        //       user.id === action.id ? {...user, deleting: true} : user,
        //     ),
        //   };
        // case userConstants.DELETE_SUCCESS:
        //   // remove deleted user from state
        //   return {
        //     items: state.items.filter(user => user.id !== action.id),
        //   };
        // case userConstants.DELETE_FAILURE:
        //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        //   return {
        //     ...state,
        //     items: state.items.map(user => {
        //       if (user.id === action.id) {
        //         // make copy of user without 'deleting:true' property
        //         const {deleting, ...userCopy} = user;
        //         // return copy of user with 'deleteError:[error]' property
        //         return {...userCopy, deleteError: action.error};
        //       }

        //       return user;
        //     }),
        //   };
        default:
            return state;
    }
}
