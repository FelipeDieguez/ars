import styles from './LineEdit.module.css'

function LineEdit ({text, type, name, width, onChange}) {
    return (
        <> 
            <label htmlFor={name} className={styles.lineEdit}>{text}</label>
            <input type={type} name={name} className={styles.lineEditInput} style={{width: width}} onChange={onChange}/>
        </> 
    )
}

export default LineEdit