import { createSlice } from '@reduxjs/toolkit'

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        data: JSON.parse(localStorage.getItem('id')) || {} 
      },
      reducers : {
        homeDetail: (state,{payload}) => {
            state.data = payload
            localStorage.setItem('id', JSON.stringify(payload)); // Save to local storage
          },
      }
})

export const {homeDetail} = HomeSlice.actions
export default HomeSlice.reducer