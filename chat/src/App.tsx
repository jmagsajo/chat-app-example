import './App.css';
import { io } from "socket.io-client";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "./Store";
import * as  chatCreator  from "./actions/chatCreator";

function App() {

  const dispatch = useDispatch();

  const chathistory = useSelector((state: RootStore) => state.chats);
  
  console.log("state: ", chathistory)

  const [state, setState] = React.useState({
    name: "",
    message: ""
  })

  const handleChange = (event: React.ChangeEvent<any>) => {
    const value = event.target.value
    setState({
      ...state,
      [event.target.name]: value
    })
  }

  const sendChat = () => async (e: React.FormEvent) => {
    e.preventDefault();
    if(state.name && state.message){
      await dispatch( chatCreator.sendChat( {name: state.name, message: state.message} ) )
      emitter({name: state.name, message: state.message})
      setState({
        ...state,
        message: ''
      })
    }
  }

  React.useEffect(() => {
    // fetch saved chats in chat collection
    dispatch(chatCreator.getChats())

    const server_url : any = process.env.REACT_APP_API_BASE_URL;
    const socket = io(server_url);

    socket.on("chat", (chat) => {
      console.log(chat);
      const mydiv: any = document.getElementById("chat-box");
      mydiv.innerHTML += `<p><b>${chat.name}</b>: ${chat.message}</p>`;

      const objDiv: any = document.getElementById("chat-box");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitter = (data: any) => {
    const server_url : any = process.env.REACT_APP_API_BASE_URL;
    const socket = io(server_url);

    socket.emit("sendchat", {name: data.name, message: data.message});
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-box" id="chat-box">
          {chathistory.chats && (chathistory.chats.map( (data, index) => (
            <p key={index}><b>{data.name}</b>: {data.message}</p>
          )))}
        </div>
        <div>
          <p><input 
          type="text" 
          name="name"
          className="name"
          id="name"
          placeholder="Enter your name" 
          onChange={handleChange}
          /></p>
          <p><textarea 
          rows={5} 
          name="message" 
          className="message" 
          id="message" 
          placeholder="Enter your message" 
          onChange={handleChange}
          value={state.message}
          /></p>
          <p><button onClick={sendChat()}>Submit</button></p>
        </div>
      </header>
    </div>
  );
}

export default App;
