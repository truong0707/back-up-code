export const logChildren = (nestedArray: []) => {
  let ss: any[] = [];

  function logChildrenNames(obj: {
    children: [],
  }) {
    if (obj.children && obj.children.length > 0) {
      ss.push(obj)

      for (let i = 0; i < obj.children.length; i++) {
        logChildrenNames(obj.children[i]);
      }
    }
  }

  nestedArray.forEach((obj: {
    children: []
  }) => {
    logChildrenNames(obj);
  });

  return ss;
};
