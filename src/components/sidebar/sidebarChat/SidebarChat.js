import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "../../../firebase";
import Chat from "../../Chat/Chat";

function SidebarChat({
  id,
  name,
  addNewChat,
  index,
  searchTerm,
  scrollRef,
  rooms
}) {
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

  // useEffect(() => {
  //   console.log("chatttt", searchTerm);
  //   console.log(name);
  //   console.log(rooms);

  //   handleChange();
  //   const findRoomIndex = rooms.findIndex(room => room.name === searchTerm);
  //   console.log(room.name);
  //   console.log(findRoomIndex);
  //   if (findRoomIndex != -1) {
  //     const elmnt = document.querySelector(`.chat__index${findRoomIndex}`);
  //     elmnt.scrollIntoView();

  // handleChange()
  // const findRoomIndex = rooms.findIndex(room => room.name === searchTerm);
  // console.log(findRoomIndex);

  // const findRoomIndex = rooms.findIndex(room => room.name === searchTerm);

  // if (findRoomIndex != -1) {
  //   const elmnt = document.querySelector(`.chat__index${findRoomIndex}`);
  //   elmnt.scrollIntoView();
  // }
  // if (scrollRef !== undefined && name === searchTerm) {
  //   scrollRef.current.scrollIntoView();
  // if (name === searchTerm) {

  // }
  // }, []);

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
      console.log("showsidebarChat");
      document.querySelector(".sidebar").style.display = "none";

      const isMobileVersion = document.getElementsByClassName("chat"); //if class exist
      if (isMobileVersion.length > 0) {
        document.querySelector(".chat").style.display = "flex";
        //isMobileVersion[0].style.color = "red";
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
          {/* <p>Last message...</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add a new Chat</h2>
      <i className="fas fa-user-plus myPlus"></i>
      {/* <img src={require("../../../assets/plus.png")} /> */}
    </div>
  );
}

export default SidebarChat;
