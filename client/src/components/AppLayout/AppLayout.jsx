import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Title from "../shared/Title";
import "../../Css/navbar.css";
import "../../Css/allchats.css";
import "../../Css/chat.css";
import "../../Css/responsive.css";
import "../../Css/creategroup.css";
import "../../Css/groupsettings.css";
import { Search, FilterList, NoteAddOutlined } from "@mui/icons-material";
import { userdata } from "../../assets/rawusers";
import SingleChats from "../ChatList/SingleChats";
import GroupChats from "../ChatList/GroupsChats";
import CreateGroup from "./creategroup";
import GroupNext from "./groupnext";
import { useFileValidator, useName } from "../../hooks/InputValidator";

const AppLayout = () => (WrapComp) => {
  return (props) => {
    const [curnav, setnav] = useState("chats");

    // for create group
    const creategroup = useRef();
    const groupnext = useRef();
    const friendlistref = useRef();
    const [selectedmembers, setMember] = useState([]);
    const [newgroup, setNewGroup] = useState({
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
    const { file, setFile, fileFlag, fileErr } = useFileValidator("");
    const { curname, setname, nameFlag, nameErr } = useName("");
 

    const handleDeleteChatOpen = (e, userid, groupchat) => {
      e.preventDefault();
      console.log(`User with id = ${userid} deleted`);
    };

    return (
      <>
        <Title />
        <main>
          <Navbar setnav={setnav} curnav={curnav}/>
          <section className="allchats">
            <div className="allchats-header">
              <div className="allchats-div">
                {curnav === "chats" && <h1>Chats</h1>}
                {curnav === "groups" && <h1>Groups</h1>}
                {curnav === "calls" && <h1>Calls</h1>}
                {curnav === "settings" && <h1>Settings</h1>}
                <div
                  className="allchats-addgroup"
                  onClick={() => {
                    if (
                      !creategroup.current.classList.contains("groupactive")
                    ) {
                      creategroup.current.classList.add("groupactive");
                      return;
                    }
                    creategroup.current.classList.remove("groupactive");
                    creategroup.current.classList.remove("move");
                    setMember([]);
                    for (const child of friendlistref.current.children) {
                      child.lastChild.lastChild.checked = false;
                    }
                    setname('')
                    setFile('')
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
                  <NoteAddOutlined />
                </div>
                <CreateGroup
                  creategroup={creategroup}
                  userdata={userdata}
                  groupnext={groupnext}
                  selectedmembers={selectedmembers}
                  setMember={setMember}
                  friendlistref={friendlistref}
                />
                <GroupNext
                  selectedmembers={selectedmembers}
                  groupnext={groupnext}
                  userdata={userdata}
                  creategroup={creategroup}
                  setMember={setMember}
                  friendlistref={friendlistref}
                  newgroup={newgroup}
                  setNewGroup={setNewGroup}
                  curname={curname}
                  setname={setname}
                  nameFlag={nameFlag}
                  nameErr={nameErr}
                  file={file}
                  setFile={setFile}
                  fileFlag={fileFlag}
                  fileErr={fileErr}
                />
              </div>

              <div className="search-div">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="search"
                  placeholder="Search . . ."
                />
                <Search
                  sx={{
                    color: "#637381",
                    position: "absolute",
                    left: "9%",
                  }}
                />
                <FilterList
                  sx={{
                    color: "#2D99FF",
                    position: "absolute",
                    right: "9%",
                  }}
                />
              </div>
              <hr />
            </div>

            <article className="allchats-users">
              {curnav === "chats" && (
                <SingleChats
                  userdata={userdata}
                  handleDeleteChatOpen={handleDeleteChatOpen}
                />
              )}
              {curnav === "groups" && (
                <GroupChats
                  userdata={userdata}
                  handleDeleteChatOpen={handleDeleteChatOpen}
                />
              )}
            </article>
          </section>

          <WrapComp userdata={userdata} />
        </main>
      </>
    );
  };
};

export default AppLayout;
