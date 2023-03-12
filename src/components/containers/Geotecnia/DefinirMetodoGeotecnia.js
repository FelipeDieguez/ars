import Label from '../../form/Label'
import Radio from '../../form/Radio'
import Select from '../../form/Select'

import styles from '../Geotecnia.module.css'

function DefinirMetodoGeotecnia({ classeFundacao, mudarEntradasSondagem, metodoGeotecnia, setMetodoGeotecnia, setResultados }) {
    function mudarMetodoGeotecnia(ev) {
        const metodo = ev.target.id
        setMetodoGeotecnia(metodo)
        setResultados([])
        mudarEntradasSondagem("metodo", metodo)
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
                        onChange={mudarMetodoGeotecnia}
                    />
                </div>
                <div>
                    <Select
                        text="N.A.(m)="
                        name="na"
                        list={[0, 1 , 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        width="50px"
                        //onChange={mudarEntradasGeotecnia}
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
                        onChange={mudarMetodoGeotecnia}
                    />
                </div>
                <div className={styles.step}>
                    <Radio
                        text="Decourt-Quaresma"
                        id="decourt-quaresma"
                        name="metodo"
                        checked={metodoGeotecnia === "decourt-quaresma"}
                        onChange={mudarMetodoGeotecnia}
                    />
                </div>
            </>
        )
    }
}

export default DefinirMetodoGeotecnia