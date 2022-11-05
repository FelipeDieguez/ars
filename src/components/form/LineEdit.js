import styles from './LineEdit.module.css'

function LineEdit ({text, type, name, width, onChange}) {
    return (
        <> 
            <label htmlFor={name} className={styles.lineEdit}>{text}</label>
            <input min="0" step="1" type={type} name={name} style={{width: width}} onChange={onChange} className={styles.lineEditInput}/>
        </> 
    )
}

export default LineEdit