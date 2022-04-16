import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// *********************   Get Tickets Setting  FUNCTIONALITY *********************

export const changeStatusTicketsAction = createAsyncThunk("admin/ticket",
    async (data, {rejectWithValue}) => {
        const res = await Http(`admin/ticket/status`, {method: "put", data});
        return ResponseHandler({res, index: true});
    });

const changeStatusTicketsSlice = createSlice({
    name: "CreateTickets",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(changeStatusTicketsAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(changeStatusTicketsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(changeStatusTicketsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default changeStatusTicketsSlice.reducer;
