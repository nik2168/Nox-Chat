import React from "react";

import { Notifications } from "@mui/icons-material";

const CurNotifications = () => {
  return (
    <>
      <div className="allchats-notifications">
        <Notifications sx={{ height: "1.5rem", width: "1.5rem" }} />
      </div>
    </>
  );
};

export default CurNotifications;
