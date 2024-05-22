import React, { useCallback, useState } from "react";
import "../../Css/allchats.css";
import "../../Css/chat.css";
import "../../Css/creategroup.css";
import "../../Css/groupsettings.css";
import "../../Css/login.css";
import "../../Css/navbar.css";
import "../../Css/responsiveAllChats.css";
import "../../Css/responsiveChat.css";
import "../../Css/responsiveNavbar.css";
import Title from "../shared/Title";
import Navbar from "./Navbar";

import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  START_TYPING,
  STOP_TYPING,
} from "../../constants/events.js";
import { useSocketEvents } from "../../hooks/hook.jsx";
import { getSocket } from "../../socket.jsx";
import AllChats from "../ChatList/allChats";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotification,
  setAllChatsTyping,
  setNewMessagesAlert,
  setTyping,
} from "../../redux/reducer/chat.js";
import { useParams } from "react-router-dom";

const AppLayout = () => (WrapComp) => {
  return (props) => {
    const { isTyping } = useSelector((state) => state.chat); // Cur User

    const { chatid } = useParams();

    const [curnav, setnav] = useState("chats");
    const dispatch = useDispatch();

    const socket = getSocket();

    const newMessagesAlert = useCallback(
      (data) => {
        if (chatid === data?.chatid) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatid]
    );

    const newRequestAlert = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const startTypingListner = useCallback(
      (data) => {
        dispatch(
          setAllChatsTyping({ isTyping: true, typingChatid: data?.chatid, name: data?.username })
        );
        if (data?.chatid.toString() !== chatid.toString()) return;
        dispatch(setTyping(true));
      },
      [chatid]
    );

    const stopTypingListner = useCallback(
      (data) => {
        dispatch(
          setAllChatsTyping({
            isTyping: false,
            typingChatid: data?.chatid,
          })
        );

        if (data?.chatid.toString() !== chatid.toString()) return;
        dispatch(setTyping(false));
      },
      [chatid]
    );

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlert,
      [NEW_REQUEST]: newRequestAlert,
      [START_TYPING]: startTypingListner,
      [STOP_TYPING]: stopTypingListner,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <main>
          <Navbar setnav={setnav} curnav={curnav} />
          <AllChats curnav={curnav} />
          <WrapComp chatid={chatid} />
        </main>
      </>
    );
  };
};

export default AppLayout;
