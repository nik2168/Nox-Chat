import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
notificationCount: 0,
newMessageAlert: getOrSaveFromStorage({key: NEW_MESSAGE_ALERT, get: true}) || [
  {
    chatid: '',
    count: 0,
    message: '',
  }
],
isTyping: false,
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
   },

   setNewMessagesAlert : (state, action) => {
    const index = state.newMessageAlert.findIndex((i) => i.chatid === action.payload.chatid)
    if(index !== -1) {
      state.newMessageAlert[index].count += 1
      state.newMessageAlert[index].message = action.payload.message
    }
    else{
      state.newMessageAlert.push({
       chatid: action.payload.chatid,
        count: 1,
        message: action.payload.message
      }
      )}},
      
   removeNewMessagesAlert : (state, action) => {
    state.newMessageAlert = state.newMessageAlert.filter((i) => i.chatid !== action.payload)
  },

  setTyping: (state, action) => {
    state.isTyping = action.payload
  },

}});

export const {
  incrementNotification,
  resetNotification,
  setNewMessagesAlert,
  removeNewMessagesAlert,
  setTyping,
} = chatSlice.actions;

export default chatSlice;
