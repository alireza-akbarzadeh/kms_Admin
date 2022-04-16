import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../helper";

// ********************* USER Index  FUNCTIONALITY*********************


export const profile = createAsyncThunk(
    "GetUserProfile/userProfile",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/profile", {method: "get"});
        if (res.status === 200) {
            return {
                data: res.data.data,
            };
        }
    }
);

const userProfileSlice = createSlice({
    name: "GetUserProfile",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(profile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(profile.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default userProfileSlice.reducer;
