import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

//components
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* Admin Delete Sms  FUNCTIONALITY*********************


export const deleteWorkSpaceAction = createAsyncThunk(
    "DeleteWorkSpace/Delete",
    async (id, {rejectWithValue}) => {
        const res = await Http(`admin/customers/types/delete/${id}`, {method: "delete"});
        return ResponseHandler({res});
    }
);

const deleteWorkSpaceSlice = createSlice({
    name: "DeleteWorkSpace",
    initialState: {
        data: {},
        loading: false,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(deleteWorkSpaceAction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteWorkSpaceAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteWorkSpaceAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
            }),
});

export default deleteWorkSpaceAction.reducer;
