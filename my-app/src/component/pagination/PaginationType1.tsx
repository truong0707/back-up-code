import React from "react";
import { Pagination } from "antd";

export default function PaginationType1(props: any) {
  return (
    <>
      <Pagination style={{ padding: "12px" }} defaultCurrent={1} total={props.total} />
    </>
  );
}
