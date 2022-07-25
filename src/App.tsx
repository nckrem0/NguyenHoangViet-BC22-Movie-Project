import { Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import MovieDetail from "pages/MovieDetail";
import MainTemplate from "template/MainTemplate";
import MovieTicket from "pages/MovieTicket";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainTemplate />}>
                    <Route path="detail/:movieId" element={<MovieDetail />} />
                    <Route path="purchase/:movieTicketId" element={<MovieTicket />} />

                    <Route index element={<Home />} />
                </Route>
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
        </>
    );
}

export default App;
