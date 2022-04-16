import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Admin Show Sms  FUNCTIONALITY*********************


export const showSmsAction = createAsyncThunk(
    "ShowSms/Delete",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/config/sms/${id}`, {method: "get"});
        return ResponseHandler({res});
    }
);

const deleteSmsSlice = createSlice({
    name: "ShowSms",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showSmsAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showSmsAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showSmsAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteSmsSlice.reducer;
