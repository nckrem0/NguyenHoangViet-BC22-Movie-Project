import Banner from "interfaces/banner";
import Movie from "interfaces/movie";
import { ICinema } from "interfaces/cinema";
import axiosClient from "./axiosClient";
import { ITheater } from "interfaces/theater";
import { IInfoTheater } from "interfaces/info-theater";
import { IInfoMovie } from "interfaces/info-movie";

const movieAPI = {
    getMovieList: () => {
        return axiosClient.get<unknown, Movie[]>("QuanLyPhim/LayDanhSachPhim");
    },
    getMovieBanner: () => {
        return axiosClient.get<unknown, Banner[]>("QuanLyPhim/LayDanhSachBanner");
    },
    getCinemaList: () => {
        return axiosClient.get<unknown, ICinema[]>("QuanLyRap/LayThongTinHeThongRap");
    },
    getTheaterList: (cinema_id: string) => {
        return axiosClient.get<unknown, ITheater[]>(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinema_id}`);
    },
    getListInfoTheater: (cinema_id: string, maNhom: string) => {
        return axiosClient.get<unknown, IInfoTheater[]>(
            `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinema_id}&maNhom=${maNhom}`
        );
    },
    getInfoMovie: (maPhim: number) => {
        return axiosClient.get<unknown, IInfoMovie>(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    },
};
export default movieAPI;
