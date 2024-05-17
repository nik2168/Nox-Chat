import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Title from "../shared/Title";
import "../../Css/allchats.css";
import "../../Css/navbar.css";
import "../../Css/login.css";
import "../../Css/chat.css";
import "../../Css/creategroup.css";
import "../../Css/groupsettings.css";
import "../../Css/responsiveAllChats.css";
import "../../Css/responsiveChat.css";
import "../../Css/responsiveNavbar.css";
import { userdata } from "../../assets/rawusers";

import AllChats from "../ChatList/allChats";
import { getSocket } from "../../socket.jsx";

const AppLayout = () => (WrapComp) => {
  return (props) => {
    const [curnav, setnav] = useState("chats");

     const socket = getSocket();
    useEffect(() => {
 console.log(socket?.id);
    }, [socket])
   

    return (
      <>
        <Title />
        <main>
          <Navbar setnav={setnav} curnav={curnav} />
          <AllChats curnav={curnav} />
          <WrapComp userdata={userdata} />
        </main>
      </>
    );
  };
};

export default AppLayout;
