import React from "react";
import { Alert, Space } from "antd";

interface myAlertNotiProps {
  msg: string;
  type: string;
}

export default function AlertNotificate(props: myAlertNotiProps) {
  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        {props.type === "error" ? (
          <Alert
            message="Error"
            description={`${props.msg}`}
            type="error"
            showIcon
          />
        ) : (
          <Alert message="Success Tips" type="success" showIcon />
        )}
        {/* <Alert message="Informational Notes" type="info" showIcon />
        <Alert message="Warning" type="warning" showIcon closable />
        <Alert message="Error" type="error" showIcon />
        <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        />
        <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
        />
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
        /> */}
      </Space>
    </div>
  );
}
