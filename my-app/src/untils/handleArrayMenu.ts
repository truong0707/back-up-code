import { MyInputSubMenu } from "../component/admin/menu/BtnShowModalAddSubMenu";
import { childrenData } from "../component/tree/TreeMenu";

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


export const findDataDetailSumenu = (
  children: childrenData[] | undefined,
  idSub: number
): {}[] => {
  const newChildren: childrenData[] = [];

  if (!children || children.length === 0) {
    return [];
  }

  return children.map((childMenu: childrenData) => {
    if (childMenu.id === idSub) {
      newChildren.push(childMenu);
      return {
        ...childMenu,
        children: findDataDetailSumenu(childMenu.children, idSub),
      };
    }
    return {
      title: childMenu.title,
      id: childMenu.id,
      children: findDataDetailSumenu(childMenu.children, idSub),
      url: childMenu.url,
    };
  });
};

export const handleUpdateChildtreeMenu = (
  children: childrenData[] | undefined,
  titleSub: string,
  idSub: number | string,
  urlSub: string
): {}[] => {
  if (!children || children.length === 0) {
    return [];
  }

  return children.map((childMenu: childrenData) => {
    if (childMenu.id === idSub) {
      return {
        id: idSub,
        title: titleSub,
        url: urlSub,
        children: handleUpdateChildtreeMenu(
          childMenu.children,
          titleSub,
          idSub,
          urlSub
        ),
      };
    }

    return {
      title: childMenu.title,
      id: childMenu.id,
      children: handleUpdateChildtreeMenu(
        childMenu.children,
        titleSub,
        idSub,
        urlSub
      ),
      url: childMenu.url,
    };
  });
};



export function DeleteMenuByID(arr: never[], idDelete: string | number) {
  return arr.filter((item: {
    id: string,
    children: never[]
  }) => {
    if (item.id === idDelete) {
      return false;
    }

    if (item.children && item.children.length > 0) {
      item.children = DeleteMenuByID(item.children, idDelete);
    }

    return true;
  });
}
