import Button from '../../form/Button'

import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

function CalculoAcoes({ entradasGeotecnia, dadosGeotecnia, setAtualizarGeotecnia }) {
    function mudancasCalculoAcoes() {
        calcular([entradasGeotecnia, dadosGeotecnia])
        setAtualizarGeotecnia(1)
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