import { conversationConstants } from "../constants/conversation.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
    item: null,
};

export function conversations(state = initialState, action) {
    switch (action.type) {
        //
        // GET ALL
        //
        case conversationConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case conversationConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.data,
            };
        case conversationConstants.GETALL_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
            };
        // //
        // // GET SINGLE
        // //
        case conversationConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                item: null,
                loading: true,
            };
        case conversationConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.data,
            };
        case conversationConstants.GETSINGLE_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
            };
        // //
        // // FIND CONVO
        // //
        case conversationConstants.FINDCONVO_REQUEST:
            return {
                ...state,
                item: null,
                loading: true,
            };
        case conversationConstants.FINDCONVO_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.data,
            };
        case conversationConstants.FINDCONVO_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
            };
        // //
        // // REMOVE FOUND CONVO
        // //
        case conversationConstants.REMOVECONVO_REQUEST:
            return {
                ...state,
                item: null,
            };
        // //
        // // TAKE LEAD
        // //
        // case conversationConstants.TAKELEAD_REQUEST:
        //   return {
        //     ...state,
        //     loadingTakeLead: true,
        //   };
        // case conversationConstants.TAKELEAD_SUCCESS:
        //   return {
        //     ...state,
        //     loadingTakeLead: false,
        //   };
        // case conversationConstants.TAKELEAD_FAILURE:
        //   return {
        //     error: action.error,
        //   };
        // //
        // // DELETE
        // //
        // case conversationConstants.DELETE_REQUEST:
        //   // add 'deleting:true' property to user being deleted
        //   return {
        //     ...state,
        //     items: state.items.map(user =>
        //       user.id === action.id ? {...user, deleting: true} : user,
        //     ),
        //   };
        // case conversationConstants.DELETE_SUCCESS:
        //   // remove deleted user from state
        //   return {
        //     items: state.items.filter(user => user.id !== action.id),
        //   };
        // case conversationConstants.DELETE_FAILURE:
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
