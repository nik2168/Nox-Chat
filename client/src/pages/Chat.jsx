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
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import ChatSettings from '../components/ChatComp/ChatSettings';
import Messages from '../components/ChatComp/Messages';
import GroupSettings from "../components/ChatComp/groupsettings";
import { getSocket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import {NEW_MESSAGE} from "../constants/events.js"
import { useGetChatDetailsQuery } from "../redux/api/api.js";
import { useErrors } from "../hooks/hook.jsx";
import { Skeleton } from "@mui/material";



const Chat = () => {

  const { chatid } = useParams();
  console.log(chatid)

  const {user} = useSelector((state) => state.auth)

  // fetching current chat details according to chatid
    const populate = true;
    const { isLoading, data, error, isError, refetch } = useGetChatDetailsQuery(
      chatid,
      populate
    );

    useErrors(error, isError);

    

  const curChat = data?.curchat;

const members = curChat?.members

  const [list, setlist] = useState([]);

  // useEffect(()=> {
  // setlist(chats);
  // }, [chatid])

  const socket = getSocket();

  const [message, setcurmessage] = useState("");

  const chat = useRef(); // ref to chat

  const groupsetting = useRef();

  const messageSubmitHandler = (e) => {
    e.preventDefault()
    if(!message.trim()) return;

    // emitting message to the server ...
socket.emit(NEW_MESSAGE, {chatid, members, message})

    setcurmessage("")
  }

  return (
    isLoading ? <Skeleton/> :
    <section className="chat" ref={chat}>
      <GroupSettings groupsetting={groupsetting} curChat={curChat} />

      <div className="chat-person-div">
        <div
          className="person-dp"
          onClick={() => groupsetting.current.classList.add("active")}
        >
          <img src={curChat?.avatar?.url} alt="img" className="person-image" style={{height: "70px", width:"70px"}}/>
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

      <ChatSettings setlist={setlist} />

      <Messages user={curChat} list={list} chat={chat} />

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
          onClick={(e) => {
            e.preventDefault();
            setlist([...list, message]);
            setcurmessage("");
          }}
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
}

export default AppLayout()(Chat);
