import React, { useEffect, useRef, useState } from "react";
import {
  Group,
  Call,
  Chat,
  Settings,
  Close,
  Logout,
} from "@mui/icons-material";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducer/authslice";

const Navbar = ({ setnav, curnav }) => {
  const dispatch = useDispatch()
  const [bio, setbio] = useState(
    "Life is too short to argue just say no bio only physics! 😎"
  );
  const [about, setabout] = useState("I am a Cs StudentStudent😏");

  const maintag = useRef();

  useEffect(() => {
    const allicons = document.querySelectorAll(".NavIcons");
    allicons[0].classList.add("active");
  }, []);

  const handleNav = (e) => {
    const curIcon = e.currentTarget;
    const allicons = document.querySelectorAll(".NavIcons");
    for (let i = 0; i < allicons.length; i++) {
      allicons[i].classList.remove("active");
    }
    curIcon.classList.add("active");
  };

  const logoutHandler = async (e) => {
    handleNav(e);
    setnav("settings");
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(data?.message);
      dispatch(userNotExists())
    } catch (err) {
      toast.error(err?.response?.data?.message || "something went wrong !");
    }
  };

  return (
    <nav className="navbar" ref={maintag}>
      <div
        className="Icondiv"
        onClick={() => {
          maintag.current.classList.add("active");
        }}
      >
        <img
          src="https://randomuser.me/api/portraits/women/63.jpg"
          alt=""
          className="NavIcon"
        />
      </div>
      <article className="profile">
        <h1>Profile</h1>
        <div
          className="profileclose"
          onClick={() => {
            maintag.current.classList.remove("active");
          }}
        >
          <Close
            sx={{
              color: "#f9fafb",
              fontSize: "2.4rem",
            }}
          />
        </div>
        <div className="profileimgdiv">
          <img
            src="https://randomuser.me/api/portraits/women/63.jpg"
            alt=""
            className="profileimg"
          />
          <h3>Natasha</h3>
          <p>Joined 3 months ago</p>
        </div>
        <div className="profiledata">
          <h4>Bio</h4>
          <textarea
            type="text"
            value={bio}
            onChange={(e) => setbio(e.currentTarget.value)}
          />
          <h4>About</h4>
          <textarea
            type="text"
            value={about}
            onChange={(e) => setabout(e.currentTarget.value)}
          />
        </div>
      </article>

      <ul className="iconsdiv">
        <li
          className="NavIcons divchat"
          value="chats"
          onClick={(e) => {
            handleNav(e);
            setnav("chats");
          }}
        >
          <Chat />
        </li>

        <li
          className="NavIcons divgroup"
          value="groups"
          onClick={(e) => {
            handleNav(e);
            setnav("groups");
          }}
        >
          <Group />
        </li>
        <li
          className="NavIcons divcall"
          value="calls"
          onClick={(e) => {
            handleNav(e);
            setnav("groups");
          }}
        >
          <Call />
        </li>
        <li
          className="NavIcons divsettings"
          value="settings"
          onClick={logoutHandler}
        >
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
