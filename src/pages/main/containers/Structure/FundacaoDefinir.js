import Tab from '../../components/Tab'

import foundationTypes from "../../utils/data/foundationTypes.json"
import geotechnicsMethods from "../../utils/data/geotechnicsMethods.json"

function FundacaoDefinir({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, mudarEntradasGeotecnia }) {
    function mudancasFundacaoDefinir(ev) {
        const tipo_fundacao = ev.target.id
        setClasseFundacao(tipo_fundacao)
        setMetodoGeotecnia(geotechnicsMethods[tipo_fundacao])
        setEsforcoGeotecnia("compressao")
        mudarEntradasGeotecnia("tipo", foundationTypes[tipo_fundacao][0])
    }

    return (
        <>
            <Tab 
                text="ESTACAS"
                id="estacas"
                name="fundacoes"
                checked={classeFundacao === "estacas"}
                onChange={mudancasFundacaoDefinir}
            />
            <Tab 
                text="SAPATAS"
                id="sapatas"
                name="fundacoes"
                checked={classeFundacao === "sapatas"}
                onChange={mudancasFundacaoDefinir}
            />
            <Tab 
                text="TUBULÃO"
                id="tubuloes"
                name="fundacoes"
                checked={classeFundacao === "tubuloes"}
                onChange={mudancasFundacaoDefinir}
            />
        </>
    )
}

export default FundacaoDefinir