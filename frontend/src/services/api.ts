import axios from "axios";
import type { ChatRequest, ChatResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const chatApi = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>("/chat", request);
    return response.data;
  },

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await apiClient.get("/health");
    return response.data;
  },
};

export default apiClient;
