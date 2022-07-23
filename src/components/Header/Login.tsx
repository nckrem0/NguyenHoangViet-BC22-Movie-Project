import { FaRegUser } from "react-icons/fa";

const Login = () => {
    return (
        <div className="flex text-stone-500 hover:text-red-600 cursor-pointer">
            <i className="mt-1 mr-2"><FaRegUser /></i>
            <p className="font-medium ">Sign In</p>
        </div>
    )
    
};
export default Login;
