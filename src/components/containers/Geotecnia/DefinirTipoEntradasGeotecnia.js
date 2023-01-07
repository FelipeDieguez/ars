import Select from '../../form/Select'

function DefinirTipoEntradasGeotecnia({ tiposFundacao, mudarEntradasGeotecnia }) {
    function mudarTipoEntradasGeotecnia(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }

    return (
        <>
            <Select
                text="Tipo:"
                name="tipo"
                list={tiposFundacao}
                width="150px"
                onChange={mudarTipoEntradasGeotecnia}
            />
        </>
    )
}

export default DefinirTipoEntradasGeotecnia