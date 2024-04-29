import React from "react";
import { Link } from "react-router-dom";

const GroupChats = ({ userdata, handleDeleteChatOpen }) => {
  return (
    <>
      {userdata?.map((i, index) => {
        const {
          userid,
          name,
          avatar,
          isOnline,
          groupChat,
          membets,
          lastMessage,
          lastMessageTime,
          notifications,
          chats,
        } = i;
        if(!groupChat) return;
        return (
          <div
            onContextMenu={(e) => handleDeleteChatOpen(e, userid, groupChat)}
            className="person-div"
            key={index}
          >
            <div className="person-dp">
              <div className="groupbg1"> </div>
              <div className="groupbg2"></div>
              <img src={avatar} alt="" className="group-image" />
            </div>
            <Link to={`/chat/${userid}`} className="person-details">
              <h5>{name}</h5>
              <span>{lastMessage}</span>
            </Link>
            <span className="person-time">{lastMessageTime}</span>
            <span className="person-notification-count">{notifications}</span>
          </div>
        );
      })}
    </>
  );
};

export default GroupChats;
