import { FilterList, Search } from "@mui/icons-material";
import React from "react";
import { useFileValidator, useName } from "../../hooks/InputValidator";
import { useErrors } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import SingleChats from "../ChatList/SingleChats";
import CreateNewGroup from "./CreateNewGroup";
import CurNotifications from "./CurNotifications";
import AddFriends from "./addFriend";

const AllChats = ({ curnav, chat, allChats }) => {
  // for create group

  const { file, setFile, fileFlag, fileErr } = useFileValidator("");
  const { curname, setname, nameFlag, nameErr } = useName("");

  // my chats fetching ...
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  useErrors([{ isError, error }]);

  const handleDeleteChatOpen = (e, userid, groupchat) => {
    e.preventDefault();
    console.log(`User with id = ${userid} deleted`);
  };

  return (
    <section className="allchats" ref={allChats}>
      <div className="allchats-header">
        <div className="allchats-div">
          {curnav === "chats" && <h1>Chats</h1>}
          {curnav === "Nox Verse" && <h1>Nox Verse</h1>}
          {curnav === "calls" && <h1>Calls</h1>}
          {curnav === "settings" && <h1>Settings</h1>}

          <div className="headerAllChats"></div>

          <CurNotifications />

          <CreateNewGroup />
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
              left: "2.8rem",
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
            data={data}
            isLoading={isLoading}
            handleDeleteChatOpen={handleDeleteChatOpen}
            allChats={allChats}
          />
        )}
      </article>
    </section>
  );
};

export default AllChats;
