//@ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUploadProps, ISendMessageProps } from '../../models/queryInterfaces';


export const getApi = createApi({
    reducerPath: 'photoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fun-zuos.onrender.com'}),
    endpoints: (build) => ({
        getSentences: build.query({
            query: ({round, id}: ISendMessageProps) => ({
                url: '/sentence',
                method: "GET",
                params: {round, id}
            })
        }),

        upload: build.query({
            query: ({id, round, username}: IUploadProps) => ({
                url: "/image",
                method: "GET",
                params: {id, round, username}
            })
        })
    }),
})
 
export const {useUploadQuery, useGetSentencesQuery} = getApi

