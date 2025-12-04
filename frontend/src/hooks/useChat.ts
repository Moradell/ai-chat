import { useState, useCallback, useRef } from "react";
import { chatApi } from "@/services/api";
import type { Message } from "@/types";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamingMessageIdRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);

    const assistantMessageId = crypto.randomUUID();
    streamingMessageIdRef.current = assistantMessageId;

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await chatApi.sendMessageStream(
        { message: content },
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        (err) => {
          const errorMessage =
            err instanceof Error ? err.message : "Не удалось отправить сообщение";
          setError(errorMessage);
          console.error("Ошибка отправки сообщения:", err);
        },
        () => {
          setIsStreaming(false);
          setIsLoading(false);
          streamingMessageIdRef.current = null;
        }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось отправить сообщение";
      setError(errorMessage);
      console.error("Ошибка отправки сообщения:", err);
      setIsStreaming(false);
      setIsLoading(false);
      streamingMessageIdRef.current = null;
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  };
};
