import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action, EnumThunkAction } from "enum/cinema.enum";
import { IMovieTicket } from "interfaces/movie-ticket";
import movieApi from "services/movieAPI";

interface ListMovieTicket {
    data: IMovieTicket;
    isLoading: boolean;
    error: string;
}
const initialState: ListMovieTicket = {
    data: <IMovieTicket>{},
    isLoading: false,
    error: "",
};

export const getInfoMovieTicket = createAsyncThunk(EnumThunkAction.GET_MOVIE_TICKET, async (maLichChieu: number) => {
    try {
        const data = await movieApi.getMovieTicket(maLichChieu);
        return data;
    } catch (error) {
        throw error;
    }
});
const movieTicketSlice = createSlice({
    name: Action.MOVIE_TICKET,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInfoMovieTicket.pending, (state) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(getInfoMovieTicket.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getInfoMovieTicket.rejected, (state, { error }) => {
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default movieTicketSlice.reducer;
