import {Dispatch} from "redux";
import {
    FETCH_CHATS,
    SEND_CHAT,
    ChatDispatchTypes
} from "./chatType"
import axios from "axios";

export const getChats = () => async (dispatch: Dispatch<ChatDispatchTypes>) => {
  
    try {   
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/api/chats`);
        
        dispatch({
            type: FETCH_CHATS,
            payload: res.data.data
        })
      
    } catch(e) {
        console.log('error:' + e)
    }
};

export const sendChat = (data: any) => async (dispatch: Dispatch<ChatDispatchTypes>) => {
  
    try {   
        const res = await axios.post(process.env.REACT_APP_API_BASE_URL + `/api/chats`, data);
        
        dispatch({
            type: SEND_CHAT,
            payload: res.data.data
        })
      
    } catch(e) {
        console.log('error:' + e)
    }
};