import React, { Suspense, lazy, useEffect } from "react";
import { Divider, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../../spin/LoadingCpn";
import { StateStore } from "../../../store/redux/Store";
import AlertNotificate from "../../alert/AlertNotificate";
import { getMenuAction } from "../../../store/redux/actions/menuActions";

const ModalBtnAdd = lazy(() => import("./ModalBtnAdd"));

interface MyCRUDUserProps {
  title: String;
  data: [];
  contentBtnAdd?: string;
  columnsTitle: any;
}

const CRUDUser = (props: MyCRUDUserProps) => {
  const dataUsers = useSelector((state: StateStore) => state.dataUsers);
  const { msgDeleteError } = dataUsers;
  const dispatch = useDispatch();

  useEffect(() => {
    const dataMenuPromise = getMenuAction();
    dataMenuPromise(dispatch);
  }, [dispatch]);

  const handleData = (menu: []) => {
    if (menu) {
      const data = menu.map((dataMenu: { id: string; children: [] }): any => {
        return {
          ...dataMenu,
          key: dataMenu.id,
          children: handleData(dataMenu.children),
        };
      });

      return data;
    }

    return undefined;
  };

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <Space style={{ padding: "10px" }}>
          <ModalBtnAdd contentBtnAdd={props.contentBtnAdd} />
        </Space>

        <Divider orientation="left">{props.title}</Divider>
        <div style={{ width: "99%" }}>
          {msgDeleteError ? (
            <>
              <AlertNotificate msg={"Lỗi server"} type={"error"} />
            </>
          ) : null}
        </div>
        <Table
          columns={props.columnsTitle}
          dataSource={handleData(props.data)}
        />
      </Suspense>
    </>
  );
};
export default CRUDUser;
