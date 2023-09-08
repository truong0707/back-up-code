import axiosClient from "../apis/axiosClient";

const menuServices = {
  getMenuApi: async () => {
    const response = await axiosClient.get(`/menus`);
    return response;
  },
  postMenuApi: async (
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
  getMenuByIdApi: async (id: number | string | null) => {
    const response = await axiosClient.get(`/menus/${id}`);
    return response;
  },
  updateMenuApi: async (
    id: number | string,
    inputData: {
      name: string;
      url: string;
      iconClass: string;
    }
  ) => {
    const response = await axiosClient.patch(`/menus/${id}`, {
      id: id,
      name: inputData.name,
      url: inputData.url,
      iconClass: inputData.iconClass,
    });

    return response;
  },

  updateFieldMenuApi: async (id: number | string, inputData: {}) => {
    const response = await axiosClient.patch(`/menus/${id}`, inputData);
    return response;
  },
  addSubMenuApi: async (id: number | string, data: {}) => {
    const response = await axiosClient.patch(`/menus/${id}`, data);
    return response;
  },
};

export default menuServices;
