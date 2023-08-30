import { childrenData } from "../component/tree/TreeMenu";

export const handleUpdateChildtreeMenu = (
    children: childrenData[] | undefined,
    titleSub: string,
    idSub: any,
    urlSub: string
  ): any[] => {
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