import { childrenData } from "../component/tree/TreeMenu";

export const findDataDetailSumenu = (
  children: childrenData[] | undefined,
  idSub: any
): any[] => {
  const ss: childrenData[] = [];

  if (!children || children.length === 0) {
    return [];
  }

  return children.map((childMenu: childrenData) => {
    if (childMenu.id === idSub) {
      ss.push(childMenu);
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
