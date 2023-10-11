import Table from '../../components/Table'
import geotechnicsHeaders from "../../utils/data/geotechnicsHeaders.json"

function ResultadoTabela({ metodoGeotecnia, esforcoGeotecnia, entradasEstrutura, dadosGeotecnia, mudarCamadaDados }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        mudarCamadaDados("ordem", +ordem.replace("input-", ""))
    }

    return (
        <>
            <Table dados={dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia]}
                    cabecalho={geotechnicsHeaders["cabecalhos"]}
                    entradasEstrutura={entradasEstrutura}
            />
        </>
    )
}

export default ResultadoTabela