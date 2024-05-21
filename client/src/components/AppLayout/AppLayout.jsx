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

import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events.js";
import { useSocketEvents } from "../../hooks/hook.jsx";
import { getSocket } from "../../socket.jsx";
import AllChats from "../ChatList/allChats";
import { useDispatch, useSelector } from "react-redux";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducer/chat.js";
import { useParams } from "react-router-dom";

const AppLayout = () => (WrapComp) => {
  return (props) => {
    
    const {chatid} = useParams();

    const [curnav, setnav] = useState("chats");
    const dispatch = useDispatch();

    const socket = getSocket();

    const newMessagesAlert = useCallback((data) => {
      if(chatid === data?.chatid) return;
      dispatch(setNewMessagesAlert(data))
    }, [chatid]);

    const newRequestAlert = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlert,
      [NEW_REQUEST]: newRequestAlert,
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
