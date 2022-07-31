import Banner from "./Banner";
import MovieShowing from "./MovieShowing";
import Cinema from "./Cinema";
import Footer from "./Footer";
import Loading from "pages/LoadingPage/Loading";
import { useSelector } from "react-redux";
import { RootState } from "store";
const Home = () => {
    const isLoadingBanner = useSelector((state: RootState) => state.banners).isLoading;
    const isLoadingCinema = useSelector((state: RootState) => state.cinema).isLoading;
    const isLoadingMovie = useSelector((state: RootState) => state.movies).isLoading;
    return (
        <>
            {(isLoadingBanner || isLoadingCinema || isLoadingMovie) && <Loading />}
            <Banner />
            <MovieShowing />
            <Cinema />
            <Footer />
        </>
    );
};

export default Home;
