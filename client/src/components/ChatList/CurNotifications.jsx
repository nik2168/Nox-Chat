import { AddCircle, Notifications, DoneRounded, CancelSharp, CancelScheduleSend, ChangeCircleRounded, Close } from "@mui/icons-material";
import React, { useRef } from "react";
import { useFetchRequestsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";

const CurNotifications = () => {

const notificationsWindow = useRef()

const {data, isError, error, isLoading, reFetch} = useFetchRequestsQuery()

  useErrors([{ isError, error }]);

  const users = [
    { name: "Nikhil", _id: "1543465", avatar: "" },
    { name: "Dharambir", _id: "24154315", avatar: "" },
  ];

    // window close/open
    const handleNotificationsWindow = () => {
      if (!notificationsWindow.current.classList.contains("active")) {
        notificationsWindow.current.classList.add("active");
        return;
      }
      notificationsWindow.current.classList.remove("active");
    };

  return (
    <>
      <div
        className="allchats-notifications"
        onClick={() => handleNotificationsWindow()}
      >
        <Notifications sx={{ height: "1.5rem", width: "1.5rem" }} />
      </div>

      <article className="notifications-article" ref={notificationsWindow}>
        <div className="notificationHeading">
          <h3>Notifications</h3>
        </div>
        <ul className="friendlist">
          {data?.notifications?.map(({ _id, sender}, index) => {
            return (
              <li className="friendlistdivs" key={index} value={_id} style={{}}>
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
                      sender?.avatar ||
                      "https://res.cloudinary.com/dki615p7n/image/upload/v1715486888/default_avatar_tvgr8w.jpg"
                    }
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                    }}
                    alt="user image"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingLeft: "4px",
                    margin: "0",
                    width: "60%",
                    height: "100%",
                  }}
                >
                  <h5>{sender.name} </h5>
                </div>

                <button
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={sender._id}
                  onClick={(e) => handleSendRequest()}
                >
                  {
                    // <Close
                    //   sx={{ color: "white", width: "2rem", height: "2rem" }}
                    //   onClick={(e) => (e.currentTarget.style.color = "white")}
                    // />
                    <p className="cancel">
                      cancel
                    </p>
                  }
                </button>
                <button
                  style={{
                    width: "3.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    border: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                    marginRight: "0.5rem",
                    marginLeft: "1rem",
                  }}
                  value={sender._id}
                  onClick={(e) => handleSendRequest()}
                >
                  {
                    // <DoneRounded
                    //   sx={{ color: "white", width: "2rem", height: "2rem" }}
                    //   onClick={(e) => (e.currentTarget.style.color = "white")}
                    // />
                    <p className="accept" >
                      accept
                    </p>
                  }
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </>
  );
};

export default CurNotifications;
