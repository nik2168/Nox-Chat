import React, { useEffect, useRef, useState } from "react";
import { Cancel, Search, Forward, ArrowBack } from "@mui/icons-material";
import { useSearchFilter } from "../../hooks/SearchFilter";

const CreateGroup = ({
  creategroup,
  userdata,
  groupnext,
  selectedmembers,
  setMember,
  friendlistref,
}) => {
  const [allmembers, setallmembers] = useState(userdata);

  return (
    <article className="creategroup" ref={creategroup}>
      <div className="groupheadingdiv">
        <h3>Create Group</h3>
        <button
          type="button"
          className="groupnextbtn"
          onClick={() => {
            if (
              !groupnext.current.classList.contains("active") &&
              selectedmembers.length
            ) {
              groupnext.current.classList.add("active");
              creategroup.current.classList.add("move");
              return;
            }
            groupnext.current.classList.remove("active");
          }}
        >
          NEXT
        </button>
      </div>

      <ul className="selectedmembers">
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

      <div className="search-div">
        <input
          type="text"
          style={{
            backgroundColor: "#ffffff1d",
          }}
          className="search"
          onChange={(e) => {
            const newlist = useSearchFilter(e.currentTarget.value, userdata);
            setallmembers(newlist);
          }}
        />
        <Search
          sx={{
            color: "#F9FAFB",
            position: "absolute",
            left: "9%",
          }}
        />
      </div>

      <ul className="friendlist" ref={friendlistref}>
        {allmembers.map((i, index) => {
          const {
            userid,
            name,
            avatar,
            isOnline,
            groupChat,
            membets,
            lastMessage,
            lastMessageTime,
            notifications,
            chats,
          } = i;

          if (groupChat) return;

          return (
            <li
              className="friendlistdivs"
              key={index}
              value={userid}
              onClick={(e) => {
                if (e.currentTarget.lastChild.lastChild.checked == false) {
                  setMember([...selectedmembers, e.currentTarget.value]);
                  e.currentTarget.lastChild.lastChild.checked = true;
                  return;
                }
                const newlist = selectedmembers.filter((i) => {
                  return i !== Number(e.currentTarget.value);
                });
                setMember(newlist);
                e.currentTarget.lastChild.lastChild.checked = false;
              }}
            >
              <div
                style={{
                  height: "2rem",
                  width: "4rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={avatar}
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingLeft: "0",
                  margin: "0",
                  width: "70%",
                  height: "100%",
                }}
              >
                <h5>{name} </h5>
              </div>

              <div
                style={{
                  width: "20%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  value={userid}
                  style={{
                    width: "30%",
                    height: "80%",
                    borderRadius: "1rem",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default CreateGroup;
