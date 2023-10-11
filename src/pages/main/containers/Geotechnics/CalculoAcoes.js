import Button from '../../components/Button'

import { calculate } from '../../utils/services/investigation'

function CalculoAcoes({ entradasGeotecnia, dadosGeotecnia, setDadosGeotecnia }) {
    function mudancasCalculoAcoes() {
        calculate([dadosGeotecnia, entradasGeotecnia]).then((response) => {
            setDadosGeotecnia(response["data"])
        })
    }
    return (
        <>
            <Button
                text="Calcular"
                name="calculate"
                width="80px"
                onClick={mudancasCalculoAcoes}
            />
        </>
    )
}

export default CalculoAcoes