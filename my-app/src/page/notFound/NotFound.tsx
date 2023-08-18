import { Button, Result } from "antd";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import LoadingCpn from "../../component/spin/LoadingCpn";

const NotFound = () => {
  return (
    <>
      <Suspense fallback={<LoadingCpn />}>
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Suspense>
    </>
  );
};
export default NotFound;
