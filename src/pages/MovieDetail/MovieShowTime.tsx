import moment from "moment";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovieShowtimeInfo } from "slices/movie-showtime-info";
import { AppDispatch, RootState } from "store";
type Props = {
    maPhim: number;
};
const MovieShowTime = (props: Props) => {
    const { maPhim } = props;
    const { data, isLoading, error } = useSelector((state: RootState) => state.movie_showtime_info);
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMovieShowtimeInfo(maPhim));
    }, [dispatch, maPhim]);
    if (isLoading) {
        return <h1>...loading</h1>;
    }
    if (error) {
        return <h1>error</h1>;
    }
    const goToBuyTicket = (maLichChieu: string) => {
        navigation(`../purchase/${maLichChieu}`);
    };
    return (
        <div className="mt-10 font-medium text-base">
            <div className="flex justify-between sm:flex-wrap md:flex-wrap">
                {data?.heThongRapChieu.map((heThongRap, index) => {
                    return (
                        <div key={index} className="pb-10">
                            <div className="pb-6">
                                <img className="w-10 h-10" src={heThongRap.logo} alt={heThongRap.tenHeThongRap} />
                            </div>
                            <div>
                                {heThongRap?.cumRapChieu.map((cumRapChieu, index) => {
                                    return (
                                        <div key={index} className="mb-5">
                                            <h5>{cumRapChieu.tenCumRap}</h5>
                                            <div>
                                                {cumRapChieu?.lichChieuPhim.map((lichChieuPhim, index) => {
                                                    return (
                                                        <div
                                                            className="border rounded p-2 tracking-widest cursor-pointer mt-2"
                                                            onClick={() => goToBuyTicket(lichChieuPhim.maLichChieu)}
                                                        >
                                                            <div className="">
                                                                <span className="text-green-500 text-base ">
                                                                    {moment(lichChieuPhim.ngayChieuGioChieu).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                                </span>
                                                                &nbsp;~&nbsp;
                                                                <span className="text-red-500 font-semibold ">
                                                                    {moment(lichChieuPhim.ngayChieuGioChieu).format(
                                                                        "hh:mm"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(MovieShowTime);
