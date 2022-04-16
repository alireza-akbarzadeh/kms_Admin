import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// *********************   Update Notify Setting  FUNCTIONALITY *********************

export const changeStatusAction = createAsyncThunk("admin/status",
    async ({id, status}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/${id}/${status}`, {method: "get"});
        return ResponseHandler({res});
    });

const changeStatusSlice = createSlice({
    name: "ChangeStatusCustomer",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(changeStatusAction.pending, (state) => {
            state.loading = true;
            state.isSuccess = null;
        })
        .addCase(changeStatusAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(changeStatusAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default changeStatusSlice.reducer;
