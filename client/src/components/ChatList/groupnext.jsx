import { ArrowBack, CameraAlt, Cancel, Settings } from "@mui/icons-material";
import React, { useRef, useState } from "react";

const GroupNext = ({
  groupnext,
  friends,
  selectedmembers,
  setMember,
  name,
  setname,
  curimage,
  setImage,
  file,
  setFile,
  friendlistref,
  creategroup,
}) => {
  const [check, setcheck] = useState(""); // for errors in inputs

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 3000000) {
      setcheck("Img size must be < 1mb");
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
            creategroup.current.classList.remove("groupactive");
            creategroup.current.classList.remove("move");
            setMember([]);
            setname("");
            setFile("");
            setImage("");
            for (const child of friendlistref.current.children) {
              child.lastChild.lastChild.checked = false;
            }
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
            <img src={curimage} className="image-border" />
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
              onChange={(e) => handleImageChange(e)}
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
              value={name}
              onChange={(e) => {
                setname(e.currentTarget.value);
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
          const person = friends.find(
            (friend) => friend._id.toString() === i.toString()
          );
          return (
            <li className="addedmembers" key={index}>
              <img
                src={person?.avatar?.url}
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                }}
                alt=""
              />
              <button
                className="cancelbutton"
                value={person?._id}
                onClick={(e) => {
                  const newlist = selectedmembers.filter((i) => {
                    return i.toString() !== e.currentTarget.value.toString();
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
