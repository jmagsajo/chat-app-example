import {
    FETCH_CHATS,
    SEND_CHAT,
    chatTypes,
    ChatDispatchTypes
} from "../actions/chatType"

interface DefaultStateI {
    chats?: chatTypes[]
}

const chats : DefaultStateI = {};

const chatReducer = (state = chats, action: ChatDispatchTypes) => {
    switch (action.type) {
        case FETCH_CHATS:
            return {
                chats: action.payload
            }
        case SEND_CHAT:
            return state
        default:
            return state
    }
}

export default chatReducer