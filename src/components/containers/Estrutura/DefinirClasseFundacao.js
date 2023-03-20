import Tab from '../../form/Tab'

import fundacaoTipos from "../../data/fundacaoTipos.json"
import geotecniaMetodos from "../../data/geotecniaMetodos.json"

function DefinirClasseFundacao({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, mudarEntradasGeotecnia }) {
    function mudarClasseFundacao(ev) {
        const tipo_fundacao = ev.target.id
        setClasseFundacao(tipo_fundacao)
        setMetodoGeotecnia(geotecniaMetodos[tipo_fundacao])
        setEsforcoGeotecnia("compressao")
        mudarEntradasGeotecnia("tipo", fundacaoTipos[tipo_fundacao][0])
    }

    return (
        <>
            <Tab 
                text="ESTACAS"
                id="estacas"
                name="fundacoes"
                checked={classeFundacao === "estacas"}
                onChange={mudarClasseFundacao}
            />
            <Tab 
                text="SAPATAS"
                id="sapatas"
                name="fundacoes"
                checked={classeFundacao === "sapatas"}
                onChange={mudarClasseFundacao}
            />
            <Tab 
                text="TUBULÃO"
                id="tubuloes"
                name="fundacoes"
                checked={classeFundacao === "tubuloes"}
                onChange={mudarClasseFundacao}
            />
        </>
    )
}

export default DefinirClasseFundacao