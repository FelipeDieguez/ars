import styles from './Table.module.css'

function Table ({ sondagem, resultados, onChange }) {
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    <th className={styles.th} key={0}>#</th>
                    <th className={styles.th} key={1}>Solo</th>
                    <th className={styles.th} key={2}>Nspt</th>
                    <th className={styles.th} key={3}>Lateral</th>
                    <th className={styles.th} key={4}>Ponta</th>
                    <th className={styles.th} key={5}>C. Rup. (kN)</th>
                    <th className={styles.th} key={6}>c. Adm. (kN)</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {sondagem.map((camada, i) => (
                    <>
                        <input type="radio" name="tabela" id={camada[0]} onChange={onChange}></input>
                        <tr className={styles.trBody}>
                            {/*<td className={styles.td}>{index + 1}</td> e antes de ...keys, colocar "#",*/}
                            {camada.map((item) => {
                                return (
                                    <td className={styles.td}>
                                        <label htmlFor={camada[0]}>
                                            {item}
                                        </label>
                                    </td>
                                )
                            })}
                            {(() => {
                                if (resultados.length === 0) {
                                    return
                                } else {
                                    return (
                                        <td className={styles.td}>
                                            <label htmlFor={camada[0]}>
                                                {resultados[i]["lateral"]}
                                            </label>
                                        </td>
                                    )
                                }
                            })()}
                        </tr>
                    </>
                ))}
            </tbody>
        </table> 
    )
}

export default Table