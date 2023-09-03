import { MyInputSubMenu } from "../component/admin/menu/BtnShowModalAddSubMenu";

export const addChildToParentById = (
  currentData: any[],
  parentId: string | number,
  childData: object
) => {
  const addSubMenuData = currentData.map(
    (item: { id: number; children: object[] }) => {
      if (item.id === parentId) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(childData);
      } else if (item.children && item.children.length > 0) {
        item.children = addChildToParentById(
          item.children,
          parentId,
          childData
        );
      }
      return item;
    }
  );

  return addSubMenuData;
};

export const addChildToMenu = (
  currentData: {
    children: [];
    id: number;
  }[],
  idmenu: number,
  inputData: MyInputSubMenu
) => {
  // eslint-disable-next-line array-callback-return
  const filterData: any = currentData.filter((menu) => {
    if (menu.id === idmenu) {
      return menu;
    }
  });
  filterData[0].children.push(inputData);
  return filterData[0];
};
