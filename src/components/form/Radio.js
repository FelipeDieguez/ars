import styles from './Radio.module.css'

function Radio ({text, id, name, onChange }) {
    return (      
        <> 
            <label htmlFor={id} className={styles.radio}>
                <input type="radio" id={id} name={name} onChange={onChange} className={styles.radioInput} />
                <div className={styles.radioRadio}></div>
                {text}
            </label>
        </> 
    )
}

export default Radio