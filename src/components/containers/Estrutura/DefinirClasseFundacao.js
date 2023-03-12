import Tab from '../../form/Tab'

import fundacaoTipos from "../../data/fundacaoTipos.json"

function DefinirClasseFundacao({ classeFundacao, setClasseFundacao, mudarEntradasGeotecnia }) {
    function mudarClasseFundacao(ev) {
        const tipo_fundacao = ev.target.id
        setClasseFundacao(tipo_fundacao)
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