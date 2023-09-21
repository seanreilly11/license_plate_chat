import { conversationConstants } from "../constants/conversation.constants";
import { messageConstants } from "../constants/message.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
    item: null,
};

export function messages(state = initialState, action) {
    switch (action.type) {
        //
        // GET ALL
        //
        case messageConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case messageConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.data,
            };
        case messageConstants.GETALL_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
            };
        //
        // GET SINGLE
        //
        case messageConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                item: null,
                loading: true,
            };
        case messageConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.data,
            };
        case messageConstants.GETSINGLE_FAILURE:
            return {
                ...state,
                error: action.error,
                item: null,
                loading: false,
            };
        //
        // SEND MESSAGE
        //
        case messageConstants.NEWMESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case messageConstants.NEWMESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.data],
            };
        case messageConstants.NEWMESSAGE_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        //
        // VIEW message
        //
        case messageConstants.VIEWMESSAGE_REQUEST:
            return {
                ...state,
            };
        case messageConstants.VIEWMESSAGE_SUCCESS:
            return {
                ...state,
            };
        case messageConstants.VIEWMESSAGE_FAILURE:
            return {
                ...state,
            };
        //
        // COMPLETE
        //
        case messageConstants.COMPLETEMESSAGE_REQUEST:
            return {
                ...state,
            };
        case messageConstants.COMPLETEMESSAGE_SUCCESS:
            return {
                ...state,
            };
        case messageConstants.COMPLETEMESSAGE_FAILURE:
            return {
                ...state,
            };
        // //
        // // GET CONVERSATION MESSAGES
        // //
        case conversationConstants.GETSINGLE_REQUEST:
            return {
                ...state,
                items: null,
                loading: true,
            };
        case conversationConstants.GETSINGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.data.messages,
            };

        case conversationConstants.GETSINGLE_FAILURE:
            return {
                error: action.error,
                loading: false,
                items: [],
                item: null,
            };
        // //
        // // TAKE LEAD
        // //
        // case messageConstants.TAKELEAD_REQUEST:
        //   return {
        //     ...state,
        //     loadingTakeLead: true,
        //   };
        // case messageConstants.TAKELEAD_SUCCESS:
        //   return {
        //     ...state,
        //     loadingTakeLead: false,
        //   };
        // case messageConstants.TAKELEAD_FAILURE:
        //   return {
        //     error: action.error,
        //   };
        // //
        // // DELETE
        // //
        // case messageConstants.DELETE_REQUEST:
        //   // add 'deleting:true' property to user being deleted
        //   return {
        //     ...state,
        //     items: state.items.map(user =>
        //       user.id === action.id ? {...user, deleting: true} : user,
        //     ),
        //   };
        // case messageConstants.DELETE_SUCCESS:
        //   // remove deleted user from state
        //   return {
        //     items: state.items.filter(user => user.id !== action.id),
        //   };
        // case messageConstants.DELETE_FAILURE:
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
