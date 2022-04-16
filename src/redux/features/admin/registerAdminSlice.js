import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler";


// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const registerAdminAction = createAsyncThunk("RegisterAdmin/Register", async (data, {rejectWithValue}) => {
    const res = await Http("admin/auth/register", {method: "post", data});
    return ResponseHandler({res});
});

const registerAdminSlice = createSlice({
    name: "RegisterAdmin", initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(registerAdminAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerAdminAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(registerAdminAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default registerAdminSlice.reducer;
