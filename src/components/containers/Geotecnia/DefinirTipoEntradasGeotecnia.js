import Select from '../../form/Select'

import fundacaoTipos from "../../data/fundacaoTipos.json"

function DefinirTipoEntradasGeotecnia({ classeFundacao, mudarEntradasGeotecnia }) {
    function mudarTipoEntradasGeotecnia(ev) {
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
                onChange={mudarTipoEntradasGeotecnia}
            />
        </>
    )
}

export default DefinirTipoEntradasGeotecnia