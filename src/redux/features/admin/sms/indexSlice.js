import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getSmsList = createAsyncThunk(
    "GetSmsList/sms",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/config/sms", {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const getSmsListSlice = createSlice({
    name: "GetSmsList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getSmsList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSmsList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getSmsList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getSmsListSlice.reducer;
