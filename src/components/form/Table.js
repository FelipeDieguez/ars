import styles from './Table.module.css'

function Table ({ data }) {
    let keys = Object.keys(data[0])
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    {["#", ...keys].map((item, index) => (
                        <th className={styles.th} key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {data.map((obj, index) => (
                    <tr className={styles.trBody} key={index}>
                        <td className={styles.td}>{index + 1}</td>
                        {keys.map((item, index) => {
                            let value = obj[item]
                            return (
                                <td className={styles.td} key={index}>
                                    {value}
                                </td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table> 
    )
}

export default Table