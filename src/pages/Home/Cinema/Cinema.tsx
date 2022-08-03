import { getCinemaList } from "slices/cinema";
import { getTheaterList } from "slices/list-theater";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store";
import ListTheater from "./ListTheater";
import { getInfoTheater } from "slices/list-info-theater";
import moment from "moment";
import { Config, GROUPID } from "enum/cinema.enum";
import { useNavigate } from "react-router-dom";
const Cinema: React.FC = () => {
    const listCinema = useSelector((state: RootState) => state.cinema);
    const listTheater = useSelector((state: RootState) => state.list_theater);
    const listInfoTheater = useSelector((state: RootState) => state.list_info_theater);

    //state
    const [maCumRap, setMaCumRap] = useState("");
    const navigation = useNavigate();
    //functions
    const changeMaCumRap = (maCumRap: string): void => {
        setMaCumRap(maCumRap);
    };

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCinemaList());
    }, [dispatch]);

    // lay thong tin cum rap theo he thong
    useEffect(() => {
        if (listCinema.data.length > 0) {
            dispatch(getTheaterList(listCinema.data[0].maHeThongRap));
            const query = {
                cinema_id: listCinema.data[0].maHeThongRap,
                maNhom: GROUPID.VALUE,
            };
            dispatch(getInfoTheater(query));
        }
    }, [listCinema.data, dispatch]);

    useEffect(() => {
        if (listTheater.data.length > 0) {
            setMaCumRap(listTheater.data[0].maCumRap);
        }
    }, [listTheater.data]);

    if (listCinema.isLoading) {
        return <></>;
    }
    if (listCinema.error) {
        return <></>;
    }

    const getListTheater = (cinema_id: string): void => {
        dispatch(getTheaterList(cinema_id));
        const query = {
            cinema_id: cinema_id,
            maNhom: GROUPID.VALUE,
        };
        dispatch(getInfoTheater(query));
    };
    const goToBuyTicket = (maLichChieu: number) => {
        navigation(`../purchase/${maLichChieu}`);
    };
    return (
        <div className="text-center my-10 2xl:mx-auto 2xl:max-w-7xl xl:mx-auto xl:max-w-6xl">
            <h1 className="mb-10 text-3xl font-semibold">Lịch Chiếu Và Thông Tin Tất Cả Các Rạp</h1>
            <div className="flex flex-row justify-between mb-10 border p-4 2xl:mx-auto 2xl:max-w-7xl xl:mx-auto xl:max-w-6xl lg:mx-auto lg:max-w-5xl md:max-w-4xl md:mx-auto sm:max-w-xl sm:mx-auto">
                {listCinema.data?.map((cinema) => {
                    return (
                        <img
                            key={cinema.biDanh}
                            className="w-12 h-12 cursor-pointer"
                            src={cinema.logo}
                            alt={cinema.biDanh}
                            onClick={() => getListTheater(cinema.maHeThongRap)}
                        />
                    );
                })}
            </div>
            <div
                className="flex justify-start text-left 2xl:mx-auto 2xl:max-w-7xl xl:mx-auto xl:max-w-6xl lg:mx-auto lg:max-w-5xl md:max-w-4xl md:mx-auto sm:max-w-xl sm:mx-auto boder relative"
                style={{ maxHeight: "800px" }}
            >
                <div className="w-4/12">
                    {listTheater.data.map((theater, index) => {
                        return (
                            index < Config.PER_PAGE_THEATER && (
                                <ListTheater theater={theater} key={index} changeMaCumRap={changeMaCumRap} />
                            )
                        );
                    })}
                </div>
                <div className="w-4/5 overflow-y-auto scroll-smooth">
                    {listInfoTheater.data.map((info, index) => {
                        return info.lstCumRap.map((cumrap, index) => {
                            return (
                                cumrap.maCumRap === maCumRap &&
                                cumrap.danhSachPhim.map((movive, index) => {
                                    return (
                                        <div key={index} className="flex flex-row border mb-4 p-8 space-y-4 ">
                                            <div className="flex flex-none">
                                                <img src={movive.hinhAnh} className="w-32 h-40" />
                                            </div>
                                            <div className="pl-6">
                                                <div className="flex gap-2">
                                                    <span className="bg-red-500 w-9 text-center rounded-md ">C18</span>
                                                    <h1 className="font-bold 2xl:text-lg xl:text-base lg:text-base md:text-sm sm:text-xs">
                                                        {movive.tenPhim}
                                                    </h1>
                                                </div>
                                                <div className=" pt-5 flex flex-wrap gap-4 ">
                                                    {movive.lstLichChieuTheoPhim.map((lichchieu, index) => {
                                                        return (
                                                            index < Config.PER_PAGE_TIME && (
                                                                <div
                                                                    className=" border rounded p-2 tracking-widest cursor-pointer"
                                                                    onClick={() => goToBuyTicket(lichchieu.maLichChieu)}
                                                                    key={lichchieu.maLichChieu}
                                                                >
                                                                    <div>
                                                                        <span className="text-green-500 text-base 2xl:text-base xl:text-base lg:text-base md:text-sm sm:text-xs">
                                                                            {moment(lichchieu.ngayChieuGioChieu).format(
                                                                                "DD/MM/YYYY"
                                                                            )}
                                                                        </span>
                                                                        &nbsp;~&nbsp;
                                                                        <span className="text-red-500 font-semibold 2xl:text-base xl:text-base lg:text-base md:text-sm sm:text-xs">
                                                                            {moment(lichchieu.ngayChieuGioChieu).format(
                                                                                "hh:mm"
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            );
                        });
                    })}
                </div>
            </div>
        </div>
    );
};

export default Cinema;
