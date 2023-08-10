import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SelectOptionLan: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'vienamese', label: 'Tiếng việt' },
        { value: 'lucy', label: 'Tiếng anh' },
        // { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
  </Space>
);

export default SelectOptionLan;