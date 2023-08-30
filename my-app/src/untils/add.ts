export const addChildToParentById = (menuData:any, parentId:any, childData:any) => {
    const updatedMenuData = menuData.map((item: any) => {
      if (item.id === parentId) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(childData);
      } else if (item.children && item.children.length > 0) {
        item.children = addChildToParentById(item.children, parentId, childData);
      }
      return item;
    });
  
    return updatedMenuData;
  };
  