import Select from '../../components/Select'

import foundationTypes from "../../utils/data/foundationTypes.json"

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
                list={foundationTypes[classeFundacao]}
                width="150px"
                onChange={mudancasCalculoDefinir}
            />
        </>
    )
}

export default CalculoDefinir