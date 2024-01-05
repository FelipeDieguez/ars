import Tab from '../../components/Tab'

import foundationTypes from "../../utils/data/foundationTypes.json"
import geotechnicsMethods from "../../utils/data/geotechnicsMethods.json"

function FundacaoDefinir({ foundationClass, setFoundationClass, updateGeotechnicsInputs }) {
    function onFoundationClassChange(ev) {
        const foundation_type = ev.target.id
        setFoundationClass(foundation_type)
        updateGeotechnicsInputs("metodo", geotechnicsMethods[foundation_type])
        updateGeotechnicsInputs("tipo", foundationTypes[foundation_type][0])
        updateGeotechnicsInputs("esforco", "compressao")
    }

    return (
        <>
            <Tab
                text="ESTACAS"
                id="estacas"
                name="fundacoes"
                checked={foundationClass === "estacas"}
                onChange={onFoundationClassChange}
            />
            <Tab 
                text="SAPATAS"
                id="sapatas"
                name="fundacoes"
                checked={foundationClass === "sapatas"}
                onChange={onFoundationClassChange}
            />
            <Tab 
                text="TUBULÃO"
                id="tubuloes"
                name="fundacoes"
                checked={foundationClass === "tubuloes"}
                onChange={onFoundationClassChange}
            />
        </>
    )
}

export default FundacaoDefinir