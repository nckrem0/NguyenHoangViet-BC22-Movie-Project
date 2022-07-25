export interface IMovieTicket {
    thongTinPhim: ThongTinPhim;
    danhSachGhe: DanhSachGhe[];
}

interface DanhSachGhe {
    maGhe: number;
    tenGhe: string;
    maRap: number;
    loaiGhe: string;
    stt: string;
    giaVe: number;
    daDat: boolean;
    taiKhoanNguoiDat: string;
}

interface ThongTinPhim {
    maLichChieu: number;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
}
