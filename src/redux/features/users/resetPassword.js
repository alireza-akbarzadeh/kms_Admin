import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler"
// ********************* USER Reset PassWord  FUNCTIONALITY*********************

export const restPassAction = createAsyncThunk(
    "ResetPassword/restPass",
    async (data, {rejectWithValue}) => {

        const res = await Http("admin/resetPassword", {method: "post", data});
        const f = ResponseHandler({res})
    }
);

const initialState = {
    data: {},
    errors: null,
    loading: false,
    isSuccess: null,
};
const resetPasswordSlice = createSlice({
    name: "ResetPassword",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(restPassAction.pending, (state) => {
                state.loading = true;

            })
            .addCase(restPassAction.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(restPassAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = null;
                state.errors = action.payload;
            }),
});

export default resetPasswordSlice.reducer;
