// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllVideos = createApi({
    reducerPath: 'api', // Name of the API slice
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/v1/' }), // Base URL
    endpoints: (builder) => ({
        getAllVideos: builder.query({
            query: () => 'allvideos', // Endpoint path for fetching all videos
        }),
    }),
});

export const { useGetAllVideosQuery } = AllVideos; // Exporting the auto-generated hook
