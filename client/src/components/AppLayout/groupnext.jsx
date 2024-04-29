import { ArrowBack, CameraAlt, Cancel, Settings } from "@mui/icons-material";
import React, { useRef, useState } from "react";

const GroupNext = ({
  selectedmembers,
  setMember,
  groupnext,
  userdata,
  creategroup,
  friendlistref,
  newgroup,
  setNewGroup,
  file,
  setFile,
  fileFlag,
  fileErr,
  curname,
  setname,
  nameFlag,
  nameErr,
}) => {

  
  const currentImage = useRef();
  const [check, setcheck] = useState(""); // for errors in inputs



  const handleImageChange = (e) => {
    if (e.target.files[0].size > 3000000) {
      setcheck("Img size must be < 1mb");
    }
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <article className="groupnext" ref={groupnext}>
      <div className="groupheadingdiv">
        <button
          type="button"
          className="groupbackbtn"
          onClick={() => {
            groupnext.current.classList.remove("active");
            creategroup.current.classList.remove("move");
            setname("");
            setFile("");
          }}
        >
          <ArrowBack />
        </button>

        <h3>Group Details</h3>

        <button
          type="button"
          className="groupnextbtn"
          onClick={() => {
            if (!fileFlag) {
              setcheck(fileErr);
              return;
            }
            if (!nameFlag) {
              setcheck(nameErr);
              return;
            }
            setNewGroup((previousstate) => {
              return {
                ...previousstate,
                members: { selectedmembers },
                name: { curname },
                avatar: { file },
              };
            });
            userdata.push(newgroup);
            creategroup.current.classList.remove("groupactive");
            creategroup.current.classList.remove("move");
            setMember([]);
            setname("");
            setFile("");
            for (const child of friendlistref.current.children) {
              child.lastChild.lastChild.checked = false;
            }
            setNewGroup({
              userid: "4",
              name: "",
              avatar: "",
              groupChat: true,
              members: [],
              lastMessage: "Hi Guys!",
              lastMessageTime: "11:30",
              notifications: "1",
              chats: ["hi guys", "our new group is here!🫵"],
            });
            groupnext.current.classList.remove("active");
          }}
        >
          Create
        </button>
      </div>

      <div
        style={{
          height: "20%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="avatar"
          style={{
            position: "relative",
          }}
        >
          <div className="image-border">
            <img src={file} className="image-border" />
          </div>

          <div
            className="photo"
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              right: "0",
              bottom: "0",
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
              onChange={handleImageChange}
              ref={currentImage}
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
              onChange={(e) => {
                setname(e.target.value);
                setNewGroup((previousstate) => {
                  return { ...previousstate, name: e.target.value };
                });
              }}
              style={{
                backgroundColor: "transparent",
                color: "#F9FAFB",
                border: "none",
                fontSize: "1.2rem",
                outline: "none",
                fontWeight: "600",
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

      <ul className="nextselectedmembers">
        {selectedmembers.map((i, index) => {
          const person = userdata.find((j) => Number(j.userid) === i);
          return (
            <li className="addedmembers" key={index}>
              <img
                src={person.avatar}
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                }}
                alt=""
              />
              <button
                className="cancelbutton"
                value={person.userid}
                onClick={(e) => {
                  const newlist = selectedmembers.filter((i) => {
                    return i !== Number(e.currentTarget.value);
                  });
                  for (const child of friendlistref.current.children) {
                    if (child.value == e.currentTarget.value)
                      child.lastChild.lastChild.checked = false;
                  }
                  setMember(newlist);
                }}
              >
                <Cancel />
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default GroupNext;
