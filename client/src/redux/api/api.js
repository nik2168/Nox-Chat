import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config'

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1`}),
    tagTypes: ["Chat",],

    endpoints: (builder) => ({

        myChats: builder.query({
            query: () => ({
                url: "/chat/chats",
                credentials: "include"
            }),
        providesTags: ["Chat"],
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `/user/search/?name=${name}`,
                credentials: "include",
            }),
            providesTags: ["User"]
        }),

        sendRequest: builder.query({
            query: (_id) => ({
                url: '/user/sendrequest',
                method: "POST",
                credentials: "include",
                body: {
                    userId: _id,
                },
            })
        })

    }),
})

export default api;

export const {useMyChatsQuery, useLazySearchUserQuery} =  api