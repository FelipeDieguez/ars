import styles from './Select.module.css'

function Select ({text, name, list, width, onChange}) {
    return (
        <>
            <label htmlFor={name} className={styles.label}>{text}</label>
            <select name={name} className={styles.select} style={{width: width}} onChange={onChange}>
                {list.map((element) => (
                    <option key={element} className={styles.option}>{element}</option>
                ))}
            </select> 
        </>
    )
}

export default Select