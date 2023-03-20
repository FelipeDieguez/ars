import Select from '../../form/Select'

import fundacaoTipos from "../../data/fundacaoTipos.json"

function CalculoDefinir({ classeFundacao, mudarEntradasGeotecnia }) {
    function mudancasCalculoDefinir(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }

    return (
        <>
            <Select
                text="Tipo:"
                name="tipo"
                list={fundacaoTipos[classeFundacao]}
                width="150px"
                onChange={mudancasCalculoDefinir}
            />
        </>
    )
}

export default CalculoDefinir