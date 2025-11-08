import { createSlice } from "@reduxjs/toolkit";
import { LIVECHATCOUNT } from "./constants";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) =>{
        state.messages.push(action.payload)
        if(state.messages.length > LIVECHATCOUNT){
        state.messages.splice(0, 1)
        }
        }
    }
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer;