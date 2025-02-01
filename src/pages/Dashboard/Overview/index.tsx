import React, { useCallback, useEffect, useState } from "react";
import { DashboardOverViewTable } from "../../../components/table/tables";
import {
  notifyErrorHandler,
  resolveErrorMsg,
} from "../../../services/serviceUtils/catchErrors";
import dataService from "../../../services/appData";
import { CiSearch } from "react-icons/ci";
import { DashOverviewTableDataObj } from "../../../utiliz/interfaces";
import { OnchangeHandler } from "../../../utiliz/helper";

export const Overview = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSerachParams] = useState("");
  const [filteredData, setFilteredData] = useState<DashOverviewTableDataObj[]>(
    []
  );
  const [tableData, setTableData] = useState<DashOverviewTableDataObj[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<"title" | "body">("title");
  const [refetch, setRefetch] = useState(false)

  //for the search filter
  const MutatedData = searchParam ? filteredData : tableData;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(MutatedData.length / itemsPerPage);

  //for the pagination data 
  const newData = MutatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortedUsers = [...newData].sort((a, b) => {
    const fieldA = a[sortColumn].toLowerCase();
    const fieldB = b[sortColumn].toLowerCase();

    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  //to remove the deleteed table item
  const handleDeleteTableItem = (id: number | undefined) => {
    setTableData((prevData) => prevData.filter((item: DashOverviewTableDataObj) => item?.id !== id));
  };

  //to add an item to the table list when create a post
  const handleAddData = (newItem: DashOverviewTableDataObj) => {
    setTableData((prevData) => [newItem, ...prevData]);
  };

  const getAllPost = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await dataService.getAllPosts();
      setTableData(res);
      setLoading(false);
    } catch (error) {
      let { errorMsg } = resolveErrorMsg(error);
      setLoading(false);
      notifyErrorHandler({
        type: "error",
        title: errorMsg,
        msg: error,
        duration: 3000,
      });
    }finally {
      setLoading(false);
    }
  }, [setLoading, setTableData, notifyErrorHandler]);

  useEffect(() => {
    getAllPost();
  }, [refetch]);
  return (
    <div>
      <div className="text-[16px] font-[500]">Dashboard</div>
      <div>
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
          <div className="border border-[#b2b4b6] rounded-lg hover:border-[#245d00] md:w-[40%] w-[95%] flex items-center px-2 gap-2 ">
            <CiSearch size="22" />
            <input
              className="py-2 !border-0 w-full  !text-[#b4b8ba] !bg-transparent !outline-one  focus:ring-0 focus-visible:ring-0 focus:outline-none "
              placeholder="Search"
              onChange={(e) =>
                OnchangeHandler(e, setSerachParams, setFilteredData, tableData)
              }
            />
          </div>
          <p className="mr-4 border px-4 py-2 rounded-lg cursor-pointer border-[#b2b4b6] hover:border-[#245d00] mt-4 md:mt-0 text-center"
            onClick={()=> setOpenModal(true)}
          >Create Post</p>
        </div>
        <DashboardOverViewTable
          loading={loading}
          tableData={sortedUsers}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          setRefetch={setRefetch}
          refetch={refetch}
          handleDeleteTableItem={handleDeleteTableItem}
          setOpenModal={setOpenModal}
          openModal={openModal}
          handleAddData={handleAddData}
        />

        <div className="flex justify-center mt-4 space-x-2 my-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages || MutatedData.length == 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
