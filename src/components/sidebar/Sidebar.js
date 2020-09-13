import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./sidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user, avatar }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef([]);
  const innerRef = useRef(null);

  useEffect(() => {
    // console.log(user?.photoURL);
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

  const handleChange = event => {
    setSearchTerm(event.target.value);
    // console.log(searchTerm);
    // console.log(rooms);
    const findRoomIndex = rooms.findIndex(
      room =>
        // room.data.name.includes(searchTerm)
        room.data.name === searchTerm
    );
    innerRef.current.focus();
    // console.log(findRoomIndex);

    if (findRoomIndex !== -1) {
      // const elmnt = document.querySelector(`.scroll__search${findRoomIndex}`);
      scrollRef.current[findRoomIndex].style.background = "#FFFF99";
      scrollRef.current[findRoomIndex].scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(() => {
        scrollRef.current[findRoomIndex].style.backgroundColor = "inherit";
      }, 3000);
      setSearchTerm("");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user ? user.photoURL : null} />
        <div className="sidebar__headerRight"></div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined
            className="searchOutlined__input"
            onClick={e => {
              e.preventDefault();
              handleChange(e);
            }}
          />
          <input
            placeholder="Search..."
            type="text"
            ref={innerRef}
            onChange={handleChange}
            value={searchTerm}
            onKeyPress={event => {
              if (event.key === "Enter") {
                handleChange(event);
              }
            }}
          />

          <button
            className="clearSearch__sidebar"
            onChange={e => setSearchTerm(e.target.value)}
            onClick={e => {
              e.preventDefault();
              setSearchTerm("");
              innerRef.current.focus();
            }}
            // onClick={() => setSearch(false)}
          >
            x
          </button>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />

        {rooms.map((room, i) => (
          <div
            key={i}
            ref={el => (scrollRef.current[i] = el)}
            // className={`scroll__search${i}`}
          >
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
              rooms={rooms}
              searchTerm={searchTerm}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
