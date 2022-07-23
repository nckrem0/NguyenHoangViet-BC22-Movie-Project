import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { ITheater } from "interfaces/theater";
import { Action, EnumThunkAction } from "enum/cinema.enum";

interface ListTheaterState {
    data: ITheater[];
    isLoading: boolean;
    error: string;
}

const initialState: ListTheaterState = {
    data: [],
    isLoading: false,
    error: "",
};

export const getTheaterList = createAsyncThunk(EnumThunkAction.GET_THEATER_LIST, async (cinema_id: string) => {
    try {
        const data = await movieAPI.getTheaterList(cinema_id);
        return data;
    } catch (error) {
        throw error;
    }
});

const listTheaterSlice = createSlice({
    name: Action.LIST_THEATER,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTheaterList.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getTheaterList.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getTheaterList.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default listTheaterSlice.reducer;
