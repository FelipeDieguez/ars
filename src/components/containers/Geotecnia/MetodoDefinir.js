import Label from '../../form/Label'
import Radio from '../../form/Radio'

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
                        id="bulbo tensoes"
                        name="metodo"
                        checked={metodoGeotecnia === "bulbo tensoes"}
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
                        id="aoki-velloso"
                        name="metodo"
                        checked={metodoGeotecnia === "aoki-velloso"}
                        onChange={mudancasMetodoDefinir}
                    />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Decourt-Quaresma"
                        id="decourt-quaresma"
                        name="metodo"
                        checked={metodoGeotecnia === "decourt-quaresma"}
                        onChange={mudancasMetodoDefinir}
                    />
                </div>
            </>
        )
    }
}

export default MetodoDefinir