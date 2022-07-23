import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "services/movieAPI";
import { Movie } from "interfaces/movie";
import { Action, EnumThunkAction } from "enum/cinema.enum";
interface MoviesState {
    data: Movie[];
    isLoading: boolean;
    error: string;
}
const initialState: MoviesState = {
    data: [],
    isLoading: false,
    error: "",
};

// sử dụng: dispatch(getMovieList(params))
export const getMovieList = createAsyncThunk(
    EnumThunkAction.GET_MOVIE_LIST,

    //Hàm này nhận vào 2 tham số:
    // - 1: tham số truyền vào khi dispatch action getMovieList
    // - 2: ThunkAPI: là 1object chứa các hàm của redux thunk như dispatch,getState,...
    async () => {
        try {
            const data = await movieAPI.getMovieList();
            // call api thành công return về data
            return data;
        } catch (error) {
            // call api thất bại
            throw error;
        }
    }
);
const movieSlice = createSlice({
    name: Action.MOVIES, // namespace để tạo ra các action types
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovieList.pending, (state) => {
            //request đang được thực thi => set isLoading thành true để show loading ra giao diện
            return { ...state, isLoading: true };
        });
        builder.addCase(getMovieList.fulfilled, (state, { payload }) => {
            //payload là data được return từ hàm getMovieList
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(getMovieList.rejected, (state, { error }) => {
            // error được throw từ hàm getMovieList
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default movieSlice.reducer;
