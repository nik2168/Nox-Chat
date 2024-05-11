import { Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const GroupChats = ({ data, isLoading }) => {

  const myChats = data?.mychats || [];

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>{myChats?.map((chat, index) => {
            const { _id, name, avatar, groupChat, members } = chat;
            if (!groupChat) return;
            return (
              <div
                // onContextMenu={(e) =>
                //   handleDeleteChatOpen(e, userid, groupChat)
                // }
                className="person-div"
                key={index}
              >
                <div className="person-dp">
                  <div className="groupbg1"> </div>
                  <div className="groupbg2"></div>
                  <img src={avatar.url} alt="" className="group-image" />
                </div>
                <Link to={`/chat/${_id}`} className="person-details">
                  <h5>{name}</h5>
                  <span>{"lastMessage"}</span>
                </Link>
                <span className="person-time">{"03:03 am"}</span>
                <span className="person-notification-count">
                  {'3'}
                </span>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default GroupChats;
