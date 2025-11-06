import { createSlice } from "@reduxjs/toolkit";
import { LIVECHATCOUNT } from "./constants";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) =>{
            state.messages.splice(LIVECHATCOUNT,1)
            state.messages.push(action.payload)
            // state.messages.unshift(action.payload)
        }
    }
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer;