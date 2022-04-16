import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getTaskList = createAsyncThunk(
    "GetTaskList/sms",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/tasks/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getTaskListSlice = createSlice({
    name: "GetTaskList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getTaskList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTaskList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getTaskList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getTaskListSlice.reducer;
