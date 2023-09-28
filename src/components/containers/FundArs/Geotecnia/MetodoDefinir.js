import Label from '../../../form/Label'
import Radio from '../../../form/Radio'

import styles from '../Geotecnia.module.css'

function MetodoDefinir({ classeFundacao, metodoGeotecnia, setMetodoGeotecnia }) {
    function mudancasMetodoDefinir(ev) {
        const metodo = ev.target.id
        setMetodoGeotecnia(metodo)
    }

    if (classeFundacao === "sapatas") {
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
                        checked={metodoGeotecnia === "metodo-1"}
                        onChange={mudancasMetodoDefinir}
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
                        checked={metodoGeotecnia === "metodo-1"}
                        onChange={mudancasMetodoDefinir}
                    />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Decourt-Quaresma"
                        id="metodo-2"
                        name="metodo"
                        checked={metodoGeotecnia === "metodo-2"}
                        onChange={mudancasMetodoDefinir}
                    />
                </div>
            </>
        )
    }
}

export default MetodoDefinir