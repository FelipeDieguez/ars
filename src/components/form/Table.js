import { useContext } from 'react'
import styles from './Table.module.css'
import { CamadaContext } from '../containers/Geotecnia'

function Table ({ dados, onChange }) {
    const { 
        camadaDados, 
        mudarCamadaDados,
        setCamadaDados,
        setClasseSolo,
    } = useContext(CamadaContext);
    const mudar_camada = (ordem) => {
        setCamadaDados({ ...camadaDados, "ordem": ordem })
    };

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
                    <tr
                        className={
                            `${styles.trBody} ${camadaDados.ordem === i+1 ? styles.check : ''}`
                        }
                        key={"row-"+i}
                    >
                        {header_default.map((h, _i) => {
                        return camada[h] !== undefined &&
                            (<td
                                key={"col-"+_i}
                                className={styles.td}
                                onClick={() => mudar_camada(i+1)}
                            >
                                <label>
                                    {camada[h]}
                                </label>
                            </td>)
                        })}
                    </tr>
                ))}
            </tbody>
        </table> 
    )
}

export default Table