import { useState } from 'react'
import styles from './Table.module.css'

function Table ({ dados, onChange }) {

    const header_default = [
        "#",
        "Solo",
        "Nspt",
        "Lateral",
        "Ponta",
        "C. Rup. (kN)",
        "C. Adm. (kN)",
        "γsolo",
        "Sobrecarga",
        "T. Rup. (kPa)",
        "T. Adm. (kPa)",
    ]
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    {
                        header_default.map((h, i) => {
                            return dados[0][h] !== undefined &&
                            (<th className={styles.th} key={'th'+i}>
                                {h}
                            </th>)
                        })
                    }
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {dados.map((camada, i) => (
                    <>
                        <input type="radio" name="tabela" id={"input-"+(i+1)} onChange={onChange}></input>
                        <tr className={styles.trBody}>
                            {header_default.map((h, _i) => {
                            return camada[h] !== undefined &&
                                (<td key={"col-"+_i} className={styles.td}>
                                    <label htmlFor={"input-"+(i+1)}>
                                        {camada[h]}
                                    </label>
                                </td>)
                            })}
                        </tr>
                    </>
                ))}
            </tbody>
        </table> 
    )
}

export default Table