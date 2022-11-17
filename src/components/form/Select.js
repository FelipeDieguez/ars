import styles from "./Select.module.css";

function Select({ text, name, list, width, onChange }) {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {text}
      </label>
      <select
        name={name}
        style={{ width: width }}
        onChange={onChange}
        className={styles.select}
      >
        {list.map((element) => (
          <option key={element} className={styles.option}>
            {element}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
