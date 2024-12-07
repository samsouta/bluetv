import { configureStore } from '@reduxjs/toolkit'
import { HomeSlice } from '../Feature/HomeSlice/HomeSlice'
import { Voting } from '../api/Voting'
import { ViewCount } from '../api/ViewCount'
import { photoApi } from '../api/PhotoApi'
import { DetailApi } from '../api/DetailApi'
import { GetAllGenre } from '../api/GetAllGenre'
import { AllVideos } from '../api/AllVideos'
import { MostViews } from '../api/MostViews'
import { SidebarSlice } from '../Feature/SidebarSlice'
import { TopRate } from '../api/TopRate'
import { Popular } from '../api/Popular'
import { PostComment } from '../api/PostComment'
export default configureStore({
  reducer: {
    home: HomeSlice.reducer, 
    sidebar:SidebarSlice.reducer,
     // Add the missing comma here
    // Add the generated reducer as a specific top-level slice
    [Voting.reducerPath]: Voting.reducer,
    [ViewCount.reducerPath]: ViewCount.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [DetailApi.reducerPath]: DetailApi.reducer,
    [GetAllGenre.reducerPath]: GetAllGenre.reducer,
    [AllVideos.reducerPath]: AllVideos.reducer,
    [MostViews.reducerPath]: MostViews.reducer,
    [TopRate.reducerPath]: TopRate.reducer,
    [Popular.reducerPath]: Popular.reducer,
    [PostComment.reducerPath]: PostComment.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Voting.middleware , 
      ViewCount.middleware, photoApi.middleware ,
       DetailApi.middleware, GetAllGenre.middleware,
      AllVideos.middleware , MostViews.middleware,
      TopRate.middleware,Popular.middleware,PostComment.middleware
      ),  
})
