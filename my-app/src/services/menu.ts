import axiosClient from "../apis/axiosClient";

const menuServices = {
  getMenuApi: async () => {
    const response = await axiosClient.get(`/menus`);
    return response;
  },
  postMenuApi: async (
    // idMenu: number,
    nameMenu: string,
    urlMenu: string,
    iconClass: string,
    children: []
  ) => {
    const response = await axiosClient.post(`/menus`, {
      name: nameMenu,
      url: urlMenu,
      iconClass: iconClass,
      children: children,
    });

    return response;
  },

  deleteMenuApi: async (id: number | string) => {
    const response = await axiosClient.delete(`/menus/${id}`);
    return response;
  },
  getMenuByIdApi: async (id: number | string) => {
    const response = await axiosClient.get(`/menus/${id}`);
    return response;
  },
};

export default menuServices;
