import styles from './Label.module.css'

function Label ({text}) {
    return (
        <div>
            <label className={styles.label}>
                {text}
            </label>
        </div>
    )
}

export default Label