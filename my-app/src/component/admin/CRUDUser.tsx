import React, { Suspense, lazy, useEffect, useState } from "react";
import { Col, Divider, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoadingCpn from "../spin/LoadingCpn";
import Styles from "./Admin.module.scss";
import { StateStore } from "../../store/redux/Store";
import AlertNotificate from "../alert/AlertNotificate";

const ModalBtnAdd = lazy(() => import("./ModalBtnAdd"));
const ModalBtnDelete = lazy(() => import("./ModalBtnDelete"));
const ModalBtnUpdate = lazy(() => import("./ModalBtnUpdate"));

interface MyCRUDUserProps {
  title: String;
  data: [];
  titleCate: any;
  contentBtnAdd?: string;
}

export default function CRUDUser(props: MyCRUDUserProps) {
  const dataUsers = useSelector((state: StateStore) => state.dataUsers); // get data store
  const { msgDeleteError, msgDeleteSuccess } = dataUsers;

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <Space>
          <ModalBtnAdd contentBtnAdd={props.contentBtnAdd} />
        </Space>

        <Divider orientation="left">{props.title}</Divider>

        <div style={{ width: "99%" }}>
          {msgDeleteError ? (
            <>
              <AlertNotificate msg={msgDeleteError} type={"error"} />
            </>
          ) : msgDeleteSuccess ? (
            <>{alert(msgDeleteSuccess)}</>
          ) : null}
        </div>

        <Row style={{ textAlign: "center" }}>
          {props.titleCate.map((result: any, index: number) => (
            <Col
              key={index}
              className={Styles.Col_cate}
              span={result.span}
              order={index}
            >
              <Divider orientation="center">{result.nameCate}</Divider>
            </Col>
          ))}
        </Row>

        {/* show data */}
        {props.data.map((data: any) => (
          <Row key={data.id} style={{ textAlign: "center", marginTop: "5px" }}>
            <Col className={Styles.Col_IfoTable} span={1} order={1}>
              {data.id}
            </Col>

            <Col className={Styles.Col_IfoTable} span={6} order={2}>
              {data.name}
            </Col>
            <Col className={Styles.Col_IfoTable} span={6} order={3}>
              {data.email}
            </Col>

            <Col className={Styles.Col_IfoTable} span={6} order={4}>
              {data.numberPhone}
            </Col>

            <Col style={{ background: "#F8F8F8" }} span={5} order={5}>
              <Space align="center">
                <ModalBtnDelete
                  /* isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} */ id={
                    data.id
                  }
                  // handleDelete={handleDelete}
                  email={data.email}
                />
                <ModalBtnUpdate idUser={data.id} />
              </Space>
            </Col>
          </Row>
        ))}
      </Suspense>
    </>
  );
}
