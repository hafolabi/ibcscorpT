import { debounce } from "lodash";
import { DashOverviewTableDataObj } from "./interfaces";

export const OnchangeHandler = debounce(
  (
    e: React.ChangeEvent<HTMLInputElement>,
    setSerachParams: React.Dispatch<React.SetStateAction<string>>,
    setFilteredData: React.Dispatch<React.SetStateAction<DashOverviewTableDataObj[]>>,
    tableData: DashOverviewTableDataObj[]
  ) => {
    e.preventDefault();
    const searchText = e.target.value;
    setSerachParams(searchText);

    const theFilterData = tableData?.filter((value) =>
      Object.values(value).join("").toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(theFilterData);
  },
  300 // Debounce delay 
);
