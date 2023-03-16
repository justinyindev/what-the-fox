import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: {}, userBookmarks: [] },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserBookmarks: (state, action) => {
      state.userBookmarks = action.payload;
    },
    appendUserBookmarks: (state, action) => {
      const newBookmarks = action.payload.filter((bookmark) => {
        return !state.userInfo.bookmarks.some((b) => b === bookmark);
      });
      state.userInfo.bookmarks = [...state.userInfo.bookmarks, ...newBookmarks];
    },
  },
});

export const { setUserInfo, setUserBookmarks, appendUserBookmarks } =
  userSlice.actions;

export default userSlice.reducer;
