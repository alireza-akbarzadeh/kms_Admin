import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// *********************   Get Tickets Setting  FUNCTIONALITY *********************

export const showTicketsAction = createAsyncThunk("admin/ticket",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/ticket/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    });

const showTicketsSlice = createSlice({
    name: "GetTickets",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(showTicketsAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(showTicketsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(showTicketsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default showTicketsSlice.reducer;
