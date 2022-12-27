import Tab from '../../form/Tab'

import fundacaoTipos from "../../data/fundacaoTipos.json"
import fundacaoGeometrias from "../../data/fundacaoGeometrias.json"

function FundacaoTypeSet({ fundacao, setFundacao, setTipos, changeSondagemInput, changeFundacaoGeometry }) {
    function changeFundacaoType(ev) {
        //pegar tipo fundacao do fundacao
        const tipo_fundacao = ev.target.id
        setFundacao(tipo_fundacao)
        for (const [key, value] of Object.entries(fundacaoTipos)) {
            if (tipo_fundacao === key) {
                setTipos(value)
                break
            }
        }
    }

    return (
        <>
            <Tab 
                text="ESTACAS"
                id="estacas"
                name="fundacoes"
                checked={fundacao === "estacas"}
                onChange={(ev) => {const name = ev.target.id
                                    changeFundacaoType(ev)
                                    changeSondagemInput("tipo", fundacaoTipos[name][0])
                                    changeFundacaoGeometry()
                                }}
            />
            <Tab 
                text="SAPATAS"
                id="sapatas"
                name="fundacoes"
                checked={fundacao === "sapatas"}
                onChange={(ev) => {const name = ev.target.id
                                    changeFundacaoType(ev)
                                    changeSondagemInput("tipo", fundacaoTipos[name][0])
                                    changeFundacaoGeometry()
                                }}
            />
            <Tab 
                text="TUBULÃO"
                id="tubuloes"
                name="fundacoes"
                checked={fundacao === "tubuloes"}
                onChange={(ev) => {const name = ev.target.id
                                    changeFundacaoType(ev)
                                    changeSondagemInput("tipo", fundacaoTipos[name][0])
                                    changeFundacaoGeometry()
                                }}
            />
        </>
    )
}

export default FundacaoTypeSet