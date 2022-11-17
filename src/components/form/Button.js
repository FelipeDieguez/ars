import styles from "./Button.module.css";

function Button({ text, name, width, onClick }) {
  return (
    <>
      <button
        name={name}
        style={{ width: width }}
        onClick={onClick}
        className={styles.btn}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
