import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../logo.svg";

const Topbar = () => {
  return (
    <div className="h-[70px] flex items-center px-4 border-b lg:justify-end justify-between sticky top-0 z-50 bg-white">
        <div className="lg:px-4 pt-6 pb-4 flex items-center text-[#4a4949] lg:hidden ">
            <img src={logo} className="w-[50px]" alt="logo" />
            <p className="item-[16px] font-[700]">iBCScorp </p>
        </div>
          <div className="flex  items-center gap-4">
            <IoMdNotificationsOutline size="20" />
            <div className="h-[40px] w-[40px] flex justify-center items-center rounded-full bg-[#f2f2f2] text-[14px]">
              AO
            </div>

            <div className="flex justify-between items-center border  p-1 capitalize cursor-pointer rounded-lg">
              <MdOutlineKeyboardArrowDown size="18" />
            </div>
          </div>
        </div>
  )
}

export default Topbar