import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {Alert, Http} from "../../../helper";

// ********************* USER SING UP  FUNCTIONALITY*********************
export const logOut = createAsyncThunk(
  "AuthSignOut/logOutUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Http("admin/auth/logout", { method: "get" });
      if (res.status === 200) {
        Cookies.remove("token");
        window.location.href = "/login";
        return {
          data: res.data,
        };
      }
    } catch (error) {
        Alert.ERROR(error?.response?.data?.error)
        return rejectWithValue("");
    }
  }
);

const logOutSlice = createSlice({
  name: "AuthSignOut",
  initialState: {
    data: {},
    loading: false,
    error: {},
  },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.errors = action.payload;
      }),
});

export default logOutSlice.reducer;
