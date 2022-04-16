import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getWorkspaceList = createAsyncThunk(
    "GetWorkspaceList/sms",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/customers/types", {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getWorkspaceListSlice = createSlice({
    name: "GetWorkspaceList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getWorkspaceList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getWorkspaceList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getWorkspaceList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getWorkspaceListSlice.reducer;
