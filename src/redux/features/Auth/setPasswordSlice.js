import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Alert} from "../../../helper";

// const ENDPOINT = process.env.REACT_APP_BASE_URL;
const ENDPOINT = 'https://back.deriko.net/';

// ********************* USER Forgot Password FUNCTIONALITY*********************

export const setPassUser = createAsyncThunk(
    "SetForgotAuh/setForgotPass",
    async ({slug, data}, {rejectWithValue}) => {
        try {
            const res = await axios.post(
                ENDPOINT + `admin/setPassword/${slug}`,
                data,
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                Alert.SUCCESS(res.data.data)
                return {
                    data: res.data,
                };
            }
        } catch (error) {
            Alert.ERROR(error?.response?.data?.error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    data: {},
    errors: {},
    loading: false,
    isSuccess: null,
};
const setPassSlice = createSlice({
    name: "SetForgotAuh",
    initialState: initialState,
    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(setPassUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(setPassUser.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(setPassUser.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.isSuccess = false;
                state.errors = action.payload;
            }),
});

export default setPassSlice.reducer;
