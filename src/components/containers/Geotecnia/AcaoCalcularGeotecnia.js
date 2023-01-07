import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

import Button from '../../form/Button'
import Select from '../../form/Select'

function AcaoCalcularGeotecnia({ geometriaFundacao, entradasGeotecnia, mudarEntradasGeotecnia, setAtualizarSondagem, setResultados }) {
    function calcularGeotecnia() {
        setAtualizarSondagem(1)
        //setResultados(calcular(entradasGeotecnia))
    }

    if (geometriaFundacao === "sapata retangular" || geometriaFundacao === "sapata circular") {
        return (
            <>
                <Select
                    text="Z(m)="
                    name="Z"
                    list={[0.0, 0.1 , 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
                    width="45px"
                    onChange={mudarEntradasGeotecnia}
                />
                <Button
                    text="Calcular"
                    name="calcular"
                    width="80px"
                    onClick={calcularGeotecnia}
                />
            </>
        )
    }
    else {
        return (
            <>
                <Button
                    text="Calcular"
                    name="calcular"
                    width="80px"
                    onClick={calcularGeotecnia}
                />
            </>
        )
    }
}

export default AcaoCalcularGeotecnia