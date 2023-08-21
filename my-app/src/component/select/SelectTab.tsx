import React from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Select, Tag } from "antd";

const options = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const SelectTab: React.FC = () => {
  const handleSubmit = (e: any) => {
    console.log(e, "e sbmit");
  };
  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      defaultValue={["gold", "cyan"]}
      style={{ width: "100%" }}
      options={options}
      onChange={handleSubmit}
    />
  );
};

export default SelectTab;
