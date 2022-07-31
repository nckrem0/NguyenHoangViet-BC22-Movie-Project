export const replaceUrlIframe = (url: string) => {
    let correctUrl = "https://www.youtube.com/embed/";
    let newUrl = "";
    const autoplay = "?autoplay=1";
    if (url?.includes("https://youtube.com/embed/")) {
        return url;
    } else if (url.includes("https://www.youtube.com/watch?v=")) {
        const splitUrl = url.split("https://www.youtube.com/watch?v=");
        newUrl = correctUrl + splitUrl[1] + autoplay;
        return newUrl;
    } else if (url.includes("https://youtu.be/")) {
        const splitUrl = url.split("https://youtu.be/");
        newUrl = correctUrl + splitUrl[1] + autoplay;
        return newUrl;
    } else if (url.includes("https://youtube.com/")) {
        const splitUrl = url.split("https://youtube.com/");
        newUrl = correctUrl + splitUrl[1] + autoplay;
        return newUrl;
    }
    return newUrl;
};
