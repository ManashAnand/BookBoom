import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  name: string;
  descp: string;
  author: string;
  cover: string;
}

const BookSlice = createSlice({
  name: 'books',
  initialState: [] as Book[],
  reducers: {
    changeData(state, action: PayloadAction<Book[]>) {
      state.length = 0;
      state.push(...action.payload);
    }
  }
});

export default BookSlice.reducer;
export const { changeData } = BookSlice.actions;
