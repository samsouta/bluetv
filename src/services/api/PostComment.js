import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PostComment = createApi({
    reducerPath : "comment",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: ({ moviesId,comment }) => ({
              url: `/movies/${moviesId}/comments`, // Assuming the endpoint to vote is like `/movies/{id}/vote`
              method: "POST",
              body: comment, // This will be the data you send (e.g., vote type)
            }),
          }),
          getComments: builder.query({
            query: (moviesId) => `/movies/${moviesId}/comments`, // Endpoint to fetch photos
          }),
    })

})

export const {usePostCommentMutation , useGetCommentsQuery} = PostComment;
