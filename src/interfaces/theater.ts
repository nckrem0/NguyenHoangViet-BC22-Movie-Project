interface IDanhSachRap {
    maRap: string;
    tenRap: string;
}
export interface ITheater {
    maCumRap: string;
    tenCumRap: string;
    diaChi: string;
    danhSachRap: Array<IDanhSachRap>;
}
