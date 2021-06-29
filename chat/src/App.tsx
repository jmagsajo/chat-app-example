import './App.css';
import { io } from "socket.io-client";

function App() {
  const server_url : any = process.env.REACT_APP_NODEURL;
  const socket = io(server_url);
  socket.emit("sendchat", "test emit");

  socket.on("chat", (chat) => {
    console.log(chat);
    const mydiv : any = document.getElementById("chat-box");
    mydiv.innerHTML += "<p>" + chat + "</p>";
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-box" id="chat-box"></div>
        <div>
          <input type="text" className="name" placeholder="Enter your name" />
          <button>Submit</button>
        </div>
      </header>
    </div>
  );
}

export default App;
