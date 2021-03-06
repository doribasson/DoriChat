import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import { Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
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
  const divRef = useRef(null);
  const innerRef = useRef(null);
  const scrollRef = useRef([]);

  let history = useHistory();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {}
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  const scrollIntoView = e => {
    e.preventDefault();
    const findMessageIndex = messages.findIndex(
      mess => mess.message === searchInput
    );

    const map1 = messages.map((mes, i) => {
      const findindex = mes.message.includes(searchInput);
      return findindex === true ? i : null;
    });

    // console.log(map1);

    if (findMessageIndex !== -1) {
      for (let i = 0; i < map1.length; i++) {
        if (map1[i] !== null) {
          if (scrollRef.current[map1[i]].className !== null) {
            const theClassName = scrollRef.current[map1[i]].className;

            scrollRef.current[map1[i]].style.background = "#FFFF99";
            scrollRef.current[map1[i]].scrollIntoView({
              behavior: "smooth"
            });

            setTimeout(() => {
              if (scrollRef.current[map1[i]] !== null) {
                theClassName === "chat__message chat__reciever"
                  ? (scrollRef.current[map1[i]].style.backgroundColor =
                      "#b8dcfa")
                  : (scrollRef.current[map1[i]].style.backgroundColor =
                      "white");
              }
            }, 6000);
          }
        }
      }
    }
  };

  useEffect(() => {
    // console.log(divRef.current);
    if (divRef.current) {
      divRef.current.scrollIntoView();
      // divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {}, [search]);

  useEffect(() => {
    // console.log(window.innerWidth);
    // console.log(window.screen.width);
  }, []);

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
    // console.log("you types ", input);
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

  const myFunc = () => {
    // console.log(search);
    setSearch(!search);
    setTimeout(() => {
      if (innerRef.current !== null) innerRef.current.focus();
    }, 1000);

    // console.log(search);
  };

  const showSidebar = () => {
    if (window.screen.width < 768) {
      // console.log("showsidebar");
      // document.querySelector(".sidebar").style.display = "flex";
      // document.querySelector(".chat").style.display = "none";
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
              {roomName}
              {user.email === "doribasson@gmail.com" && (
                <i
                  className="fas fa-trash-alt deleteUser"
                  onClick={deleteConversation}
                ></i>
              )}
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

        <div className="chat__headerRight">
          <SearchOutlined className="search__button" onClick={myFunc} />
          {window.screen.width < 768 && (
            <i onClick={showSidebar} className="fas fa-arrow-right back"></i>
          )}

          {search && (
            <div className="search__input">
              <form>
                <i
                  onClick={scrollIntoView}
                  className="fas fa-angle-down search"
                ></i>
                <input
                  ref={innerRef}
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyDown}
                  // onKeyPress={event => {
                  //   if (event.key === "Enter") {
                  //     scrollIntoView(event);
                  //   }
                  // }}
                  placeholder="search..."
                  type="text"
                />
                <button
                  className="clearSearch"
                  onChange={e => setSearchInput(e.target.value)}
                  onClick={e => {
                    e.preventDefault();
                    setSearchInput("");
                    innerRef.current.focus();
                  }}
                >
                  x
                </button>
                <i className="scroll" onClick={e => scrollIntoView(e)}></i>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, i) => {
          // console.log(user.displayName);
          return (
            <p
              ref={el => (scrollRef.current[i] = el)}
              key={i}
              className={`chat__message ${message.name === user.displayName &&
                "chat__reciever"}`}
            >
              <span className="chat__name">{message.name}</span>

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
        <div ref={divRef} />
      </div>

      <div className="chat__footer">
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
          <InsertEmoticonIcon
            className="emoji"
            onClick={() => setEmojiFlag(prevEmojiState => !emoji)}
          />
          <button onClick={sendMessage} type="submit">
            <div className="circle">
              <i className="far fa-paper-plane"></i>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
