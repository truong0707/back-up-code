import { useDispatch, useSelector } from "react-redux";
import MasterLayoutDoashBoard from "../../layouts/MasterLayoutDoashBoard";
import { StateStore } from "../../store/redux/Store";
import { useLocation } from "react-router-dom";
import { getDataDetailUser } from "../../store/redux/actions/dataUserActions";
import { useEffect } from "react";

export default function UserDetail() {
  const dispatch = useDispatch();
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const location = useLocation();
  const pathId = location.pathname.split("/")[3]; /* cat id  params*/


  useEffect(() => {
      // console.log(pathId, "sss");
      const getUserDetailPromise = getDataDetailUser(4);
      getUserDetailPromise(dispatch);
  },[])





  return <MasterLayoutDoashBoard>UserDatei</MasterLayoutDoashBoard>;
}
