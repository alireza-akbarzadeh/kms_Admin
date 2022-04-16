import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const updateSmsAction = createAsyncThunk("UpdateSmsAdmin/Update", async ({id, data}, {rejectWithValue}) => {
    const res = await Http(`admin/config/sms/${id}`, {method: "put", data});
    return ResponseHandler({res});
});

const updateSmsSlice = createSlice({
    name: "UpdateSmsAdmin", initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(updateSmsAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateSmsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(updateSmsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default updateSmsSlice.reducer;
