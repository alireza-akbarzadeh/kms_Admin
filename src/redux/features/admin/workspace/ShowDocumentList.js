import Cookies from "js-cookie";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//components
import {Http, Alert} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER Index  FUNCTIONALITY*********************


export const showDocumentList = createAsyncThunk(
    "GetDocumentList/Document",
    async ({currentId, detailsId}, {rejectWithValue}) => {
        const res = await Http(`admin/customers/document/show/${currentId}/${detailsId}`, {method: "get"});
        return ResponseHandler({res, index: true});
    }
);
const showDocumentListSlice = createSlice({
    name: "GetDocumentList",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(showDocumentList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(showDocumentList.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(showDocumentList.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default showDocumentListSlice.reducer;
