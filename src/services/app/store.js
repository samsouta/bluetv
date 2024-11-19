import { configureStore } from '@reduxjs/toolkit'
import { HomeSlice } from '../Feature/HomeSlice/HomeSlice'
import { Voting } from '../api/Voting'
import { ViewCount } from '../api/ViewCount'
import { photoApi } from '../api/PhotoApi'
import { DetailApi } from '../api/DetailApi'
import { GetAllGenre } from '../api/GetAllGenre'
import { AllVideos } from '../api/AllVideos'

export default configureStore({
  reducer: {
    home: HomeSlice.reducer,  // Add the missing comma here
    // Add the generated reducer as a specific top-level slice
    [Voting.reducerPath]: Voting.reducer,
    [ViewCount.reducerPath]: ViewCount.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [DetailApi.reducerPath]: DetailApi.reducer,
    [GetAllGenre.reducerPath]: GetAllGenre.reducer,
    [AllVideos.reducerPath]: AllVideos.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Voting.middleware , 
      ViewCount.middleware, photoApi.middleware ,
       DetailApi.middleware, GetAllGenre.middleware,
      AllVideos.middleware
      ),  
})
