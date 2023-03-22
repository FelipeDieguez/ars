import Button from '../../form/Button'

import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

function CalculoAcoes({ entradasGeotecnia, dadosGeotecnia, setDadosGeotecnia }) {
    function mudancasCalculoAcoes() {
        calcular([entradasGeotecnia, dadosGeotecnia]).then((response) => {
            setDadosGeotecnia(response["data"])
        })
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