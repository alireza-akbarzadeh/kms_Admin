import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Alert, Http} from "../../../helper";
import ResponseHandler from "../../../helper/ResponseHandler";


// *********************   Update Notify Setting  FUNCTIONALITY *********************

export const notifySettingAction = createAsyncThunk("admin/config/notify",
    async (data, {rejectWithValue}) => {
        const res = await Http("admin/config/notify", {method: "put", data});
        return ResponseHandler({res});
    });

const notifySettingSlice = createSlice({
    name: "NotifySetting",
    initialState: {
        data: {}, error: [], loading: false, isSuccess: null,
    }, reducers: {}, extraReducers: (b) => b
        .addCase(notifySettingAction.pending, (state) => {
            state.loading = true;
        })
        .addCase(notifySettingAction.fulfilled, (state, action) => {
            state.data = action?.payload?.data;
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(notifySettingAction.rejected, (state, action) => {
            state.data = null;
            state.loading = false;
            state.isSuccess = false;
            state.error = action.payload;
        }),
});
export default notifySettingSlice.reducer;
