import { createSlice } from '@reduxjs/toolkit'

export const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        text: JSON.parse(localStorage.getItem('sidetext')) || '' ,
      },
      reducers : {
        getSidebarItem: (state,{payload}) => {
            state.text = payload
            localStorage.setItem('sidetext',JSON.stringify(payload))
          },
      }
})
export const {getSidebarItem} = SidebarSlice.actions
export default SidebarSlice.reducer