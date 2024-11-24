import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const MostViews = createApi({
    reducerPath : "mostviews",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),

    endpoints: (builder) => ({
        getMostViews: builder.query({
            query: () => '/mostviews',
        }),
    })
}) 

export const {useGetMostViewsQuery} = MostViews;