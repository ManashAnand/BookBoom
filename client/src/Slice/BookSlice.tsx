import {createSlice} from '@reduxjs/toolkit'

const BookSlice = createSlice({
    name: "books",
    initialState: [],
    reducers:{
        changeData(state,action:any){
            state.length = 0;
            state.push(...action?.payload);
        }
    }
})

export default BookSlice.reducer;
export const { changeData } = BookSlice.actions;
