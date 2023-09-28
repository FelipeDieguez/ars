import styles from './LineEdit.module.css'

function LineEdit ({text, type, name, width, onChange}) {
    return (
        <div> 
            <label htmlFor={name} className={styles.lineEdit}>{text}</label>
            <input
                type={type}
                name={name}
                style={{width: width}}
                onChange={onChange}
                className={styles.lineEditInput}
            />
        </div>
    )
}

export default LineEdit