import Button from '../../components/Button'
import Select from '../../components/Select'

import { memorial } from '../../utils/services/investigation'

function FundacaoAcoes({ dadosGeotecnia, entradasGeotecnia, entradasEstrutura, mudarEntradasEstrutura }) {
    function mudancasFundacaoAcoes() {
        memorial([dadosGeotecnia, entradasGeotecnia, entradasEstrutura]).then((response) => {
            window.open(response["data"])
        })
    }
    return (
        <>
            <Select
                text="Profundidade (m)="
                name="profundidade"
                list={[...Array(dadosGeotecnia["compressao"]["metodo-1"].length+1).keys()]}
                width="45px"
                onChange={mudarEntradasEstrutura}
                />
            <Button
                text="Gerar Memorial"
                name="memorial"
                width="150px"
                onClick={mudancasFundacaoAcoes}
            />
        </>
    )
}

export default FundacaoAcoes