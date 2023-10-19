import { useContext } from 'react'
import styles from './Table.module.css'
import { LayerContext } from '../containers/Geotechnics'

function Table ({ dados, cabecalho, structureInputs }) {
    const {
        layerInputs,
        updateLayerInputs,
    } = useContext(LayerContext);
    const mudar_camada = (ordem) => {
        updateLayerInputs("ordem", ordem)
    };
    return (      
        <table className={styles.table}> 
            <thead className={styles.thead}>
                <tr className={styles.trHead}>
                    {
                        cabecalho.map((h, i) => {
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
                            `${styles.trBody} ${layerInputs.ordem === i+1 ? styles.check : ''} ${parseInt(structureInputs.profundidade) === i+1 ? styles.prof : ''}`
                        }
                        key={"row-"+i}
                    >
                        {cabecalho.map((h, _i) => {
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