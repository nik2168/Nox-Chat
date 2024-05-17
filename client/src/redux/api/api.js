import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["Chat"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/chats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search/?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendRequest: builder.mutation({
      query: (_id) => ({
        url: "/user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: {
          userId: _id,
        },
      }),
      invalidatesTags: ["User"],
    }),

    fetchRequests: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    updateProfile: builder.mutation({
      query: (arg) => ({
        url: "/user/updateprofiledata",
        method: "PUT",
        credentials: "include",
        body: arg,
      }),
      invalidatesTags: ["User"],
    }),

    updateProfilePicture: builder.mutation({
      query: (formdata) => ({
        url: "/user/updateprofilepicture",
        method: "PUT",
        credentials: "include",
        body: formdata,
      }),
      invalidatesTags: ["User"],
    }),

    requestResponse: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    fetchUserFriends: builder.query({
      query: () => ({
        url: "/user/userfriends",
        credentials: "include",
      }),
      providesTags: ["Friends"],
    }),

    createGroup: builder.mutation({
      query: (formdata) => ({
        url: "/chat/createGroup",
        method: "POST",
        credentials: "include",
        body: formdata,
      }),
      invalidatesTags: ["Chat"],
    }),

  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendRequestMutation,
  useFetchRequestsQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useRequestResponseMutation,
  useFetchUserFriendsQuery,
  useCreateGroupMutation,
} = api;
