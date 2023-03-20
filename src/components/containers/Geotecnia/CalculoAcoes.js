import Button from '../../form/Button'

import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

function CalculoAcoes({ setAtualizarGeotecnia }) {
    function mudancasCalculoAcoes() {
        setAtualizarGeotecnia(1)
        //setResultados(calcular(entradasGeotecnia))
    }

    return (
        <>
            <Button
                text="Calcular"
                name="calcular"
                width="80px"
                onClick={mudancasCalculoAcoes}
            />
        </>
    )
}

export default CalculoAcoes