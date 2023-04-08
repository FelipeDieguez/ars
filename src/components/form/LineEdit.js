import styles from './LineEdit.module.css'

function LineEdit ({text, type, name, width, onChange}) {
    return (
        <div> 
            <label htmlFor={name} className={styles.lineEdit}>{text}</label>
            <input
                min="0"
                step="1"
                maxLength="2"
                onKeyPress={(event) => {
                    if (type === "number") {
                        if (!/[\.0-9]/.test(event.key)) {
                            event.preventDefault()}
                    }
                    else {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()} 
                    }}}
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