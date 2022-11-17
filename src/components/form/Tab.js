import styles from "./Tab.module.css";

function Tab({ text, id, name, checked, onChange }) {
  return (
    <>
      <label htmlFor={id} className={styles.tab}>
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className={styles.tabInput}
        />
        <div className={styles.tabTab}>{text}</div>
      </label>
    </>
  );
}

export default Tab;
