import { nav_data } from "routes/navigation";
import NavigationBar from "./NavigationBar";
import logo from "images/logo.png";
import Login from "./Login";
import Logout from "./Logout";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <nav className="flex space-x-4 items-center py-1 2xl:max-w-full    ">
            {/* logo */}
            <Link to={"/"}>
                <img src={logo} className="w-14 h-14 cursor-pointer ml-4" />
            </Link>
            {/* navigation */}
            <div className="flex-1 flex justify-center xl:text-sm md:text-xs 2xl:text-base sm:text-xs">
                {nav_data.map((nav, index) => (
                    <NavigationBar nav={nav} id={index} key={nav.id} />
                ))}
            </div>

            {/* login logout */}
            <div className="flex xl:text-sm md:text-xs 2xl:text-base sm:text-xs">
                <Login />
                <span className="mx-3 text-stone-500">|</span>
                <Logout />
            </div>
        </nav>
    );
};

export default Header;
