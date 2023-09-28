import Tab from '../../../form/Tab'

import fundacaoTipos from "../../../data/fundacaoTipos.json"
import geotecniaMetodos from "../../../data/geotecniaMetodos.json"

function FundacaoDefinir({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, mudarEntradasGeotecnia }) {
    function mudancasFundacaoDefinir(ev) {
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