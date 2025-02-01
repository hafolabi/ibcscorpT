import logo from "../../logo.svg";
import { TiHomeOutline } from "react-icons/ti";
import { CiSettings } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { SideRoutes } from "../../utiliz/interfaces";

const Sidebar = () => {

  const routes: SideRoutes[] = [
    {
      id: 1,
      title: "Home",
      icon: <TiHomeOutline />,
    },
    {
      id: 2,
      title: "Tranasations",
      icon: <GrTransaction />,
    },
    {
      id: 3,
      title: "Users Profile",
      icon: <FaRegUser />,
    },
  ];

  return (
    <div className="bg-[#fcfbfb] h-screen border-r fixed xl:w-[205px] w-[180px]">
      <div className="px-4 pt-6 pb-4 flex  items-center text-[#4a4949]">
        <img src={logo} className="w-[50px]" alt="logo" />
        <p className="item-[16px] font-[700]">iBCScorp </p>
      </div>
      <div className="h-[78%] sticky overflow-hidden hover:overflow-y-auto px-4">
        {routes.map((items: SideRoutes, index: number) => (
          <div className="flex items-center gap-2 my-5" key={index}>
            {items.icon}
            <p className=" text-[14px] cursor-pointer hover:text-[#6f6e6e]">{items.title}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4">
        <CiSettings />
        <p className=" text-[14px] cursor-pointer hover:text-[#6f6e6e]">Settings</p>
      </div>
    </div>
  );
};

export default Sidebar;
