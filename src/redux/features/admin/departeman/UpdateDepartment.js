import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Http} from "../../../../helper";
import ResponseHandler from "../../../../helper/ResponseHandler";

// ********************* USER  Update Profile  FUNCTIONALITY*********************

export const updateDepartmentAction = createAsyncThunk(
    "UpdateEmailAdmin/Update",
    async ({id, data}, {rejectWithValue}) => {
        const res = await Http(`admin/department/${id}`, {method: "put", data});
        const mainData = ResponseHandler({res});
    }
);

const updateDepartmentSlice = createSlice({
    name: "UpdateDepartmentAdmin",
    initialState: {
        data: {},
        error: [],
        loading: false,
        isSuccess: null,
    },
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(updateDepartmentAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDepartmentAction.fulfilled, (state, action) => {
                state.data = action?.payload?.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(updateDepartmentAction.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.error = action.payload;
            }),
});
export default updateDepartmentSlice.reducer;
