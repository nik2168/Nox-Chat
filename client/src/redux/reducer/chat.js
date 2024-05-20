import { createSlice } from "@reduxjs/toolkit";

const initialState = {
notificationCount: 0,

};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
   incrementNotification : (state) => {
    state.notificationCount += 1;
   },
   resetNotification : (state) => {
    state.notificationCount = 0;
   }
  },
});

export const {
  incrementNotification,
  resetNotification,
} = chatSlice.actions;

export default chatSlice;
