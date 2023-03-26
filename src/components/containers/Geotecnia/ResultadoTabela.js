import Table from '../../form/Table'
import geotecniaCabecalhos from "../../data/geotecniaCabecalhos.json"

function ResultadoTabela({ metodoGeotecnia, esforcoGeotecnia, dadosGeotecnia, mudarCamadaDados }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        mudarCamadaDados("ordem", +ordem.replace("input-", ""))
    }

    return (
        <>
            <Table dados={dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia]}
                    cabecalho={geotecniaCabecalhos["cabecalhos"]}
                    onChange={mudancasResultadoTabela}
            />
        </>
    )
}

export default ResultadoTabela