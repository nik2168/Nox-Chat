import React, { useState } from "react";
import moment from "moment";
import RenderAttachment from "./RenderAttachment";
import { fileFormat } from "../../lib/features";




const Messages = ({ chat, list,  user }) => {
// let currentDate = new Date();

  return (
    <article
      className="chat-texts"
      onClick={() => {
        chat.current.classList.remove("active-files");
        chat.current.classList.remove("activesettings");
      }}
    >

      {list.map((i, index) => {
      
        const {attachments, content, createdAt, sender} =  i;
          const timeAgo = moment(createdAt).fromNow();
            const samesender = user?._id == sender?._id;
      { return !samesender ? (
        <div key={index} className="textsinboxOuterDiv">
          <div className="textsinboxdiv">
            <p className="textsender">{sender.name}</p>

            {attachments.length > 0 &&
              attachments.map((i, index) => {
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
                      <RenderAttachment key={index} url={i.url} file={file} />;
                    </a>
                  </div>
                );
              })}

            <p className="textsinboxp">{content}</p>
            <p className="textsinboxtimeStamps">{timeAgo}</p>
          </div>
        </div>
      ) : (
        <div key={index} className="textssentOuterDiv">
          <div className="textssentdiv">

            {attachments.length > 0 &&
              attachments.map((i, idx) => {
                const url = i.url;
                const file = fileFormat(url);

                return (
                  <div
                    key={idx}
                    style={{
                      height: "300px",
                      width: "200px",
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
        </div>
      );
      }
      })}
    </article>
  );
};

export default Messages;
