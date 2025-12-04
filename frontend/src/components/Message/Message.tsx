import type { Message as MessageType } from "@/types";
import styles from "./Message.module.scss";

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}
    >
      <div className={styles.content}>
        <div className={styles.role}>{isUser ? "Вы" : "ИИ"}</div>
        <div className={styles.text}>{message.content}</div>
        <div className={styles.timestamp}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
