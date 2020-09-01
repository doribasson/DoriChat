import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snapShot => setRoomName(snapShot.data().name));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log("you types ", input);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          className="avatar"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seem at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">Dori Basson</span>
          Hey Guys
          <span className="chat__timestamp"> 3:52pm</span>
        </p>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
        <h1>massege</h1>
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
