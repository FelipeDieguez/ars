import Table from '../../form/Table'

function ResultadoTabela({ dadosGeotecnia, mudarCamadaDados }) {
    function mudancasResultadoTabela(ev) {
        const ordem = ev.target.id
        mudarCamadaDados("ordem", ordem)
    }

    return (
        <>
            <Table dados={dadosGeotecnia}
                    onChange={mudancasResultadoTabela}
            />
        </>
    )
}

export default ResultadoTabela