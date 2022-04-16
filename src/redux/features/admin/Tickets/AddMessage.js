import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// *********************   Get Tickets Setting  FUNCTIONALITY *********************

export const createTicketsAction = createAsyncThunk("admin/ticket",
    async (data, {rejectWithValue}) => {
        const res = await Http(`admin/ticket/message`, {method: "post", data});
        return ResponseHandler({res, index: true});
    });

const createTicketsSlice = createSlice({
    name: "CreateTickets",
    initialState: {
        data: {}, error: null, loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(createTicketsAction.pending, (state) => {
            state.loading = true;
            state.isSuccess = null;
        })
        .addCase(createTicketsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(createTicketsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default createTicketsSlice.reducer;
