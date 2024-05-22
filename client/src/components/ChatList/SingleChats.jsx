import { Skeleton } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrSaveFromStorage } from '../../lib/features';
import { NEW_MESSAGE_ALERT } from '../../constants/events';


const SingleChats = ({data, isLoading}) => {

      const { allChatsIsTyping } = useSelector((state) => state.chat); // Cur User


const { newMessageAlert } = useSelector((state) => state.chat)
const { typing } = useSelector((state) => state.chat)

useEffect(() => {

  getOrSaveFromStorage({key: NEW_MESSAGE_ALERT, value: newMessageAlert, })
}, [newMessageAlert])

  const myChats = data?.mychats

  return (
    <>
    {isLoading? <Skeleton/> : <>
    {myChats?.map((chat, index) => {
        const {
          _id,
          name,
          avatar,
          groupChat,
        } = chat;
 
      const msgAlert = newMessageAlert?.find((i) => i.chatid.toString() === _id.toString())
      const notificationCount = msgAlert?.count || 0;
      const messageAlert = msgAlert?.message ||  "No new message";
      let msg = messageAlert?.content?.slice(0, 18) || [];
      if(msg.length === 18) msg += "..."

      let startTyping = false;
      if (_id.toString() === allChatsIsTyping.typingChatid.toString())
        startTyping = allChatsIsTyping.isTyping;

        if(groupChat) return;
        return (
          <div
            // onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
            className="person-div"
            key={index}
          >
            <div className="person-dp">
              <img
                src={
                  avatar ||
                  "https://res.cloudinary.com/dki615p7n/image/upload/v1715486888/default_avatar_tvgr8w.jpg"
                }
                alt=""
                className="person-image"
                style={{ height: "70px", width: "70px" }}
              />
              {false && <div className="online"></div>}
            </div>
            <Link to={`/chat/${_id}`} className="person-details">
              <h5>{name}</h5>
              {startTyping ? <span style={{color: "green"}}>typing ...</span> : <span>{msg}</span>}
           
            </Link>
            <span className="person-time">
              {moment(messageAlert?.sender?.createdAt).format("HH:MM")}
            </span>
            {notificationCount !== 0 && (
              <span className="person-notification-count">
                {notificationCount}
              </span>
            )}
          </div>
        );
      })}
    </>
}
    </>
  );
}

export default SingleChats

