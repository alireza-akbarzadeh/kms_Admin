import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const showTaskList = createAsyncThunk(
    "GetTaskList/Task",
    async ({currentId, detailsId}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/tasks/show/${currentId}/${detailsId}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const showTaskListSlice = createSlice({
    name: "GetTaskList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showTaskList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showTaskList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showTaskList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showTaskListSlice.reducer;
