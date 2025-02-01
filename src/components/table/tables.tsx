import Skeleton from "react-loading-skeleton";
import dummyData from "./tableData.json";
import {
  DashOverviewTable,
  DashOverviewTableDataObj,
} from "../../utiliz/interfaces";
import { Button, Popover } from "antd";
import Modals from "../modal";
import { useEffect, useState } from "react";
import dataService from "../../services/appData";
import {
  notifyErrorHandler,
  resolveErrorMsg,
  resolveSuccessMsg,
} from "../../services/serviceUtils/catchErrors";
import DasboardOverviewTableModal from "../modal/dashboardOverviewTable";

export function DashboardOverViewTable({
  tableData,
  loading,
  setSortOrder,
  sortOrder,
  sortColumn,
  setSortColumn,
  setRefetch,
  refetch,
  handleDeleteTableItem,
  setOpenModal,
  openModal,
  handleAddData,
  handleUpdate,
}: DashOverviewTable) {
  const [actionType, setActionType] = useState("");
  const [selectedItem, setSelectedItem] =
    useState<DashOverviewTableDataObj | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPostHandler = async () => {
    setIsPosting(true);
    const data = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      body: body,
      userId: Math.floor(Math.random() * 1000000),
    };
    try {
      const res: any = await dataService.createPost(data);
      if (res) {
        handleAddData(data);
        let { successMsg } = resolveSuccessMsg("Record successfully created!");
        notifyErrorHandler({
          type: "success",
          title: successMsg,
          msg: "",
          duration: 3000,
        });
        setTitle("");
        setBody("");
        setIsPosting(false);
        setOpenModal(false);
        setActionType("");
      }
    } catch (error) {
      let { errorMsg } = resolveErrorMsg(error);
      setIsPosting(false);
      notifyErrorHandler({
        type: "error",
        title: errorMsg,
        msg: error,
        duration: 3000,
      });
    }
  };

  const editPostHandler = async () => {
    setIsPosting(true);
    const data = {
      id: selectedItem?.id,
      title: title,
      body: body,
      userId: selectedItem?.userId,
    };
    try {
      const res: any = await dataService.editPost(selectedItem?.id, data);
      handleUpdate(Number(selectedItem?.id), data)
      if (res) {
        let { successMsg } = resolveSuccessMsg("Record successfully updated!");
        notifyErrorHandler({
          type: "success",
          title: successMsg,
          msg: "",
          duration: 3000,
        });
        setTitle("");
        setBody("");
        setIsPosting(false);
        setOpenModal(false);
        // refetch can only be applicable if we are deeling with a live data from a live serve
        // setRefetch(!refetch);
        setActionType("");
      }
    } catch (error) {
      let { errorMsg } = resolveErrorMsg(error);
      setIsPosting(false);
      notifyErrorHandler({
        type: "error",
        title: errorMsg,
        msg: error,
        duration: 3000,
      });
    }
  };

  const deletePostHandler = async () => {
    setIsPosting(true);
    try {
      const res: any = await dataService.deletePost(selectedItem?.id);
      if (res) {
        handleDeleteTableItem(selectedItem?.id);
        let { successMsg } = resolveSuccessMsg("Record successfully Deleted!");
        notifyErrorHandler({
          type: "success",
          title: successMsg,
          msg: "",
          duration: 3000,
        });
        setActionType("");
        setIsPosting(false);
        setOpenModal(false);
        setTitle("");
        setBody("");
      }
    } catch (error) {
      let { errorMsg } = resolveErrorMsg(error);
      setIsPosting(false);
      notifyErrorHandler({
        type: "error",
        title: errorMsg,
        msg: error,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    setTitle(selectedItem?.title || "");
    setBody(selectedItem?.body || "");
  }, [selectedItem]);

  return (
    <div className="relative overflow-x-auto my-6 rounded-xl border md:block md:w-[99%] w-[100%] bg-white">
      <table className={`text-sm text-left w-full`}>
        <thead className="text-sm !px-10">
          <tr className="border-b !py-4 px-10">
            <th
              scope="col"
              className="px-4 !font-medium md:px-6 py-4 cursor-pointer capitalize"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setSortColumn("title");
              }}
            >
              Name{" "}
              {sortColumn === "title" && (sortOrder === "asc" ? "🔼" : "🔽")}
            </th>
            <th
              scope="col"
              className="px-4 !font-medium md:px-6 py-4 cursor-pointer capitalize"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setSortColumn("body");
              }}
            >
              Description {sortOrder === "asc" ? "🔼" : "🔽"}
            </th>
            <th scope="col" className="px-4 !font-medium md:px-6 py-4">
              User ID
            </th>
            <th scope="col" className="px-4 !font-medium md:px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                <div className="my-5">
                  {" "}
                  <Skeleton highlightColor="#999" />{" "}
                </div>
              </td>
            </tr>
          ) : (
            <>
              {tableData?.length > 0 ? (
                <>
                  {tableData.map((item: DashOverviewTableDataObj) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 text-[#676A6B] text-[13px] cursor-pointer"
                    >
                      <td
                        scope="row"
                        className="p-2 text-left px-4 md:px-6 md:py-4 capitalize"
                      >
                        {item.title?.substring(0, 15)}
                        {item?.title?.length > 15 && "..."}
                      </td>
                      <td
                        scope="row"
                        className="p-2 text-left px-4 md:px-6 md:py-4 first-letter:capitalize"
                      >
                        {item?.body?.substring(0, 20)}
                        {item?.title?.length > 20 && "..."}
                      </td>
                      <td className="p-2 text-left px-4 md:px-6 md:py-4 capitalize">
                        {item.userId}
                      </td>
                      <td className="p-2 text-left px-4 md:px-6 md:py-4 capitalize text-[22px]">
                        <div
                          style={{
                            clear: "both",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Popover
                            placement="bottomLeft"
                            content={
                              <div className="flex flex-col space-y-2 items-start justify-start">
                                <button
                                  className="hover:text-[#6f6e6e]"
                                  onClick={() => {
                                    setOpenModal(true);
                                    setActionType("edit");
                                    setSelectedItem(item);
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="hover:text-[#6f6e6e]"
                                  onClick={() => {
                                    setOpenModal(true);
                                    setActionType("delete");
                                    setSelectedItem(item);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            }
                            trigger="click"
                            zIndex={1}
                          >
                            <Button className="" style={{ border: 0 }}>
                              ...
                            </Button>
                          </Popover>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={8} className="text-center">
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: "20px",
                            marginBottom: "20px",
                          }}
                        >
                          You have no record yet!
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>

      {/* THE MODAL SECTION */}
      <Modals open={openModal} setOpen={setOpenModal}>
        <DasboardOverviewTableModal
          actionType={actionType}
          setOpenModal={setOpenModal}
          setBody={setBody}
          setTitle={setTitle}
          setActionType={setActionType}
          title={title}
          isPosting={isPosting}
          body={body}
          deletePostHandler={deletePostHandler}
          editPostHandler={editPostHandler}
          createPostHandler={createPostHandler}
        />
      </Modals>
    </div>
  );
}
