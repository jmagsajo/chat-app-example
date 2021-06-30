import './App.css';
import { io } from "socket.io-client";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "./Store";
import * as  chatCreator  from "./actions/chatCreator";

function App() {
  
  const server_url : any = process.env.REACT_APP_NODEURL;
  const socket = io(server_url);
  const dispatch = useDispatch();

  const chathistory = useSelector((state: RootStore) => state.chats);
  
  console.log("state: ", chathistory)

  socket.on("chat", (chat) => {
    console.log(chat);
    const mydiv : any = document.getElementById("chat-box");
    mydiv.innerHTML += "<p>" + chat + "</p>";
  });

  const sendChat = () => async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch( chatCreator.sendChat({}) );
    socket.emit("sendchat", "test emit");
  }
  
  const getChatHistory = () => async (e: React.FormEvent) => {
    dispatch(chatCreator.getChats())
  }

  React.useEffect(() => {
    // fetch saved chats in chat collection
    getChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-box" id="chat-box"></div>
        <div>
          <p><input type="text" className="name" placeholder="Enter your name" /></p>
          <p><textarea rows={5} className="message" placeholder="Enter your message" /></p>
          <p><button onClick={sendChat()}>Submit</button></p>
        </div>
      </header>
    </div>
  );
}

export default App;
