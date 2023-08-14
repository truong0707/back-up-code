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
        ) : props.type === "warning" ? (
          <Alert
            message="Warning"
            description={`${props.msg}`}
            type="warning"
            showIcon
            closable
          />
        ) : props.type === "note" ? (
          <Alert
            message="Informational Notes"
            description={`${props.msg}`}
            type="info"
            showIcon
          />
        ) : (
          <Alert
            message="Success Tips"
            description={`${props.msg}`}
            // message={`${props.msg}`}
            type="success"
            showIcon
          />
        )}
      </Space>
    </div>
  );
}
