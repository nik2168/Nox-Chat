import { FilterList, Search } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
const SingleChats = lazy(() =>
  import("../ChatList/SingleChats")
);
const CreateNewGroup = lazy(() =>
  import("./CreateNewGroup")
);
const CurNotifications = lazy(() =>
  import("./CurNotifications")
);

const AllChats = ({
  curnav,
  allChats,
  navbarref,
  isLoading,
  data,
  setSearch,
  search,
}) => {
  const [curChats, setChats] = useState([]);

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

          <Suspense fallback={<Skeleton />}>
            <CurNotifications />
          </Suspense>

          <Suspense fallback={<Skeleton />}>
            <CreateNewGroup />
          </Suspense>
        </div>

        <div className="search-div">
          <input
            type="search"
            name="search"
            id="search"
            className="search"
            placeholder="Search . . ."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
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
        {curnav === "chats" &&
          (isLoading ? (
            <Skeleton />
          ) : (
            <Suspense fallback={<Skeleton />}>
              <SingleChats
                data={data}
                handleDeleteChatOpen={handleDeleteChatOpen}
                allChats={allChats}
                navbarref={navbarref}
              />
            </Suspense>
          ))}
      </article>
    </section>
  );
};

export default AllChats;
