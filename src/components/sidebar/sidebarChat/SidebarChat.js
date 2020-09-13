import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "../../../firebase";

function SidebarChat({ id, name, addNewChat, index, rooms }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("pls enter name for chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName
      });
    }
  };

  const showSidebar = () => {
    if (window.screen.width < 600) {
      // console.log("showsidebarChat");
      document.querySelector(".sidebar").style.display = "none";

      const isMobileVersion = document.getElementsByClassName("chat"); //if class exist
      if (isMobileVersion.length > 0) {
        document.querySelector(".chat").style.display = "flex";
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat" onClick={showSidebar}>
        <Avatar
          className="avatar"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className={`sidebarChat_info`}>
          <h2 className={`nameColor${index}`}>{name}</h2>
          <p>{messages[0]?.message.slice(0, 20)}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add a new Chat</h2>
      <i className="fas fa-user-plus myPlus"></i>
    </div>
  );
}

export default SidebarChat;
