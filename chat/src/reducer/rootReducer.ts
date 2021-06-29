import {combineReducers} from "redux";
import chatReducer from "./chatReducer";

const RootReducer = combineReducers({
    chats: chatReducer
});

export default RootReducer