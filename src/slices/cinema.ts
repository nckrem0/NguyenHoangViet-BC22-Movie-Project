import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { ICinema } from "interfaces/cinema";
import { Action, EnumThunkAction } from "enum/cinema.enum";

interface CinemaState {
    data: ICinema[];
    isLoading: boolean;
    error: string;
}

const initialState: CinemaState = {
    data: [],
    isLoading: true,
    error: "",
};

export const getCinemaList = createAsyncThunk(EnumThunkAction.GET_CINEMA_LIST, async () => {
    try {
        const data = await movieAPI.getCinemaList();
        return data;
    } catch (error) {
        throw error;
    }
});
const cinemaSlice = createSlice({
    name: Action.CINEMAS,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCinemaList.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getCinemaList.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getCinemaList.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default cinemaSlice.reducer;
