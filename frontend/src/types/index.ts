export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}
