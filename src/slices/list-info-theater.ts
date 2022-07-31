import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import { IInfoTheater } from "interfaces/info-theater";

interface ListInfoTheater {
    data: IInfoTheater[];
    isLoading: boolean;
    error: string;
}

const initialState: ListInfoTheater = {
    data: [],
    isLoading: true,
    error: "",
};

interface Params {
    cinema_id: string;
    maNhom: string;
}

export const getInfoTheater = createAsyncThunk(EnumThunkAction.GET_LIST_INFO_THEATER, async (params: Params) => {
    try {
        // const params: Params = JSON.parse(query);
        const data = await movieAPI.getListInfoTheater(params.cinema_id, params.maNhom);
        return data;
    } catch (error) {
        throw error;
    }
});

const listInfoTheaterSlice = createSlice({
    name: Action.LIST_INFO_THEATER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInfoTheater.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getInfoTheater.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getInfoTheater.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default listInfoTheaterSlice.reducer;
