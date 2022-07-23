export enum EnumThunkAction {
    GET_CINEMA_LIST = "cinema/getCinemaList",
    GET_MOVIE_BANNER = "movies/getMovieBanner",
    GET_MOVIE_LIST = "movies/getMovieList",
    GET_THEATER_LIST = "cinema/getTheaterList",
    GET_LIST_INFO_THEATER = "cinema/getListInfoTheater",
    GET_INFO_MOVIE = "movie/getInfoMovie",
}

export enum Action {
    LIST_THEATER = "list-theater",
    BANNERS = "banners",
    CINEMAS = "cinemas",
    MOVIES = "movies",
    LIST_INFO_THEATER = "list-info-theater",
    INFO_MOVIE = "info-movie",
}

export enum Config {
    PER_PAGE_TIME = 6,
    PER_PAGE_MOVIE = 16,
    PER_PAGE_THEATER = 8,
}
