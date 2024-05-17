import { Cancel, NoteAddOutlined, Search } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { userdata } from "../../assets/rawusers";
import { useSearchFilter } from "../../hooks/SearchFilter";
import { useErrors } from "../../hooks/hook";
import { useFetchUserFriendsQuery } from "../../redux/api/api";
import GroupNext from "./groupnext";
import { Skeleton } from "@mui/material";

const CreateGroup = () => {
  const creategroup = useRef();
  const groupnext = useRef();
  const friendlistref = useRef();

  const [curimage, setImage] = useState('');
  const [file, setFile] = useState('');
  const [name, setname] = useState('');

  const [selectedmembers, setMember] = useState([]);


  // fetching all the friends of curr user
  const { isLoading, data, isError, error, refetch } =
    useFetchUserFriendsQuery();
  useErrors([{ isError, error }]);
  const friends = data?.allFriends;

    const [allmembers, setallmembers] = useState([]);

    useEffect(() => {
     setallmembers(friends)
    }, [friends])

  return (
    <>
      <div
        className="allchats-addgroup"
        onClick={() => {
          if (!creategroup.current.classList.contains("groupactive")) {
            creategroup.current.classList.add("groupactive");
            return;
          }
          creategroup.current.classList.remove("groupactive");
          creategroup.current.classList.remove("move");
          setMember([]);
          for (const child of friendlistref.current.children) {
            child.lastChild.lastChild.checked = false;
          }
          setname("");
          setFile("");
          setImage(
            ""
          );
          setMember([]);
          groupnext.current.classList.remove("active");
        }}
      >
        <NoteAddOutlined />
      </div>

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
            const person = allmembers.find(
              (friend) => friend?._id.toString() === i.toString()
            );
            return (
              <li className="addedmembers" key={index}>
                <img
                  src={person?.avatar?.url}
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
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

        <div className="search-div">
          <input
            type="text"
            placeholder="Search ..."
            style={{
              backgroundColor: "#ffffff1d",
            }}
            className="search"
            onChange={(e) => {
              const newlist = useSearchFilter(e.currentTarget.value, friends);
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
        {isLoading ? (
          <Skeleton />
        ) : (
          <ul className="friendlist" ref={friendlistref}>
            {allmembers?.map((friend, index) => {
              const { _id, name, avatar } = friend;
              return (
                <button
                  className="friendlistdivs"
                  key={index}
                  value={friend?._id}
                  onClick={(e) => {
                    if (e.currentTarget.lastChild.lastChild.checked == false) {
                      setMember([...selectedmembers, e.currentTarget.value]);

                      e.currentTarget.lastChild.lastChild.checked = true;
                      return;
                    }
                    const newlist = selectedmembers.filter((i) => {
                      return i.toString() !== e.currentTarget.value.toString();
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
                      src={avatar?.url}
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
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
                    <p>{name} </p>
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
                      value={_id}
                      style={{
                        width: "30%",
                        height: "80%",
                        accentColor: "#2d99ff",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </ul>
        )}
      </article>

      <GroupNext
        groupnext={groupnext}
        friends={friends}
        selectedmembers={selectedmembers}
        setMember={setMember}
        curimage={curimage}
        setImage={setImage}
        name={name}
        setname={setname}
        file={file}
        setFile={setFile}
        friendlistref={friendlistref}
        creategroup={creategroup}
      />
    </>
  );
};

export default CreateGroup;
