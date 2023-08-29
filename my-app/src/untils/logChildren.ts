export const logChildren = (nestedArray: any) => {
  let ss: any[] = [];

  function logChildrenNames(obj: any) {
    if (obj.children && obj.children.length > 0) {
      ss.push(obj)

      for (let i = 0; i < obj.children.length; i++) {
        logChildrenNames(obj.children[i]);
      }
    }
  }

  // Sử dụng đệ quy để log tên của các đối tượng có trường "children"
  nestedArray.forEach((obj: any) => {
    logChildrenNames(obj);
  });

  return ss;
};
