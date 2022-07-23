import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { IInfoMovie } from "interfaces/info-movie";
import { Action, EnumThunkAction } from "enum/cinema.enum";

interface InfoMovieState {
    data: IInfoMovie;
    isLoading: boolean;
    error: string;
}

const initialState: InfoMovieState = {
    data: <IInfoMovie>{},
    isLoading: false,
    error: "",
};

export const getInfoMovie = createAsyncThunk(EnumThunkAction.GET_INFO_MOVIE, async (maPhim: number) => {
    try {
        const data = await movieAPI.getInfoMovie(maPhim);
        return data;
    } catch (error) {
        throw error;
    }
});
const cinemaSlice = createSlice({
    name: Action.INFO_MOVIE,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInfoMovie.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getInfoMovie.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getInfoMovie.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default cinemaSlice.reducer;
