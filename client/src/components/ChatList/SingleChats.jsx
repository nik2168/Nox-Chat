import { Skeleton } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


const SingleChats = ({data, isLoading}) => {

  const myChats = data?.mychats
console.log(myChats)

  return (
    <>
    {isLoading? <Skeleton/> : <>
    {myChats?.map((chat, index) => {
        const {
          _id,
          name,
          avatar,
          groupChat,
          members,
        } = chat;
        if(groupChat) return;
        return (
          <div
            // onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
            className="person-div"
            key={index}
          >
            <div className="person-dp">
              <img src={avatar.url} alt="" className="person-image"/>
              {false && <div className="online"></div>}
            </div>
            <Link to={`/chat/${_id}`} className="person-details">
              <h5>{name}</h5>
              <span>{"lastMessage"}</span>
            </Link>
            <span className="person-time">{"09:23 am"}</span>
            <span className="person-notification-count">{"2"}</span>
          </div>
        );
      })}
    </>
}
    </>
  );
}

export default SingleChats