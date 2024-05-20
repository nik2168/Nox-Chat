import React, { useState } from "react";
import moment from "moment";
import RenderAttachment from "./RenderAttachment";
import { fileFormat } from "../../lib/features";
import { Stack } from "@mui/material";




const Messages = ({ chat, allMessages, user, scrollElement }) => {
  // let currentDate = new Date();

  return (
    <ul
      className="chat-texts"
      ref={scrollElement}
      onClick={() => {
        chat.current.classList.remove("active-files");
        chat.current.classList.remove("activesettings");
      }}
    >
      {allMessages?.map((i) => {
        const { _id, content, attachments, sender } = i;
        const timeAgo = moment(sender?.createdAt).format("HH:MM");
        const samesender = user?._id.toString() === sender?._id.toString();
        {
          return !samesender ? (
            <li key={_id} className="textsinboxOuterDiv">
              <div className="textsinboxdiv">
                <p className="textsender">{sender.name}</p>

                {attachments?.length > 0 &&
                  attachments?.map((i, index) => {
                    const url = i.url;
                    const file = fileFormat(url);

                    return (
                      <div
                        style={{
                          height: "150px",
                          width: "200px",
                        }}
                      >
                        <a href={url} target="_blank" download>
                          <RenderAttachment
                            key={index}
                            url={i.url}
                            file={file}
                          />
                          ;
                        </a>
                      </div>
                    );
                  })}

                <p className="textsinboxp">{content}</p>
                <p className="textsinboxtimeStamps">{timeAgo}</p>
              </div>
            </li>
          ) : (
            <li key={_id} className="textssentOuterDiv">
              <div className="textssentdiv">
                {attachments?.length > 0 &&
                  attachments?.map((i, idx) => {
                    const url = i.url;
                    const file = fileFormat(url);

                    return (
                      <div
                        key={idx}
                        style={{
                          height: "200px",
                          width: "300px",
                        }}
                      >
                        <a href={url} target="_blank" download>
                          <RenderAttachment url={i.url} file={file} />;
                        </a>
                      </div>
                    );
                  })}

                <p className="textssentp">{content}</p>
                <p className="textssenttimeStamps">{timeAgo}</p>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Messages;
