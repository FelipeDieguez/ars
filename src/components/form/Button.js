import styles from './Button.module.css'

function Button ({text, width, id}) {
    return (
        <div>
            <button id={id} className={styles.btn} style={{width: width}}>
                {text}
            </button>
        </div>
    )
}

export default Button