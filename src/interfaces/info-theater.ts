export interface IInfoTheater {
    lstCumRap: ILstCumRap[];
    maHeThongRap: string;
    tenHeThongRap: string;
    logo: string;
    manhom: string;
}

interface ILstCumRap {
    danhSachPhim: IDanhSachPhim[];
    maCumRap: string;
    tenCumRap: string;
    hinhAnh: string;
    diaChi: string;
}

interface IDanhSachPhim {
    lstLichChieuTheoPhim: ILstLichChieuTheoPhim[];
    maPhim: number;
    tenPhim: string;
    hinhAnh: string;
    hot: boolean | null;
    dangChieu: boolean | null;
    sapChieu: boolean | null;
}

interface ILstLichChieuTheoPhim {
    maLichChieu: number;
    maRap: string;
    tenRap: string;
    ngayChieuGioChieu: Date;
    giaVe: number;
}
