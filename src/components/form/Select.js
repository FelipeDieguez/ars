import styles from './Select.module.css'

function Select ({text, list, width, id}) {
    return (
        <div>
            <label className={styles.label}></label>
                {text}
                <select id={id} className={styles.select} style={{width: width}}>
                    {list.map((element) => (
                        <option key={element} className={styles.option}>{element}</option>
                    ))}
                </select> 
        </div>
    )
}

export default Select