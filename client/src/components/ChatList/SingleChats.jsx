import React from 'react'
import { Link } from 'react-router-dom';


const SingleChats = ({userdata, handleDeleteChatOpen}) => {
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
        if(groupChat) return;
        return (
          <div
            onContextMenu={(e) => handleDeleteChatOpen(e, userid, groupChat)}
            className="person-div"
            key={index}
          >
            <div className="person-dp">
              <img src={avatar} alt="" className="person-image" />
              {isOnline && <div className="online"></div>}
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
}

export default SingleChats