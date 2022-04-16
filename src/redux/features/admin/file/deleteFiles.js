import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";


// ********************* Admin Files  FUNCTIONALITY*********************

export const deleteFileList = createAsyncThunk(
    "DeleteFiles/files",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/files", {method: "post", data});
        return ResponseHandler({res});
    }
);

const deleteFileListSlice = createSlice({
    name: "DeleteFiles",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteFileList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteFileList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteFileList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteFileListSlice.reducer;
