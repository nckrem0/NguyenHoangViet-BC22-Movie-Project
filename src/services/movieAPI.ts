import Banner from "interfaces/banner";
import Movie from "interfaces/movie";
import { ICinema } from "interfaces/cinema";
import axiosClient from "./axiosClient";
import { ITheater } from "interfaces/theater";
import { IInfoTheater } from "interfaces/info-theater";
import { IInfoMovie } from "interfaces/info-movie";
import { IMovieTicket } from "interfaces/movie-ticket";
import { IMovieShowTimeInfo } from "interfaces/movie-showtime-info";
import { IBooking } from "interfaces/booking";

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
    getMovieTicket: (maLichChieu: number) => {
        return axiosClient.get<unknown, IMovieTicket>(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    },
    getMovieShowtimeInfo: (maPhim: number) => {
        return axiosClient.get<unknown, IMovieShowTimeInfo>(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    },
    commitBooking: (data: any) => {
        return axiosClient.post<unknown, IBooking>("QuanLyDatVe/DatVe", data, {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMDkwMTk1OTQ4OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QxMXdlZmVmQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwidGVzdDExd2VmZWZAZ21haWwuY29tIiwiR1AwMSJdLCJuYmYiOjE2NTkyODgxMTAsImV4cCI6MTY1OTI5MTcxMH0.cea8CH4gunj8ITwqk7hjniQdcKrEuY4_crqx02U5ueY",
            },
        });
    },
};
export default movieAPI;
