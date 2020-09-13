import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import firebase from "firebase";
import { useStateValue } from "../../StateProvider";
import MyEmoji from "../Emoji/MyEmoji";

function Chat() {
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [emoji, setEmojiFlag] = useState(false);
  const [seed, setSeed] = useState("");
  // const [myClassName, setMyClassName] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const childReference = useRef(null);
  const divRef = useRef(null);
  const inputRef = useRef(null);

  let history = useHistory();
  let classes = "color__search";
  if (search === false) {
    classes += "off";
  }

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        const checkDisplay = document.querySelector(".sidebar").style.display;
        console.log({ checkDisplay });
        setSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth > 768) {
          document.querySelector(".sidebar").style.display = "flex";
        }
        console.log(window.innerWidth);
        console.log(window.screen.width);
        if (window.screen.width < 768 && checkDisplay === "flex") {
          console.log(window.innerWidth);
          document.querySelector(".sidebar").style.display = "none";
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  const scrollIntoView = e => {
    console.log("dsdssd");
    e.preventDefault();
    const findMessageIndex = messages.findIndex(
      mess => mess.message === searchInput
    );
    // console.log({ findMessageIndex });
    if (findMessageIndex != -1) {
      const elmnt = document.querySelector(`.findMessage${findMessageIndex}`);
      console.log(search);
      if (search) {
        document.querySelector(
          // `.classes${findMessageIndex}`
          `.color__search${findMessageIndex}`
        ).style.backgroundColor = "rgba(34, 167, 240, 1)";
        elmnt.scrollIntoView();
        console.log("yes");
      } else {
        document.querySelector(
          `.classes${findMessageIndex}`
        ).style.backgroundColor = "white";
      }
    }
  };

  useEffect(() => {
    console.log(divRef.current);
    if (divRef.current) {
      divRef.current.scrollIntoView();
      // divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   console.log(divRef.current);
  //   divRef.current.scrollIntoView({ behavior: "smooth" });
  // }, []);

  useEffect(() => {
    // console.log(window.innerWidth);
    console.log(window.screen.width);
    if (window.screen.width < 768) {
      document.querySelector(".sidebar").style.display = "none";
    }
  }, []);

  useEffect(() => {}, [search]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snapShot => setRoomName(snapShot.data()?.name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log("you types ", input);
    if (input) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          message: input,
          name: user.displayName, //from firebase
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    setInput("");
  };

  const myFunc = e => {
    setSearch(!search);
    console.log(inputRef);
    inputRef.current.focus();

    // e.preventDefault();
    // setSearch(!search);
    // const findMessageIndex = messages.findIndex(
    //   mess => mess.message === searchInput
    // );
    // console.log({ findMessageIndex });
    // if (findMessageIndex != -1) {
    //   document.querySelector(
    //     `.classes${findMessageIndex}`
    //   ).style.backgroundColor = "white";
    // }
    // setSearchInput("");
  };

  const showSidebar = () => {
    if (window.screen.width < 768) {
      console.log("showsidebar");
      document.querySelector(".sidebar").style.display = "flex";
      document.querySelector(".chat").style.display = "none";
      history.push("/");
    }
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      scrollIntoView(event);
    }
  };

  const deleteConversation = () => {
    if (window.confirm("Delete user?")) {
      db.collection("rooms")
        .doc(roomId)
        .delete()
        .then(() => {
          console.log("delete ok");
          if (window.screen.width < 768) {
            document.querySelector(".sidebar").style.display = "flex";
          }
          history.push("/");
        })
        .catch(error => {
          console.error("Error delete ", error);
        });
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar
            className="avatar"
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          />

          <div className="chat__headerInfo">
            <h3>
              {roomName}{" "}
              <i
                className="fas fa-user-times deleteUser"
                onClick={deleteConversation}
              ></i>
            </h3>
            <p>
              last seen{" "}
              {new Date(messages[messages.length - 1]?.timestamp?.toDate())
                .toString()
                .slice(0, 21)}
              {/* {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
            </p>
            {/* <span>
              Window size: {width} x {height}
            </span> */}
          </div>
        </div>

        {/* <p>Last seem at ...</p> */}
        <div className="chat__headerRight">
          {/* <button onClick={deleteConversation}>clear Converstion</button> */}
          <SearchOutlined className="search__button" onClick={e => myFunc(e)} />
          {window.screen.width < 768 && (
            <i onClick={showSidebar} className="fas fa-arrow-right back"></i>
          )}

          {search && (
            <div className="search__input">
              <form>
                <input
                  ref={inputRef}
                  value={searchInput}
                  // onChange={e => (onkeypress = { handleKeyDown })}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyDown}
                  // onKeyPress={event => {
                  //   if (event.key === "Enter") {
                  //     scrollIntoView(event);
                  //   }
                  // }}
                  placeholder="input word"
                  type="text"
                />
                <button
                  className="closeSearch"
                  onClick={() => setSearch(false)}
                >
                  x
                </button>
                <i className="scroll" onClick={e => scrollIntoView(e)}>
                  {/* Click to scroll */}
                </i>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, i) => {
          console.log(user.displayName);
          return (
            <p
              key={i}
              className={`chat__message ${message.name === user.displayName &&
                "chat__reciever"}`}
            >
              <span className="chat__name">{message.name}</span>

              {/* <span className={search ? `color__search${i}` : "noColor__search"}> */}
              {/* <span className={`color${i}`}> */}

              {/* <span className={`classes${i}`}> */}
              <span
                className={search ? `color__search${i}` : "noColor__search"}
              >
                <span ref={divRef} className="message__time">
                  <span className={`findMessage${i}`}>{message.message}</span>
                  <span className="chat__timestamp">
                    {new Date(
                      messages[messages.length - 1]?.timestamp?.toDate()
                    )
                      .toString()
                      .slice(0, 21)}
                  </span>
                </span>
              </span>
            </p>
          );
        })}
        <div ref={divRef} /> {/* div for scroll to the end */}
      </div>
      {/* <div className="myDIV">
        <div className="content">Some text inside an element.</div>
      </div> */}
      <div className="chat__footer">
        <InsertEmoticonIcon
          className="emoji"
          onClick={() => setEmojiFlag(prevEmojiState => !emoji)}
        />
        {emoji && (
          <div>
            <MyEmoji
              setInput={setInput}
              input={input}
              setEmojiFlag={setEmojiFlag}
            />
          </div>
        )}
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
        {/* <MicIcon /> */}
      </div>
    </div>
  );
}

export default Chat;
