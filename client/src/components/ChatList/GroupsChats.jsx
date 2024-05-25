import { Skeleton } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrSaveFromStorage, transformImage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";
import { useGetGroupsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";

const GroupChats = ({ allChats, chat }) => {
  const { allChatsIsTyping } = useSelector((state) => state.chat); // Cur User

  const { newMessageAlert } = useSelector((state) => state.chat);
  const { typing } = useSelector((state) => state.chat);

  // const { isError, error, data, isLoading, refetch } = useGetGroupsQuery();
  // useErrors([{ isError, error }]);

  // useEffect(() => {
  //   getOrSaveFromStorage({
  //     key: NEW_MESSAGE_ALERT,
  //     value: newMessageAlert,
  //   });
  // }, [newMessageAlert]);

  // const groupChats = data?.groupChats;

  const { _id, name, avatar, groupChat } = chat;

  const msgAlert = newMessageAlert?.find(
    (i) => i.chatid.toString() === _id.toString()
  );
  const notificationCount = msgAlert?.count || 0;
  const messageAlert = msgAlert?.message || "No new message";
  let msg = messageAlert?.content?.slice(0, 18) || [];
  if (msg.length === 18) msg += "...";

  let startTyping = false;
  let whoIsTyping;
  if (_id.toString() === allChatsIsTyping.typingChatid.toString()) {
    whoIsTyping = allChatsIsTyping.name;
    startTyping = allChatsIsTyping.isTyping;
  }

  if (!groupChat) return;

  return (
    <>
      <div
        // onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
        className="person-div"
      >
        <div className="person-dp">
          <div className="groupbg1"> </div>
          <div className="groupbg2"></div>
          <img
            src={
              transformImage(avatar) ||
              "https://res.cloudinary.com/dki615p7n/image/upload/v1715486888/default_avatar_tvgr8w.jpg"
            }
            alt=""
            className="group-image"
            style={{ height: "58px", width: "58px" }}
          />
        </div>
        <Link
          to={`/chat/${_id}`}
          className="person-details"
          onClick={() => (allChats.current.style.zIndex = "0")}
        >
          <h5>{name}</h5>
          {startTyping ? (
            <span style={{ color: "yellowgreen" }}>
              {groupChat && `${whoIsTyping} : `}typing ...
            </span>
          ) : (
            <span>{msg}</span>
          )}
        </Link>
        <span className="person-time">
          {moment(messageAlert?.sender?.createdAt).format("HH:MM")}
        </span>
        {notificationCount !== 0 && (
          <span className="person-notification-count">{notificationCount}</span>
        )}
      </div>
    </>
  );
};

export default GroupChats;
