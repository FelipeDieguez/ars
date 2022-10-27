import styles from './LineEdit.module.css'

function LineEdit ({type, text, width, id}) {
    return (
        <div> 
            <label className={styles.lineEdit}>
                {text}
                <input type={type} id={id} className={styles.lineEditInput} style={{width: width}}/>
            </label>
        </div> 
    )
}

export default LineEdit