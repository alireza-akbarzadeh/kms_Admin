import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Admin Delete Sms  FUNCTIONALITY*********************


export const deleteSmsAction = createAsyncThunk(
    "DeleteSms/Delete",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/config/sms/${id}`, {method: "delete"});
        return ResponseHandler({res});
    }
);

const deleteSmsSlice = createSlice({
    name: "DeleteSms",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteSmsAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteSmsAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteSmsAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteSmsSlice.reducer;
