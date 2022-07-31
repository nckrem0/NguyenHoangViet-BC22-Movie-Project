import loadingImage from "images/loadingPage.gif";

const Loading = () => {
    return (
        <div
            className="fixed z-10 top-0 left-0 flex items-center justify-center h-full w-screen"
            style={{ background: "#130831" }}
        >
            <img src={loadingImage} className="w-auto h-auto bg-contain" />
        </div>
    );
};

export default Loading;
