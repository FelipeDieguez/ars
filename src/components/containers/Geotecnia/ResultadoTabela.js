import Table from '../../form/Table'
import geotecniaCabecalhos from "../../data/geotecniaCabecalhos.json"

function ResultadoTabela({ metodoGeotecnia, esforcoGeotecnia, entradasEstrutura, dadosGeotecnia, mudarCamadaDados }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        mudarCamadaDados("ordem", +ordem.replace("input-", ""))
    }

    return (
        <>
            <Table dados={dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia]}
                    cabecalho={geotecniaCabecalhos["cabecalhos"]}
                    entradasEstrutura={entradasEstrutura}
            />
        </>
    )
}

export default ResultadoTabela