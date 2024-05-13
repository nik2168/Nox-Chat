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

 const curuser = {
   _id: "1",
   name: "Nik",
 };

const Chat = ({userdata}) => {
    const { chatid } = useParams();

      const [list, setlist] = useState([]);

    const user = userdata.find((i) => i.userid === chatid);
    const { name, isOnline, avatar, groupChat, chats } = user;
    
    useEffect(()=> {
    setlist(chats);
    }, [chatid])

  const [curmessage, setcurmessage] = useState("");

  const chat = useRef(); // ref to chat

  const groupsetting = useRef()

  return (
    <section className="chat" ref={chat}>

      <GroupSettings groupsetting={groupsetting} user={user} />

      <div className="chat-person-div">
        <div className="person-dp" onClick={() => groupsetting.current.classList.add('active')}>
          <img src={avatar} alt="" className="person-image" />
          {isOnline && <div className="online"></div>}
        </div>
        <div className="chat-person-details">
          <h5>{name}</h5>
          {isOnline ? <span>Online</span> : <span>Offline</span>}
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

      <Messages user={curuser} list={list} chat={chat} />

      <form
        className="chat-message-div"
        onSubmit={(e) => {
          e.preventDefault();
          setlist([...list, curmessage]);
          setcurmessage("");
        }}
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
            value={curmessage}
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
            setlist([...list, curmessage]);
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
