import styles from './Button.module.css'

function Button ({text, width, id}) {
    return (
        <>
            <button id={id} className={styles.btn} style={{width: width}}>
                {text}
            </button>
        </>
    )
}

export default Button