import Label from '../../components/Label'
import Radio from '../../components/Radio'

import styles from '../Geotechnics.module.css'

function MetodoDefinir({ foundationClass, geotechnicsMethod, setGeotechnicsMethod }) {
    function onGeotechnicsMethodChange(ev) {
        const method = ev.target.id
        setGeotechnicsMethod(method)
    }

    if (foundationClass === "sapatas") {
        return (
            <>
                <div className={styles.step}>
                    <Label text="MÉTODOS:" />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Bulbo de Tensões"
                        id="metodo-1"
                        name="metodo"
                        checked={geotechnicsMethod === "metodo-1"}
                        onChange={onGeotechnicsMethodChange}
                    />
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={styles.step}>
                    <Label text="MÉTODOS:" />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Aoki-Velloso"
                        id="metodo-1"
                        name="metodo"
                        checked={geotechnicsMethod === "metodo-1"}
                        onChange={onGeotechnicsMethodChange}
                    />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Decourt-Quaresma"
                        id="metodo-2"
                        name="metodo"
                        checked={geotechnicsMethod === "metodo-2"}
                        onChange={onGeotechnicsMethodChange}
                    />
                </div>
            </>
        )
    }
}

export default MetodoDefinir