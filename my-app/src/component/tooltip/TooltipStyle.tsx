import React from "react";
import { Button, Tooltip } from "antd";

const TooltipStyle: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <div>
      <div>
        <Tooltip
          title="Thanks for using antd. Have a nice day!"
          trigger="click"
          defaultOpen
        >
          <Button>Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TooltipStyle;
