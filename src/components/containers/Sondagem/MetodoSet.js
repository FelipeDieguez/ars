import Label from '../../form/Label'
import Radio from '../../form/Radio'

import styles from '../Sondagem.module.css'

function MetodoSet( {setCalculo, metodo, setMetodo} ) {
    return (
        <>
            <div className={styles.step}>
                <Label text="MÉTODOS:" />
            </div>
            <div className={styles.step}>
                <Radio
                    text="Aoki-Velloso"
                    id="aoki"
                    name="metodo"
                    checked={metodo === "aoki-velloso"}
                    onChange={() => { setMetodo("aoki-velloso") 
                                    setCalculo(0)
                                }}
                />
            </div>
            <div className={styles.step}>
                <Radio
                    text="Decourt-Quaresma"
                    id="decourt"
                    name="metodo"
                    checked={metodo === "decourt-quaresma"}
                    onChange={() => { setMetodo("decourt-quaresma") 
                                    setCalculo(0)
                                }}
                />
            </div>
        </>
    )
}

export default MetodoSet