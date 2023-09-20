import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { conversations } from "./conversation.reducer";
import { messages } from "./message.reducer";
import { users } from "./user.reducer";

export default combineReducers({
    conversations,
    messages,
    authentication,
    users,
});
