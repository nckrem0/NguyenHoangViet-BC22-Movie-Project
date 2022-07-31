import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { IMovieShowTimeInfo } from "interfaces/movie-showtime-info";
import { Action, EnumThunkAction } from "enum/cinema.enum";

interface ListTheaterState {
    data: IMovieShowTimeInfo;
    isLoading: boolean;
    error: string;
}

const initialState: ListTheaterState = {
    data: <IMovieShowTimeInfo>{},
    isLoading: true,
    error: "",
};

export const getMovieShowtimeInfo = createAsyncThunk(
    EnumThunkAction.GET_MOVIE_SHOWTIME_INFO,
    async (maPhim: number) => {
        try {
            const data = await movieAPI.getMovieShowtimeInfo(maPhim);
            return data;
        } catch (error) {
            throw error;
        }
    }
);

const listMovieShowtimeSlice = createSlice({
    name: Action.MOVIE_SHOWTIME_INFO,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovieShowtimeInfo.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getMovieShowtimeInfo.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getMovieShowtimeInfo.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default listMovieShowtimeSlice.reducer;
