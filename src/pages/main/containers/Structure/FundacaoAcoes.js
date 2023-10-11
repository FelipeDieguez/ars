import Button from '../../components/Button'
import Select from '../../components/Select'

import { memorial } from '../../utils/services/investigation'

function FundacaoAcoes({ geotechnicsData, geotechnicsInputs, structureInputs, updateStructureInputs }) {
    function onGenerateMemorial() {
        memorial([geotechnicsData, geotechnicsInputs, structureInputs]).then((response) => {
            window.open(response["data"])
        })
    }
    return (
        <>
            <Select
                text="Profundidade (m)="
                name="profundidade"
                list={[...Array(geotechnicsData["compressao"]["metodo-1"].length+1).keys()]}
                width="45px"
                onChange={updateStructureInputs}
                />
            <Button
                text="Gerar Memorial"
                name="memorial"
                width="150px"
                onClick={onGenerateMemorial}
            />
        </>
    )
}

export default FundacaoAcoes