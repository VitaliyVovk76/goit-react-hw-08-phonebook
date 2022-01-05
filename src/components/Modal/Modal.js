import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        props.onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  const hendleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };
  return (
    <div className={styles.backdrop} onClick={hendleBackdropClick}>
      {props.children}
    </div>
  );
}
