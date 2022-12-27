import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

import Button from '../../form/Button'

function CalcularAction({ setUpdateTable, setCalculo, sondagemInput }) {
    function calculo(ev) {
        ev.preventDefault()
        calcular(sondagemInput)
        setUpdateTable(1)
        setCalculo(1)
    }

    return (
        <>
            <Button
                text="Calcular"
                name="calcular"
                width="80px"
                onClick={calculo}
            />
        </>
    )
}

export default CalcularAction