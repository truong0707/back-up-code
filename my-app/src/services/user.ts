import axiosClient from "../apis/axiosClient";

const userServices = {
  userLoginApi: async (email: string, password: string) => {
    const response = await axiosClient.post(`/login`,  { email, password });
    return response;
  },
  userRegisterApi: async (name: string, email: string, password: string, confirmPass: string, numberPhone: string) => {
    const response = await axiosClient.post(`/register`,  { name, email, password, confirmPass, numberPhone },);
    return response;
  },
  getUserApi: async () => {
    const response = await axiosClient.get(`/users`);
    return response;
  },
  deleteUserApi: async (id: string) => {
    const response = await axiosClient.delete(`/users/${id}`);
    return response;
  },
  updateUserApi: async (id: string, name: string, email: string, numberPhone: string) => {
    const response = await axiosClient.put(`/users/${id}`, { name, email, numberPhone });
    return response;
  },
  addUserApi: async (name: string, email: string, numberPhone: string, password: string) => {
    const response = await axiosClient.post(`/users/`, { name, email, numberPhone, password },);
    return response;
  },
};

export default userServices;
