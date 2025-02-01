import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topNav/topbar";
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {

  return (
    <div className="w-full xl:gap-[205px] gap-[180px] flex items-start mx-auto 2xl:w-[1440px]">
      <div className="hidden lg:block ">
        <Sidebar />
      </div>
      <div className="xl:w-[86%] w-full">
        <Topbar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
