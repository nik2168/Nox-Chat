import React, { useEffect, useRef, useState } from "react";
import { Search, Add, AddCircle } from "@mui/icons-material";
import { useLazySearchUserQuery } from "../../redux/api/api";




const AddFriends = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  

// fetch users except friends
  const [searchUser] = useLazySearchUserQuery("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);


  const addUserWindow = useRef();

  const handleAddUsers =  () => {
    
        if(!addUserWindow.current.classList.contains("active")){
                addUserWindow.current.classList.add("active");
                return
        }
             addUserWindow.current.classList.remove("active");
  }

  return (
    <>
      <div className="allchats-addusers" onClick={() => handleAddUsers()}>
        <Add sx={{ height: "1.8rem", width: "1.8rem" }} />
      </div>
      <article className="addusers-article" ref={addUserWindow}>
        <div className="search-div">
          <input
            type="text"
            style={{
              backgroundColor: "#ffffff1d",
              fontSize: "1rem",
              fontWeight: '700',
            }}
            className="search"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Search
            sx={{
              color: "#F9FAFB",
              position: "absolute",
              left: "9%",
            }}
          />
        </div>
        <ul className="friendlist">
          {users.map(({name, _id, avatar}, index) => {

            return (
              <li
                className="friendlistdivs"
                key={index}
                value={_id}
         
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
                    src={
                     avatar || "https://res.cloudinary.com/dki615p7n/image/upload/v1715486888/default_avatar_tvgr8w.jpg"
                    }
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

                <button
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: 'transparent',
                    border: 'none',
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={_id}
                  onClick={() => console.log("clicked")}
                >
              <AddCircle sx={{color: '#2d99ff', width: "2rem", height: "2rem"}} onClick={(e) => e.currentTarget.style.color="white"}/>
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </>
  );
};

export default AddFriends;
