import styles from './Button.module.css'

function Button ({text, width, id, onClick}) {
    return (
        <>
            <button id={id} className={styles.btn} style={{width: width}} onClick={onClick}>
                {text}
            </button>
        </>
    )
}

export default Button