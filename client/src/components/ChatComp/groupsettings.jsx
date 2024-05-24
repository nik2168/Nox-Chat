import {
  Add,
  ArrowBack,
  CameraAlt,
  MoreVertTwoTone,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFileValidator, useName } from "../../hooks/InputValidator";
import { userdata } from "../../assets/rawusers";
import AddFriends from "../ChatList/addFriend";
import { setAllFriends, setSelectedFriends } from "../../redux/reducer/createGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import AddMembers from "./AddMembers";
import { useAsyncMutation } from "../../hooks/hook";
import { useRemoveMembersMutation } from "../../redux/api/api";

const GroupSettings = ({ curChat, groupsetting, addMemberWindow, chatid }) => {

  const dispatch = useDispatch();

   const { selectedMembers } = useSelector((state) => state.addmember);

  const { _id, name, avatar, groupChat, members } = curChat;

  const [check, setcheck] = useState(""); // for errors in inputs

  

  const [curmembers, setCurMembers] = useState([]);
  const [file, setFile] = useState("");
  const [curimage, setImage] = useState("");
  const [curname, setname] = useState("");

  useEffect(() => {
     setname(name);
     setImage(avatar?.url);
     setCurMembers(members)
  }, [curChat])
 

    // Remove the selected member
    const [removeMemberMutation, isLoadingRemoveMemberMutation] = useAsyncMutation(useRemoveMembersMutation)
    

  const removeMemberHandler = async (e) => {
     const member = [e.currentTarget.value]
       const data = {
        chatId: chatid,
        remove_members : member,
       }

       const name = members.find((i) => i._id.toString() === e.currentTarget.value.toString()).name

       await removeMemberMutation(`removing ${name} from the group`, data)
  }

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 3000000) {
      setcheck("Img size must be < 3mb");
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <>
      <article className="groupsettings" ref={groupsetting}>
        <div
          className="groupheadingdiv"
          style={{ borderBottom: "1px solid #F4F6F8", marginBottom: "3rem" }}
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
            paddingTop: "1rem",
            paddingBottom: "2rem",
          }}
        >
          <div
            className="avatar"
            style={{
              position: "relative",
            }}
          >
            <div className="gsimagediv">
              <img src={curimage} className="gsimage" />
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
                onChange={(e) => handleImageChange(e)}
                accept="image/png, image/jpeg, image/gif"
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
                  backgroundColor: "transparent",
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

        <ul className="addMemberOUterDiv">
          <button
            className="AddMembersButton"
            onClick={(e) => {
              addMemberWindow.current.classList.add("active");
            }}
          >
            <Add
              sx={{
                fontSize: "2rem",
              }}
            />
          </button>
          <div className="addMembers">
            <p>Add Member</p>
          </div>
        </ul>

        <ul className="groupsettingsmembersdiv">
          {members.map((member, index) => {
            return (
              <li key={index} className="groupsettingsmembers">
                <img
                  src={member?.avatar?.url}
                  style={{
                    objectFit: "cover",
                    height: "3rem",
                    width: "3rem",
                  }}
                  className="groupsettingsimage"
                  alt=""
                />
                <div style={{ width: "70%" }}>
                  <p>{member.name}</p>
                </div>
                <button
                  value={member?._id}
                  className="gsremovebtn"
                  onClick={(e) => removeMemberHandler(e)}
                >
                  remove
                </button>
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
      <AddMembers addMemberWindow={addMemberWindow} chatid={chatid} members={members} />
    </>
  );
};

export default GroupSettings;
