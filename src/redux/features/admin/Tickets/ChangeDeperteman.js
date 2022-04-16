import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// *********************   Get Tickets Setting  FUNCTIONALITY *********************

export const changeDepartmentTicketsAction = createAsyncThunk("admin/changeDepartment",
    async (data, {rejectWithValue}) => {
        const res = await Http(`admin/ticket/changeDepartment`, {method: "put", data});
        return ResponseHandler({res, index: true});
    });

const changeDepartmentTicketsSlice = createSlice({
    name: "CreateTickets",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(changeDepartmentTicketsAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(changeDepartmentTicketsAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(changeDepartmentTicketsAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default changeDepartmentTicketsSlice.reducer;
