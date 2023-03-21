import styles from './Table.module.css'

function Table ({ dados, onChange }) {
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    {Object.entries(dados[0]).map(([chave, valor], i) => (
                        <th className={styles.th} key={i}>{chave}</th>
                        )
                    )}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {dados.map((camada, i) => (
                    <>
                        <input type="radio" name="tabela" id={i+1} onChange={onChange}></input>
                        <tr className={styles.trBody}>
                            {Object.entries(camada).map(([chave, valor]) => {
                                return (
                                    <td className={styles.td}>
                                        <label htmlFor={i+1}>
                                            {valor}
                                        </label>
                                    </td>
                                )
                            })}
                        </tr>
                    </>
                ))}
            </tbody>
        </table> 
    )
}

export default Table