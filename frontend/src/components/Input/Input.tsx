import { useState, KeyboardEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const Input = ({
  onSend,
  disabled = false,
  placeholder = "Введите сообщение...",
}: InputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value);
      setValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
      >
        Отправить
      </button>
    </div>
  );
};
