export const FETCH_CHATS = "FETCH_CHATS"
export const SEND_CHAT = "SEND_CHAT"

export type chatTypes = {
    _id: String,
    message: String,
    name: String
}

export interface fetchChats {
    type: typeof FETCH_CHATS,
    payload: chatTypes[]
}

export interface sendChat {
    type: typeof SEND_CHAT,
    payload: chatTypes
}

export type ChatDispatchTypes = fetchChats | sendChat