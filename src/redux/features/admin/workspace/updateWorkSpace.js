import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const updateWorkSpaceAction = createAsyncThunk("UpdateWorkSpaceAdmin/Update", async (data, {rejectWithValue}) => {
    const res = await Http(`admin/customers/types`, {method: "PUT", data});
    return ResponseHandler({res});
});

const updateWorkSpaceSlice = createSlice({
    name: "UpdateWorkSpaceAdmin", initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(updateWorkSpaceAction.pending, (state) => {
            state.loading = true;
            state.isSuccess = null;
        })
        .addCase(updateWorkSpaceAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(updateWorkSpaceAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default updateWorkSpaceSlice.reducer;
