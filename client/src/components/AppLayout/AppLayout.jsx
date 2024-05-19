import React, { useState } from "react";
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

import { getSocket } from "../../socket.jsx";
import AllChats from "../ChatList/allChats";
import { useGetChatDetailsQuery, useMyChatsQuery } from "../../redux/api/api.js";
import { useErrors } from "../../hooks/hook.jsx";

const AppLayout = () => (WrapComp) => {
  return (props) => {
    const [curnav, setnav] = useState("chats");

    const socket = getSocket();

    // useEffect(() => {
    // }, [socket])






    return (
      <>
        <Title />
        <main>
          <Navbar setnav={setnav} curnav={curnav} />
          <AllChats curnav={curnav} />
          <WrapComp />
        </main>
      </>
    );
  };
};

export default AppLayout;
