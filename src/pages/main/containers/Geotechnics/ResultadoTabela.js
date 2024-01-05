import Table from '../../components/Table'
import geotechnicsHeaders from "../../utils/data/geotechnicsHeaders.json"

function ResultadoTabela({ geotechnicsData, structureInputs, updateLayerInputs }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        updateLayerInputs("ordem", +ordem.replace("input-", ""))
    }

    return (
        <>
            <Table dados={geotechnicsData}
                    cabecalho={geotechnicsHeaders["cabecalhos"]}
                    structureInputs={structureInputs}
            />
        </>
    )
}

export default ResultadoTabela