import { createSlice } from "@reduxjs/toolkit";
import blogList from "../helper/BlogList.js";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogItems: blogList,
    selectedBlog: "",
  },
  reducers: {
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});

export const { setSelectedBlog } = blogSlice.actions;

export default blogSlice.reducer;
