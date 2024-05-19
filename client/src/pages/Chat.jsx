import {
  Add,
  DocumentScannerRounded as DocumentIcon,
  EmojiEmotions,
  MoreVert,
  PhotoAlbumRounded as PhotoIcon,
  PollRounded as PollIcon,
  Send,
  VideoCameraBackRounded as VideoIcon,
} from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import ChatSettings from "../components/ChatComp/ChatSettings";
import Messages from "../components/ChatComp/Messages";
import GroupSettings from "../components/ChatComp/groupsettings";
import { getSocket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { NEW_MESSAGE } from "../constants/events.js";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import { Skeleton } from "@mui/material";

const Chat = () => {
  const { chatid } = useParams();

  const { user } = useSelector((state) => state.auth); // Cur User

  const [message, setcurmessage] = useState(""); // CurMessage
  const [messages, setMessages] = useState([]); // Messages List
  const [page, setPage] = useState(1);

  const chat = useRef(); // ref to chat

  const groupsetting = useRef();

  // fetching current chat details according to chatid
  const populate = true;
  const { isLoading, data, error, isError, refetch } = useGetChatDetailsQuery(
    chatid,
    populate
  );
  useErrors(error, isError);

  const curChat = data?.curchat;
  const members = curChat?.members;

  
  // fetching old Messages from database
    const oldMessagesChunk = useGetMessagesQuery(chatid, page);
    


  const socket = getSocket();

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // emitting message to the server ...
    socket.emit(NEW_MESSAGE, { chatid, members, message });

    setcurmessage("");
  };

  // will use newMessages function inside useCallback so that it won't created everytime we got new message
  const newMessages = useCallback((data) => {
    setMessages((pre) => [...pre, data.message]);
  }, []);

  const events = { [NEW_MESSAGE]: newMessages }; // [NEW_MESSAGE] -> its value will be read as a string in key

  useSocketEvents(socket, events); // using a custom hook to listen for events array


  return isLoading ? (
    <Skeleton />
  ) : (
    <section className="chat" ref={chat}>
      <GroupSettings groupsetting={groupsetting} curChat={curChat} />

      <div className="chat-person-div">
        <div
          className="person-dp"
          onClick={() => groupsetting.current.classList.add("active")}
        >
          <img
            src={curChat?.avatar?.url}
            alt="img"
            className="person-image"
            style={{ height: "70px", width: "70px" }}
          />
          {/* {isOnline && <div className="online"></div>} */}
        </div>
        <div className="chat-person-details">
          <h5>{curChat?.name}</h5>
          {/* {isOnline ? <span>Online</span> : <span>Offline</span>} */}
        </div>
        <span
          className="morevert"
          onClick={() => {
            if (!chat.current.classList.contains("activesettings")) {
              chat.current.classList.add("activesettings");
              return;
            }
            chat.current.classList.remove("activesettings");
          }}
        >
          <MoreVert sx={{ color: "#f9fafb" }} />
        </span>
      </div>

      <ChatSettings />

      <Messages user={user} messages={messages} chat={chat} />

      <form
        className="chat-message-div"
        onSubmit={(e) => messageSubmitHandler(e)}
      >
        <span className="addspan">
          <Add
            sx={{
              fontSize: "2.6rem",
            }}
            onClick={(e) => {
              if (!chat.current.classList.contains("active-files")) {
                chat.current.classList.add("active-files");
                return;
              }
              chat.current.classList.remove("active-files");
            }}
          />
        </span>

        <div className="message-div">
          <input
            type="text"
            className="chat-message"
            value={message}
            onChange={(e) => {
              setcurmessage(e.currentTarget.value);
            }}
            autoFocus
          />

          <EmojiEmotions
            sx={{
              position: "absolute",
              right: "0.5rem",
            }}
          />
        </div>

        <button
          type="button"
          className="sendmessage"
          onClick={(e) => messageSubmitHandler(e)}
        >
          <Send
            sx={{
              color: "#f9fafb",
              marginRight: "2rem",
              fontSize: "1.8rem",
              position: "absolute",
              right: "-0.9rem",
            }}
          />
        </button>
      </form>

      <article className="chat-files"></article>
      <div className="chat-file photos">
        <PhotoIcon
          sx={{
            color: "#f9fafb",
            fontSize: "2.3rem",
          }}
        />
        <span>Photos</span>
      </div>
      <div className="chat-file videos">
        <VideoIcon
          sx={{
            color: "#f9fafb",
            fontSize: "2.3rem",
          }}
        />
        <span>Videos</span>
      </div>
      <div className="chat-file documents">
        <DocumentIcon
          sx={{
            color: "#f9fafb",
            fontSize: "2.3rem",
          }}
        />
        <span>Document</span>
      </div>
      <div className="chat-file poll">
        <PollIcon
          sx={{
            color: "#f9fafb",
            fontSize: "2.3rem",
          }}
        />
        <span>Poll</span>
      </div>
    </section>
  );
};

export default AppLayout()(Chat);
