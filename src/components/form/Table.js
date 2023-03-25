import styles from './Table.module.css'
import { CamadaContext } from '../containers/Geotecnia'

function Table ({ dados, onChange }) {
    const { 
        camadaDados, 
        mudarCamadaDados,
        setCamadaDados,
        setClasseSolo,
    } = useContext(CamadaContext);
    const mudar_camada = (ev) => {
        setCamadaDados((_camadaDados) => {
            _camadaDados.ordem = +ev.target.id.replace("input-", "");
            return _camadaDados;
        });
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
                    <tr className={styles.trBody} key={"row-"+i}>
                        {header_default.map((h, _i) => {
                        return camada[h] !== undefined &&
                            (<td
                                key={"col-"+_i}
                                className={`${styles.td} ${camadaDados.ordem === i+1 ? 'check' : ''}`}
                                onClick={mudar_camada}
                            >
                                <label htmlFor={"input-"+(i+1)}>
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