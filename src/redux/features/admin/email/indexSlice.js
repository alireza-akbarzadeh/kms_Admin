import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getEmailList = createAsyncThunk(
    "GetEmailList/sms",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/config/email", {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const getEmailListSlice = createSlice({
    name: "GetEmailList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getEmailList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getEmailList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getEmailList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getEmailListSlice.reducer;
