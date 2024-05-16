import {
  AddCircle,
  Notifications,
  DoneRounded,
  CancelSharp,
  CancelScheduleSend,
  ChangeCircleRounded,
  Close,
} from "@mui/icons-material";
import React, { useRef } from "react";
import { useFetchRequestsQuery, useRequestResponseMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";

const CurNotifications = () => {


  const notificationsWindow = useRef(); // open close notificationw window


   // Fetch requests for curr user
  const { data, isError, error, isLoading, reFetch } = useFetchRequestsQuery();
  useErrors([{ isError, error }]);

  // accept or decline requests handler
       const [requestRes, isLoadingRequestRes ] = useAsyncMutation(useRequestResponseMutation)

  const handleSendRequest = (e, accept) => {
      console.log(e.currentTarget.value, accept)
        const data = {
          requestId: e.currentTarget.value,
          accept,
        };
        requestRes("responding to the request ...", data)
  }

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
        {data?.notifications?.length === 0 && <div className="notificationHeading" style={{padding: "1rem"}}>
          <p>Relax, you don't have any new notification !</p>
        </div>}
        <ul className="friendlist">
          {data?.notifications?.map(({ _id, sender }, index) => {
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
                  value={_id}
                  onClick={(e) => handleSendRequest(e, false)}
                >
                  {<p className="cancel">cancel</p>}
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
                  value={_id}
                  onClick={(e) => handleSendRequest(e, true)}
                >
                  {
                    <p className="accept" style={{ color: "#2d99ff" }}>
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
