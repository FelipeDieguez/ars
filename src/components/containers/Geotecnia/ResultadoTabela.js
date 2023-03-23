import Table from '../../form/Table'

function ResultadoTabela({ metodoGeotecnia, esforcoGeotecnia, dadosGeotecnia, mudarCamadaDados }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        mudarCamadaDados("ordem", ordem)
    }

    return (
        <>
            <Table dados={dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia]}
                    onChange={mudancasResultadoTabela}
            />
        </>
    )
}

export default ResultadoTabela