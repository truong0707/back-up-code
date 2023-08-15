import { Alert, Space } from "antd";
import Styles from './AlertNotificate.module.scss'

interface myAlertNotiProps {
  msg: string;
  type: string;
}

export default function AlertNotificate(props: myAlertNotiProps) {
  return (
      <Space direction="vertical" className={Styles.wrapperAlertNoti} >
        {props.type === "error" ? (
          <Alert
            message="Error"
            description={`${props.msg}`}
            type="error"
            showIcon
            // closable
          />
        ) : props.type === "warning" ? (
          <Alert
            message="Warning"
            description={`${props.msg}`}
            type="warning"
            showIcon
            // closable
          />
        ) : props.type === "note" ? (
          <Alert
            message="Informational Notes"
            description={`${props.msg}`}
            type="info"
            showIcon
            // closable
          />
        ) : (
          <Alert
            message="Success Tips"
            description={`${props.msg}`}
            // message={`${props.msg}`}
            type="success"
            showIcon
            // closable
          />
        )}
      </Space>
  );
}
