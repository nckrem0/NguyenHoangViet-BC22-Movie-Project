import { FaRegUser } from "react-icons/fa";

type Props = {}

const Logout = (props: Props) => {
  return (
    <div className="flex pr-5 text-stone-500 hover:text-red-600 cursor-pointer">
            <i className="mt-1 mr-2"><FaRegUser /></i>
            <p className="font-medium ">Sign Up</p>
        </div>
  )
}
export default Logout;