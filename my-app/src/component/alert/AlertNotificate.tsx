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
          />
        ) : props.type === "warning" ? (
          <Alert
            message="Warning"
            description={`${props.msg}`}
            type="warning"
            showIcon
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
            // closable
          />
        )}
      </Space>
  );
}
