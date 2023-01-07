import Table from '../../form/Table'

function DefinirCamadaSondagem({ sondagemGeotecnia, setCamadaSondagem, resultados }) {
    function mudarCamadaSondagem(ev) {
        const camada = ev.target.id
        setCamadaSondagem(camada)
    }

    return (
        <>
            <Table sondagem={sondagemGeotecnia}
                    resultados={resultados}
                    onChange={mudarCamadaSondagem}
            />
        </>
    )
}

export default DefinirCamadaSondagem