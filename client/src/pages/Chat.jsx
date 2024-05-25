import { useInfiniteScrollTop } from "6pp";
import {
  Add,
  EmojiEmotions,
  MoreVert,
  Send,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import ChatFilesMenu from "../components/ChatComp/ChatFilesMenu.jsx";
import ChatSettings from "../components/ChatComp/ChatSettings";
import Messages from "../components/ChatComp/Messages";
import GroupSettings from "../components/ChatComp/groupsettings";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import {
  useGetChatDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/api.js";
import { getSocket } from "../socket";
import {
  removeNewMessagesAlert,
  setNewGroupAlert,
  setTyping,
} from "../redux/reducer/chat.js";
import AddMembers from "../components/ChatComp/AddMembers.jsx";

const Chat = ({ chatid, allChats }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Cur User
  const { isTyping } = useSelector((state) => state.chat);
  const { allChatsIsTyping } = useSelector((state) => state.chat); // Cur User
  const { newGroupAlert } = useSelector((state) => state.chat); // Cur User

  const [message, setcurmessage] = useState(""); // CurMessage
  const [messages, setMessages] = useState([]); // Messages List
  const [page, setPage] = useState(1);
  const [imTyping, setImTyping] = useState(false);

  const scrollElement = useRef(); // for infinite scroll

  const groupsetting = useRef();

  const clearTime = useRef();

  const addMemberWindow = useRef();

  const chat = useRef(); // ref to chat

  const chatDetails = useGetChatDetailsQuery({ chatid, populate: true });
  const oldMessagesChunk = useGetMessagesQuery({ chatid, page });

  const error = [
    { error: chatDetails?.error, isError: chatDetails?.isError },
    { error: oldMessagesChunk?.error, isError: oldMessagesChunk?.isError },
  ];

  useErrors(error);

  const curChat = chatDetails?.data?.curchat;
  const members = curChat?.members;

  // infinite scroll
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    scrollElement,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.messages
  );

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatid));

    return () => {
      setOldMessages([]);
      setPage(1);
      setMessages([]);
      setcurmessage("");
    };
  }, [chatid]);

  const allMessages = [...oldMessages, ...messages];

  const socket = getSocket();

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // emitting message to the server ...
    socket.emit(NEW_MESSAGE, { chatid, members, message });

    setcurmessage("");
  };

  const onChangeHandler = (e) => {
    setcurmessage(e.target.value);
    const filteredMembers = members.filter(
      (i) => i._id.toString() !== user._id.toString()
    );
    if (!imTyping) {
      socket.emit(START_TYPING, {
        filteredMembers,
        chatid,
        username: user.name,
      });
      setImTyping(true);
    }

    if (clearTime.current) clearTimeout(clearTime.current);

    clearTime.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { filteredMembers, chatid });
      setImTyping(false);
    }, [2000]);
  };

  // will use newMessages function inside useCallback so that it won't created everytime we got new message
  const newMessageListner = useCallback(
    (data) => {
      if (data?.chatid.toString() !== chatid.toString()) return;
      setMessages((pre) => [...pre, data.message]);
    },
    [chatid]
  );

  const alertListener = useCallback(
    (data) => {
      console.log(chatid, data);
      if (data?.chatid?.toString() !== chatid?.toString()) return;
      setNewGroupAlert(dispatch(data));
    },
    [chatid]
  );

  const events = {
    [NEW_MESSAGE]: newMessageListner,
    [ALERT]: alertListener,
  };

  useSocketEvents(socket, events); // using a custom hook to listen for events array

  return chatDetails?.isLoading ? (
    <Skeleton className="chat" />
  ) : (
    <section className="chat" ref={chat}>
      <GroupSettings
        groupsetting={groupsetting}
        curChat={curChat}
        addMemberWindow={addMemberWindow}
        chatid={chatid}
      />

      <div className="chat-person-div">
        <button
          className="backButton"
          onClick={(e) => {
            allChats.current.style.zIndex = "4";
          }}
        >
          <ArrowBackIosNew sx={{ width: "2rem", height: "2rem" }} />
        </button>
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
          {isTyping && (
            <span className="chatonlinespan">
              {allChatsIsTyping?.typingChatid.toString() ===
                chatid.toString() &&
                allChatsIsTyping?.isTyping &&
                `${allChatsIsTyping?.name} : `}
              typing ...
            </span>
          )}
          {/* {isOnline ? <span>Online</span> : <span>Offline</span>} */}
        </div>
        <span
          className="morevert chatsettingsSpan"
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

      <Messages
        user={user}
        scrollElement={scrollElement}
        allMessages={allMessages}
        chat={chat}
        chatid={chatid}
        messages={messages}
      />

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
            onChange={(e) => onChangeHandler(e)}
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

      <ChatFilesMenu chat={chat} chatid={chatid} />
    </section>
  );
};

export default AppLayout()(Chat);
