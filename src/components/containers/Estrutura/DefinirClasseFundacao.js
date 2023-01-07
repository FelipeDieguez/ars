import Tab from '../../form/Tab'

import fundacaoTipos from "../../data/fundacaoTipos.json"

function DefinirClasseFundacao({ classeFundacao, setClasseFundacao, setTiposFundacao, mudarEntradasGeotecnia }) {
    function mudarClasseFundacao(ev) {
        const tipo_fundacao = ev.target.id
        setClasseFundacao(tipo_fundacao)
        for (const [key, value] of Object.entries(fundacaoTipos)) {
            if (tipo_fundacao === key) {
                setTiposFundacao(value)
                break
            }
        }
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