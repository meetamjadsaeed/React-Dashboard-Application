import { useEffect, useState } from "react";
import "./App.css";
import PublicRoutes from "./routes/Publicroutes";
import AppService from "./services/appServices";
import ReUse from "./services/helpers/reUse";

import { useDispatch } from "react-redux";
import { CRUDActions } from "./redux/slices/customersCRUD.slice";

function App() {
  const dispatch = useDispatch();

  const [apiData, setApiData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const getAllUsers = AppService.getAllUsers({ pageNumber: currentPage });

  //   ReUse.getApiData(getAllUsers, setApiData, setDataLoading);
  // }, [currentPage]);

  // const data = apiData[0];

  // dispatch(CRUDActions.AddItem(data));

  return (
    <>
      <PublicRoutes />
    </>
  );
}

export default App;
