import { configureStore } from "@reduxjs/toolkit";
import movies from "slices/movies";
import banners from "slices/banners";
import cinema from "slices/cinema";
import list_theater from "slices/list-theater";
import list_info_theater from "slices/list-info-theater";
import info_movie from "slices/info-movie";
import movie_ticket from "slices/movie-ticket";
import movie_showtime_info from "slices/movie-showtime-info";
// configureStore : mặc định đã được setup redux-devtool và redux thunk
const store = configureStore({
    reducer: {
        movies,
        banners,
        cinema,
        list_theater,
        list_info_theater,
        info_movie,
        movie_ticket,
        movie_showtime_info,
    },
    //devtools: false // có enable devtool hay không, mặc định là true
    //   devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
