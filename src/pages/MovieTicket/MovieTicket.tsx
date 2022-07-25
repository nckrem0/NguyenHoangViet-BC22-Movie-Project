import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoMovieTicket } from "slices/movie-ticket";
import { AppDispatch, RootState } from "store";
const MovieTicket = () => {
    const { data, isLoading, error } = useSelector((state: RootState) => state.movie_ticket);

    const urlParams = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const maLichChieu = Number(urlParams.movieTicketId);
        dispatch(getInfoMovieTicket(maLichChieu));
    }, [dispatch, urlParams.movieTicketId]);
    // useEffect(() => {
    //     dispatch(getInfoMovieTicket());
    // }, []);

    if (isLoading) {
        return <h1>...Loading</h1>;
    }
    if (error) {
        return <h1>error</h1>;
    }
    return (
        <div className="flex gap-4 flex-wrap">
            {data.danhSachGhe?.map((list) => {
                return (
                    <div>
                        <button className="bg-gray-400 p-3 ">{list.stt}</button>
                    </div>
                );
            })}
        </div>
    );
};

export default MovieTicket;
