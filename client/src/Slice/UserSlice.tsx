import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyObject {
  key: string;
}

interface UserState {
  LoginData?: MyObject; 
}

const UserSlice = createSlice({
  name: "User",
  initialState: {} as UserState, 
  reducers: {
    doLogin(state, action: PayloadAction<MyObject>) {
      state.LoginData = action.payload;
    },
    doLogout(state) {
      state.LoginData = undefined; 
    },
  },
});

export default UserSlice.reducer;
export const { doLogin, doLogout } = UserSlice.actions;
