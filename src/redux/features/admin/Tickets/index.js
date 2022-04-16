import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// *********************   Get Tickets Setting  FUNCTIONALITY *********************

export const getTicketsAction = createAsyncThunk("admin/ticket",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/ticket", {method: "get"});
        return ResponseHandler({res, index: true});
    });

const getTicketsSlice = createSlice({
    name: "GetTickets",
    initialState: {
        data: null, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(getTicketsAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTicketsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(getTicketsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default getTicketsSlice.reducer;
