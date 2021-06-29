import {
    FETCH_CHATS,
    SEND_CHAT,
    ChatDispatchTypes
} from "../actions/chatType"

const chats = {};

const chatReducer = (state = chats, action: ChatDispatchTypes) => {
    switch (action.type) {
        case FETCH_CHATS:
            state = action.payload
            return state
        case SEND_CHAT:
            return state
        default:
            return state
    }
}

export default chatReducer