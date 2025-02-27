import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export interface Device {
  id?: string;
  name: string;
  maker: string;
}

export const deviceApi = {
  // デバイス一覧の取得
  getAllDevices: async (): Promise<Device[]> => {
    const response = await axios.get(`${API_BASE_URL}/devices`);
    return response.data;
  },

  // デバイスの取得
  getDevice: async (id: string): Promise<Device> => {
    const response = await axios.get(`${API_BASE_URL}/devices/${id}`);
    return response.data;
  },

  // デバイスの作成
  createDevice: async (device: Device): Promise<Device> => {
    const response = await axios.post(`${API_BASE_URL}/devices`, device);
    return response.data;
  },

  // デバイスの更新
  updateDevice: async (id: string, device: Device): Promise<Device> => {
    const response = await axios.put(`${API_BASE_URL}/devices/${id}`, device);
    return response.data;
  },

  // デバイスの削除
  deleteDevice: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/devices/${id}`);
  }
}; 