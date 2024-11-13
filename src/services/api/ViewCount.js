import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice for video views
export const ViewCount = createApi({
  reducerPath: 'view',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/v1' }), // Your Laravel API URL
  tagTypes: ['api'],
  endpoints: (builder) => ({
    // Define a mutation to increment view count for a video
    incrementView: builder.mutation({
      query: (videoId) => ({
        url: `/movies/${videoId}/view`,  // Assuming the API endpoint is something like `/video/{id}/view`
        method: 'POST',
      }),
    }),
    // You can add more endpoints as needed
  }),
});

export const { useIncrementViewMutation } = ViewCount;
