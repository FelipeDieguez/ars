import styles from './Table.module.css'

function Table ({ dados, onChange }) {
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    {Object.entries(dados).map(([chave, valor], i) => (
                        <th className={styles.th} key={i}>{chave}</th>
                        )
                    )}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {dados["#"].map((camada, i) => (
                    <>
                        <input type="radio" name="tabela" id={camada} onChange={onChange}></input>
                        <tr className={styles.trBody}>
                            {Object.entries(dados).map(([chave, valor]) => {
                                return (
                                    <td className={styles.td}>
                                        <label htmlFor={camada}>
                                            {valor[i]}
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