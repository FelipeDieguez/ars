import Select from '../../components/Select'

import foundationTypes from "../../utils/data/foundationTypes.json"

function CalculoDefinir({ foundationClass, updateGeotechnicsInputs }) {
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }

    return (
        <>
            <Select
                text="Tipo:"
                name="tipo"
                list={foundationTypes[foundationClass]}
                width="150px"
                onChange={onGeotechnicsInputsChange}
            />
        </>
    )
}

export default CalculoDefinir