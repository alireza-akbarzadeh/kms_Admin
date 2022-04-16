import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const updateEmailAction = createAsyncThunk(
    "UpdateEmailAdmin/Update",
    async ({id, data}, {rejectWithValue}) => {
        const res = await Http(`admin/config/email/${id}`, {method: "put", data});
        const mainData = ResponseHandler({res});
    }
);

const updateEmailSlice = createSlice({
    name: "UpdateEmailAdmin",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateEmailAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmailAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateEmailAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default updateEmailSlice.reducer;
