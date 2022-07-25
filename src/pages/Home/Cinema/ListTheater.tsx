import { ITheater } from "interfaces/theater";

type Props = {
    theater: ITheater;
    changeMaCumRap(maCumRap: string): void;
};

const ListTheater = (props: Props) => {
    const { theater, changeMaCumRap } = props;
    return (
        <div className=" relative cursor-pointer" onClick={() => changeMaCumRap(theater.maCumRap)}>
            <div className="shadow-inner theater_list pt-5 truncate">
                <h1 className="text-green-500 font-medium truncate">{theater.tenCumRap}</h1>
                <p className="truncate">{theater.diaChi}</p>
                <p className="text-red-500 font-normal text-sm truncate">[Chi Tiết]</p>
            </div>
            <span className="top-0 h-full bg-green-500 absolute transition-all"></span>
        </div>
    );
};

export default ListTheater;
