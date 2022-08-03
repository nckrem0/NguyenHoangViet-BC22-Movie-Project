import { DanhSachGhe } from "interfaces/movie-ticket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getInfoMovieTicket } from "slices/movie-ticket";
import { AppDispatch, RootState } from "store";

//services
import movieAPI from "services/movieAPI";

interface IDanhSachVe {
    maGhe: number;
    giaVe: number;
}
const MovieTicket = () => {
    const { data, isLoading, error } = useSelector((state: RootState) => state.movie_ticket);

    const urlParams = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [listSeat, setListSeat] = useState<DanhSachGhe[]>([]);

    const [listDanhSachVe, setListDanhSachVe] = useState<IDanhSachVe[]>([]);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [danhSachGhe, setDanhSachGhe] = useState<DanhSachGhe[]>([]);

    useEffect(() => {
        const maLichChieu = Number(urlParams.movieTicketId);
        dispatch(getInfoMovieTicket(maLichChieu));
    }, [dispatch, urlParams.movieTicketId]);

    useEffect(() => {
        if (typeof data.danhSachGhe !== "undefined") {
            setDanhSachGhe(data.danhSachGhe);
        }
    }, [data, setDanhSachGhe]);

    //clean data
    const cleanData = () => {
        setTotalPrice(0);
        setListDanhSachVe([]);
        setListSeat([]);
    };

    const handleSelect = (ticket: DanhSachGhe) => {
        console.log(ticket);
        if (!listSeat.some((seat) => seat.stt === ticket.stt)) {
            // doi trang thai ghe
            listSeat.push(ticket);
            setListSeat(listSeat);

            //dat ve
            const danhSachVe: IDanhSachVe = {
                maGhe: ticket.maGhe,
                giaVe: ticket.giaVe,
            };
            listDanhSachVe.push(danhSachVe);
            setListDanhSachVe(listDanhSachVe);

            setTotalPrice(totalPrice + ticket.giaVe);
        } else {
            const list = listSeat.filter((seat) => {
                return seat.stt !== ticket.stt;
            });
            const listDisable = listDanhSachVe.filter((seat: IDanhSachVe) => {
                return seat.maGhe !== ticket.maGhe;
            });
            setListSeat(list);
            setListDanhSachVe(listDisable);
            setTotalPrice(totalPrice - ticket.giaVe);
        }
    };

    const commitBooking = () => {
        const booking = {
            maLichChieu: data.thongTinPhim.maLichChieu,
            danhSachVe: listDanhSachVe,
        };
        movieAPI
            .commitBooking(booking)
            .then((response) => {
                const newDanhSachGhe = danhSachGhe.map((seat) => {
                    if (listDanhSachVe.some((selected) => selected.maGhe === seat.maGhe)) {
                        return {
                            ...seat,
                            daDat: true,
                        };
                    }
                    return seat;
                });
                setDanhSachGhe(newDanhSachGhe);
                cleanData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (isLoading) {
        return <h1>...Loading</h1>;
    }
    if (error) {
        return <h1>error</h1>;
    }

    return (
        <div className="flex flex-wrap 2xl:max-w-7xl 2xl:mx-auto xl:max-w-7xl xl:mx-auto lg:max-w-6xl lg:mx-auto relative">
            <div className="flex-1 2xl:max-w-3xl xl:max-w-3xl lg:max-w-3xl">
                <div className="">
                    <div className="flex gap-2 flex-wrap justify-center items-center">
                        {danhSachGhe.map((list) => {
                            return (
                                <div>
                                    <button
                                        className={`${
                                            list.loaiGhe === "Vip"
                                                ? `${
                                                      list.daDat
                                                          ? "bg-gray-600 "
                                                          : `${
                                                                listDanhSachVe.some(
                                                                    (selected) => selected.maGhe === list.maGhe
                                                                )
                                                                    ? "bg-green-400"
                                                                    : "bg-yellow-400"
                                                            }`
                                                  }`
                                                : `${
                                                      list.daDat
                                                          ? "bg-gray-600 "
                                                          : `${
                                                                listDanhSachVe.some(
                                                                    (selected) => selected.maGhe === list.maGhe
                                                                )
                                                                    ? "bg-green-400"
                                                                    : "bg-gray-300"
                                                            }`
                                                  }`
                                        }  w-10 h-10 rounded-md text-center m-auto`}
                                        onClick={() => !list.daDat && handleSelect(list)}
                                    >
                                        {list.daDat ? "X" : list.stt}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-5 justify-center mt-10 rounded-md">
                    <div>
                        <p className="py-[8px] w-10 bg-gray-600 rounded-md text-center m-auto">X</p>
                        <h1>Đã Đặt</h1>
                    </div>
                    <div>
                        <p className="w-10 h-10 bg-gray-300 rounded-md m-auto"></p>
                        <h1>Thường</h1>
                    </div>
                    <div>
                        <p className="w-10 h-10 bg-yellow-400 rounded-md "></p>
                        <h1 className="text-center">Vip</h1>
                    </div>
                </div>
            </div>
            <div className="flex-1 2xl:fixed top-15 2xl:right-0 2xl:w-[30vw] xl:fixed xl:w-[25vw] xl:top-15 xl:right-0 lg:fixed lg:w-[25vw] lg:top-15 lg:right-0">
                <div className="shadow-xl h-auto text-base font-semibold w-full ml-auto">
                    <div className="px-3">
                        <div className="py-7 text-center font-medium text-3xl">
                            <span className="text-green-500 ml-auto">{totalPrice.toLocaleString("en-US")} VND</span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Cụm Rạp:</h3>
                            <span className="text-green-500 ml-auto">{data.thongTinPhim.tenCumRap}</span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Địa Chỉ:</h3>
                            <span className="text-green-500 ml-auto">{data.thongTinPhim.diaChi}</span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Rạp:</h3>
                            <span className="text-green-500 ml-auto">{data.thongTinPhim.tenRap}</span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Ngày giờ chiếu:</h3>
                            <span className="text-green-500 ml-auto">
                                {data.thongTinPhim.ngayChieu}&nbsp;~&nbsp;
                                <span className="text-red-500">{data.thongTinPhim.gioChieu}</span>
                            </span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Tên Phim:</h3>
                            <span className="text-green-500 ml-auto">{data.thongTinPhim.tenPhim}</span>
                        </div>
                        <hr />
                        <div className="py-7 flex">
                            <h3>Chọn:</h3>
                            {listSeat.map((seat) => {
                                return (
                                    <span className="text-green-500 ml-auto" key={seat.stt}>
                                        Ghế {seat.stt}
                                    </span>
                                );
                            })}
                        </div>
                        <hr />
                    </div>
                    <button className="bg-red-500 w-full py-5 font-semibold text-3xl" onClick={commitBooking}>
                        Đặt Vé
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieTicket;
