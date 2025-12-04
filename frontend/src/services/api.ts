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

  sendMessageStream: async (
    request: ChatRequest,
    onChunk: (chunk: string) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void
  ): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Response body is not readable");
      }

      let done = false;
      while (!done) {
        const result = await reader.read();
        done = result.done;

        if (result.value) {
          const chunk = decoder.decode(result.value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);

              if (data === "[DONE]") {
                onComplete?.();
                return;
              }

              if (data.startsWith("[ERROR]")) {
                const errorMsg = data.slice(8);
                onError?.(new Error(errorMsg));
                return;
              }

              if (data.trim()) {
                onChunk(data);
              }
            }
          }
        }
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error("Unknown error"));
    }
  },

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await apiClient.get("/health");
    return response.data;
  },
};

export default apiClient;
