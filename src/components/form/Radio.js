import styles from './Radio.module.css'

function Radio ({text, name, onChange, id, checked}) {
    return (      
        <div> 
            <label htmlFor={id} className={styles.radio}>
                <input type="radio" name={name} id={id} className={styles.radioInput} onChange={onChange} checked={checked}/>
                <div className={styles.radioRadio}></div>
                {text}
            </label>
        </div> 
    )
}

export default Radio