import { Add, ArrowBack, CameraAlt, MoreVertTwoTone } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useFileValidator, useName } from '../../hooks/InputValidator';
import { userdata } from '../../assets/rawusers';



const GroupSettings = ({user, groupsetting}) => {
  const { name, isOnline, avatar, groupChat, chats, members } = user;

  const [check, setcheck] = useState(""); // for errors in inputs

  const [curmembers, setCurMembers] = useState(members);
  const { file, setFile, fileFlag, fileErr } = useFileValidator(avatar);
  const { curname, setname, nameFlag, nameErr } = useName(name);
   



  return (
    <article className="groupsettings" ref={groupsetting}>
      <div
        className="groupheadingdiv"
        style={{ borderBottom: "1px solid #F4F6F8",
        marginBottom: '3rem'
      }}

      >
        <button
          type="button"
          className="groupbackbtn"
          onClick={() => groupsetting.current.classList.remove("active")}
        >
          <ArrowBack />
        </button>

        <h3 style={{ color: "#F4F6F8" }}>Group Details</h3>

        <button type="button" className="groupnextbtn">
          Save
        </button>
      </div>

      <div
        style={{
          height: "30%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: '1rem',
          paddingBottom: '2rem',

        }}
      >
        <div
          className="avatar"
          style={{
            position: "relative",
          }}
        >
          <div className="gsimagediv">
            <img src={file} className="gsimage" />
          </div>

          <div
            className="photo"
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              right: "0",
              bottom: "0.8rem",
              zIndex: 3,
            }}
          >
            <CameraAlt
              sx={{
                color: "white",
                position: "absolute",
                backgroundColor: "grey",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />
            <input
              type="file"
              id="image"
              style={{
                margin: "0px",
                padding: "0px",
                height: "1.3rem",
                width: "1.3rem",
                position: "relative",
                opacity: 0,
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: "90%",
            width: "80%",
            borderRadius: "0.6rem",
            marginLeft: "1rem",
            backgroundColor: "ffffff6d",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "70%",
              width: "80%",
              borderRadius: "0.6rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Group Name"
              value={curname}
              onChange={(e) => setname(e.target.value)}
              style={{
                backgroundColor: "#161c24",
                width: "10rem",
                height: "3rem",
                borderRadius: "1rem",
                color: "#F9FAFB",
                border: "none",
                fontSize: "1.2rem",
                outline: "none",
                fontWeight: "600",
                textAlign: "center",
              }}
            />
          </div>
        </div>
      </div>

      {check ? (
        <p
          style={{
            height: "1rem",
            fontSize: "0.8rem",
            color: "red",
          }}
        >
          {check}
        </p>
      ) : (
        <p
          style={{
            height: "1rem",
            fontSize: "0.8rem",
            color: "darkred",
            backgroundColor: "red",
          }}
        ></p>
      )}

      <ul className="gsaddmembers">
        <li className="groupsettingsmembers">
          <Add
            sx={{
              fontSize: "3rem",
              backgroundColor: "#454F5B",
              border: "7px solid #454F5B",
              borderRadius: "50%",
              marginRight: "1rem",
            }}
          />
          <div style={{ width: "70%" }}>
            <h4>Add Member</h4>
          </div>
          <div
            style={{
              width: "5rem",
              height: "100%",
            }}
          ></div>
        </li>
      </ul>
      <ul className="groupsettingsmembersdiv">
        {members.map((i, index) => {
          const each = userdata.find((j) => j.userid === i);
          return (
            <li key={index} className="groupsettingsmembers">
              <img src={each.avatar} className="groupsettingsimage" alt="" />
              <div style={{ width: "70%" }}>
                <h4>{each.name}</h4>
              </div>
              <button className="gsremovebtn">remove</button>
            </li>
          );
        })}
      </ul>
      <li className="gsexit">
        <button className="gsexitbtn">Exit Group</button>
      </li>
      <li className="clearchatdiv">
        <button className="clearchat">Clear Chat</button>
      </li>
    </article>
  );
}

export default GroupSettings