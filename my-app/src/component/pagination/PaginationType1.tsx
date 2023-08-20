import React from "react";
import { Pagination } from "antd";

const PaginationType1 = (props: any) => {
  return (
    <>
      <Pagination style={{ padding: "12px" }} defaultCurrent={1} total={props.total} />
    </>
  );
}
export default PaginationType1
