import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Row, Space } from "antd";
import ModalBtnDelete from "./ModalBtnDelete";
import { useDispatch, useSelector } from "react-redux";
import { StateStore } from "../../store/redux/Store";
import { deleteDataUser } from "../../store/redux/actions/dataUserActions";
import ModalBtnUpdate from "./ModalBtnUpdate";

// interface MyCRUDUserProps {}

export default function CRUDUser(props: any) {
  const getUser = useSelector((state: StateStore) => state);
  const dispatch = useDispatch();

  console.log(props, "props");

  useEffect(() => {}, [dispatch]);

  return (
    <>
      {
        <>
          <Divider orientation="left">Normal</Divider>
          <Row style={{ textAlign: "center" }}>
            <Col style={{ background: "#F8F8F8" }} span={1} order={1}>
              <Divider orientation="center">id</Divider>
            </Col>
            <Col style={{ background: "#F8F8F8" }} span={6} order={2}>
              <Divider orientation="center">Name</Divider>
            </Col>
            <Col style={{ background: "#F8F8F8" }} span={6} order={3}>
              <Divider orientation="center">email</Divider>
            </Col>
            <Col style={{ background: "#F8F8F8" }} span={6} order={4}>
              <Divider orientation="center">Phone</Divider>
            </Col>

            <Col style={{ background: "#F8F8F8" }} span={5} order={5}>
              <Divider orientation="center">Phone</Divider>
            </Col>
          </Row>

          {props.data.map((data: any) => (
            <Row
              key={data.id}
              style={{ textAlign: "center", marginTop: "5px" }}
            >
              <Col
                style={{ background: "#F8F8F8", padding: "20px" }}
                span={1}
                order={1}
              >
                {data.id}
              </Col>

              <Col
                style={{ background: "#F8F8F8", padding: "20px" }}
                span={6}
                order={2}
              >
                {data.name}
              </Col>
              <Col
                style={{ background: "#F8F8F8", padding: "20px" }}
                span={6}
                order={3}
              >
                {data.email}
              </Col>

              <Col
                style={{ background: "#F8F8F8", padding: "20px" }}
                span={6}
                order={4}
              >
                {data.numberPhone}
              </Col>

              <Col style={{ background: "#F8F8F8" }} span={5} order={5}>
                <Space align="center">
                  <ModalBtnDelete id={data.id} />
                  <ModalBtnUpdate />
                </Space>
              </Col>
            </Row>
          ))}
        </>
      }
    </>
  );
}
