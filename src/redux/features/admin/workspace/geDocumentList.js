import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const getDocumentList = createAsyncThunk(
    "GetDocumentList/document",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/document/index/${id}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const getDocumentListSlice = createSlice({
    name: "GetDocumentList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getDocumentList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDocumentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getDocumentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default getDocumentListSlice.reducer;
