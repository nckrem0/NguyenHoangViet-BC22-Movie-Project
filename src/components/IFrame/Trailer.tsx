import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
type Props = {
    isOpenIframe: boolean;
    playOrCloseTrailer(type: string): void;
    title: string;
    trailer: string;
};
const Trailer = (props: Props) => {
    const { isOpenIframe, title, trailer, playOrCloseTrailer } = props;
    return (
        <div
            className={`w-screen h-screen z-10 top-0 left-0 bottom-0 ${
                isOpenIframe ? "flex" : "hidden transition-opacity"
            } fixed bg-fixed`}
            style={{ background: "rgba(0,0,0,0.9)", overflow: "-moz-hidden-unscrollable" }}
        >
            <div className="fixed z-10 right-10 top-10">
                <IoIosCloseCircleOutline
                    className="text-white text-[70px] cursor-pointer"
                    onClick={() => playOrCloseTrailer("close")}
                />
            </div>
            <div className="flex flex-1 h-full items-center justify-center">
                <iframe
                    id="trailer-frame"
                    title={title}
                    allowFullScreen
                    height="80%"
                    src={trailer}
                    width="80%"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                />
            </div>
        </div>
    );
};

export default Trailer;
