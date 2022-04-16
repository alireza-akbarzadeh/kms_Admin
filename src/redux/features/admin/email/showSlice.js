import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Admin Show Sms  FUNCTIONALITY*********************

export const showEmailAction = createAsyncThunk(
    "ShowEmail/Delete",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/config/sms/${id}`, {method: "get"});
        const mainData = ResponseHandler({res});
    }
);

const detailsEmailSlice = createSlice({
    name: "ShowEmail",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showEmailAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showEmailAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showEmailAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default detailsEmailSlice.reducer;
