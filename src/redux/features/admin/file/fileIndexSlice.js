import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// ********************* Admin Files  FUNCTIONALITY*********************

export const getFileList = createAsyncThunk(
    "GetFilesList/sms",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/files", {method: "get"});
        return ResponseHandler({res, index: true});
    }
);

const getFileListSlice = createSlice({
    name: "GetFilesList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getFileList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getFileList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getFileList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getFileListSlice.reducer;
