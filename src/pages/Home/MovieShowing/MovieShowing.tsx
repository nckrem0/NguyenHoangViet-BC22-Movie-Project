import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieList } from "slices/movies";
import { AppDispatch, RootState } from "store";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiTicket } from "react-icons/gi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";
import { Config } from "enum/cinema.enum";

import { useNavigate } from "react-router-dom";

const MovieShowing = () => {
    const { data, error, isLoading } = useSelector((state: RootState) => state.movies);
    const navigation = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getMovieList());
    }, []);
    if (isLoading) {
        // return <Loading />
        return <></>;
    }
    if (error) {
        return <></>;
    }

    const goToDetail = (maPhim: number) => {
        navigation(`../detail/${maPhim}`);
    };

    return (
        <Swiper
            slidesPerGroup={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="myMovieSwiper w-screen"
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                },
                1536: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
                1660: {
                    slidesPerView: 7,
                    spaceBetween: 30,
                },
                1920: {
                    slidesPerView: 8,
                    spaceBetween: 30,
                },
            }}
        >
            {data?.map((movie, index) => {
                return (
                    index < Config.PER_PAGE_MOVIE && (
                        <SwiperSlide key={index} className="movie__image">
                            <img
                                className=""
                                src={movie.hinhAnh}
                                alt={movie.tenPhim}
                                onClick={() => goToDetail(movie.maPhim)}
                            />
                            <div className="movie__content md:container md:mx-auto">
                                <div className="movie__name">
                                    <h5>{movie.tenPhim}</h5>
                                </div>
                                <div className="movie__description">
                                    {/* <p>{movie.moTa}</p> */}
                                    <a
                                        className="btn__booking pt-2 pb-2"
                                        href="#"
                                        onClick={() => goToDetail(movie.maPhim)}
                                    >
                                        <i className="pr-2">
                                            <GiTicket />
                                        </i>
                                        <span>Mua Vé</span>
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                );
            })}
        </Swiper>
    );
};

export default MovieShowing;
