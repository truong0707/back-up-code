import React from 'react';
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

const treeData: DataNode[] = [
  {
    title: 'Menu 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'sub menu a',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'sub menu b',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

const TreeLists: React.FC = () => (
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    switcherIcon={<DownOutlined />}
    treeData={treeData}
  />
);

export default TreeLists;