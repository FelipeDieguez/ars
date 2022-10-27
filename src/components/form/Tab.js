import styles from './Tab.module.css'

function Tab ({text, name, onChange, id, checked}) {
    return (      
        <div> 
            <label htmlFor={id} className={styles.tab}>
                <input type="radio" name={name} id={id} className={styles.tabInput} onChange={onChange} checked={checked}/>
                <div className={styles.tabTab}>
                    {text}
                </div>
            </label>
        </div> 
    )
}

export default Tab