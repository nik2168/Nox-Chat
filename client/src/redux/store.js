import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authslice.js";
import api from "./api/api.js";
import miscSlice from "./reducer/miscslice.js";
import chatSlice from "./reducer/chat.js";
import createGroupSlice from "./reducer/createGroupSlice.js";
import addMembersSlice from "./reducer/addMembersslice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    misc: miscSlice.reducer,
    chat: chatSlice.reducer,
    create: createGroupSlice.reducer,
    addmember: addMembersSlice.reducer,
    api: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});
