import React, { useRef, useState } from "react";
import "../Css/login.css";
import { CameraAlt } from "@mui/icons-material";
import {
  useBio,
  useName,
  usePassword,
  useUserName,
  useFileValidator,
} from "../hooks/InputValidator";

const Login = () => {
  const contain = useRef(); // for container's singnin & singup animation
  const currentImage = useRef();
  const [check, setcheck] = useState(""); // for errors in inputs
  const { curname, setname, nameFlag, nameErr } = useName("");
  const { user, setuser, userFlag, userErr } = useUserName("");
  const { bio, setbio, bioFlag, bioErr } = useBio("");
  const { pass, setpass, passFlag, passErr } = usePassword("");
  const { file, setFile, fileFlag, fileErr } = useFileValidator();

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    if (!nameFlag) setcheck(nameErr);
    else if (!userFlag) setcheck(userErr);
    else if (!bioFlag) setcheck(bioErr);
    else if (!passFlag) setcheck(passErr);
    else if (!fileFlag) setcheck(fileErr);
    else setcheck("");
  };

  const signInSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Sign In')
  };

  const handleImageChange = (e) => {
    if (e.target.files[0].size > 3000000) setcheck("Img size must be < 1mb");
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container" id="container" ref={contain}>
      <div className="form-container sign-up">
        <form onSubmit={signUpSubmitHandler}>
          <h1>Create Account</h1>
          {/* <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use a username for registeration</span> */}

          <div
            className="avatar"
            style={{
              position: "relative",
              marginBottom: "0.4rem",
              marginTop: "1rem",
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

          <input
            type="text"
            placeholder="name"
            value={curname}
            onChange={(e) => setname(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="bio"
            value={bio}
            onChange={(e) => setbio(e.currentTarget.value)}
          />
          <input
            type="username"
            placeholder="username"
            value={user}
            onChange={(e) => setuser(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setpass(e.currentTarget.value)}
          />
          {check && (
            <span
              className="validationWarning"
              style={{ color: "red", fontWeight: "800" }}
            >
              {check}
            </span>
          )}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={signInSubmitHandler}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your username & password</span>
          <input
            type="username"
            placeholder="username"
            value={user}
            onChange={(e) => setuser(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setpass(e.currentTarget.value)}
          />
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              className="hidden"
              id="login"
              type="button"
              onClick={(e) => {
                contain.current.classList.remove("active");
              }}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of chat features
            </p>
            <button
              className="hidden"
              id="register"
              type="button"
              onClick={(e) => {
                contain.current.classList.add("active");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
