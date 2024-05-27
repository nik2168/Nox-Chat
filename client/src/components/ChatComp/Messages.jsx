import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { Box } from "@mui/material";

const Messages = ({ chat, allMessages, user, scrollElement, chatid, messages }) => {
  const { newGroupAlert } = useSelector((state) => state.chat);

  const autoScrollDiv = useRef()

  useEffect(() => {
    if(autoScrollDiv.current) autoScrollDiv.current.scrollIntoView({behaviour: "smooth"})
  }, [messages])

  return (
    <ul
      className="chat-texts"
      ref={scrollElement}
      onClick={() => {
        chat.current.classList.remove("active-files");
        chat.current.classList.remove("activesettings");
      }}
    >
      {newGroupAlert?.isNewAlert && <p>{newGroupAlert.message}</p>}

      {allMessages?.map((i) => {
        const { _id, content, isAlert, attachments, sender } = i;
        const timeAgo = moment(sender?.createdAt).format("HH:MM");
        const samesender = user?._id.toString() === sender?._id.toString();


        {
          return !samesender ? (


        isAlert  ?       
      <div key={_id} className="chatmessagesalert">
        <div className="messagealertinnerdiv">
          <p>{content}</p>
        </div>
      </div> :

            <li key={_id} className="textsinboxOuterDiv">
              <div className="textsinboxdiv">
                {/* <p className="textsender">{sender.name}</p> */}

                {attachments?.length > 0 &&
                  attachments?.map((i, index) => {
                    const url = i.url;
                    const file = fileFormat(url);

                    return (
                      <Box
                        key={index}
                      >
                        <a href={url} target="_blank" download>
                          {RenderAttachment(file, url)}
                        </a>
                      </Box>
                    );
                  })}

                <p className="textsinboxp">{content}</p>
                {/* <p className="textsinboxtimeStamps">{timeAgo}</p> */}
              </div>
            </li>
          ) : (


        isAlert  ?       
      <div key={_id} className="chatmessagesalert">
        <div className="messagealertinnerdiv">
          <p>{content}</p>
        </div>
      </div> :
            <li key={_id} className="textssentOuterDiv">
              <div className="textssentdiv">
                {attachments?.length > 0 &&
                  attachments?.map((i, idx) => {
                    const url = i.url;
                    const file = fileFormat(url);

                    return (
                      <Box key={_id}>
                        <a href={url} target="_blank" download>
                          {RenderAttachment(file, url)}
                        </a>
                      </Box>
                    );
                  })}

                <p className="textssentp">{content}</p>
                {/* <p className="textssenttimeStamps">{timeAgo}</p> */}
              </div>
            </li>
          );
        }
      })}


      <div ref={autoScrollDiv}></div>
    </ul>
  );
};

export default Messages;
