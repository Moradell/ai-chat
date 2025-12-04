import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { Message } from "@/components/Message";
import { Input } from "@/components/Input";
import styles from "./Chat.module.scss";

export const Chat = () => {
  const {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Chat</h1>
        {messages.length > 0 && (
          <button
            className={styles.clearButton}
            onClick={clearMessages}
            disabled={isStreaming}
          >
            Очистить
          </button>
        )}
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Начните разговор с ИИ</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isStreaming={
                isStreaming &&
                message.role === "assistant" &&
                message === messages[messages.length - 1]
              }
            />
          ))
        )}
        {error && <div className={styles.errorMessage}>Ошибка: {error}</div>}
        <div ref={messagesEndRef} />
      </div>

      <Input onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};
