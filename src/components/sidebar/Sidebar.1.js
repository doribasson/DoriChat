import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./sidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(user?.photoURL);
    const unsubscribe = db.collection("rooms").onSnapshot((
      snapshot //take it from database in firebase
    ) =>
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // const myScroll = () => {
  //   console.log(searchTerm);
  // };

  const handleChange = event => {
    setSearchTerm(event.target.value);
    // console.log(searchTerm);
    // console.log(rooms);
    const findRoomIndex = rooms.findIndex(
      room => room.data.name === searchTerm
    );
    console.log(findRoomIndex);

    if (findRoomIndex != -1) {
      if (scrollRef.current) {
        scrollRef[findRoomIndex].current.scrollIntoView({ behavior: "smooth" });
        // scrollRef.current.style.backgroundColor = "red";
        // setTimeout(() => {
        //   scrollRef.current.style.backgroundColor = "inherit";
        // }, 3000);
      }
    }

    // if (findRoomIndex != -1) {
    //   const elmnt = document.querySelector(`.scroll__search${findRoomIndex}`);
    //   elmnt.scrollIntoView();
    //   elmnt.style.backgroundColor = "red";
    //   setTimeout(() => {
    //     elmnt.style.backgroundColor = "inherit";
    //   }, 3000);
    // }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* <Avatar src={user?.photoURL} /> */}
        {/* <Avatar src={user && user.photoURL} /> */}
        <Avatar src={user ? user.photoURL : null} />
        <div className="sidebar__headerRight">
          {/* <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton> */}
          {/* <IconButton>
            <MoreVerIcon />
          </IconButton> */}
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />

          <input
            placeholder="Search..."
            type="text"
            onChange={handleChange}
            value={searchTerm}
          />
          <button onClick={handleChange}>dffd</button>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {/* <SidebarChat />
        <SidebarChat />
        <SidebarChat /> */}
        {rooms.map((room, i) => (
          // <div className={`scroll__search${i}`}>
          <div ref={scrollRef[i]}>
            <SidebarChat
              // ref={scrollRef}
              key={room.id}
              id={room.id}
              name={room.data.name}
              rooms={rooms}
              searchTerm={searchTerm}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
