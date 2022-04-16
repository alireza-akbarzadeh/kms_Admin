import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Admin Delete Sms  FUNCTIONALITY*********************


export const deleteEmailAction = createAsyncThunk(
    "DeleteEmail/Delete",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/config/email/${id}`, {method: "delete"});
        const s = ResponseHandler({res});
    }
);

const deleteEmailSlice = createSlice({
    name: "DeleteEmail",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteEmailAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteEmailAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteEmailAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteEmailSlice.reducer;
