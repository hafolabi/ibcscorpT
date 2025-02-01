export interface SideRoutes {
  id: number;
  title: string;
  icon: any;
}

export interface DashOverviewTableDataObj {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export interface DashOverviewTable {
  tableData: DashOverviewTableDataObj[];
  loading: boolean;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  sortOrder: string;
  sortColumn: string
  setSortColumn: React.Dispatch<React.SetStateAction<"title" | "body">>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  refetch:boolean;
  handleDeleteTableItem: (param: number | undefined)=> void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddData: (param: DashOverviewTableDataObj)=> void;
}


