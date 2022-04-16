import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../../helper";
import ResponseHandler from "../../../../../helper/ResponseHandler";


// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const workSpaceUserAction = createAsyncThunk("workSpaceUser/workspace", async (id, {rejectWithValue}) => {
    const res = await Http(`admin/customers/users/index/${id}`, {method: "get"});
    return ResponseHandler({res, index: true});
});

const workSpaceUserSlice = createSlice({
    name: "workSpaceUser", initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(workSpaceUserAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(workSpaceUserAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(workSpaceUserAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default workSpaceUserSlice.reducer;
