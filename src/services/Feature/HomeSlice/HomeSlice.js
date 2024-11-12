import { createSlice } from '@reduxjs/toolkit'

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        value: 0,
        data: JSON.parse(localStorage.getItem('homeDetail')) || {} 
      },
      reducers : {
        homeDetail: (state,{payload}) => {
            state.data = payload
            localStorage.setItem('homeDetail', JSON.stringify(payload)); // Save to local storage
          },
      }
})

export const {homeDetail} = HomeSlice.actions
export default HomeSlice.reducer