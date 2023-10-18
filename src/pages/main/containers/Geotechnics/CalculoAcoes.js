import Button from '../../components/Button'

import { calculate } from '../../utils/services/geotechnics'

function CalculoAcoes({ geotechnicsInputs, geotechnicsData, setGeotechnicsData }) {
    function onCalculate() {
        calculate([geotechnicsData, geotechnicsInputs]).then((response) => {
            setGeotechnicsData(response["data"])
        })
    }
    return (
        <>
            <Button
                text="Calcular"
                name="calculate"
                width="80px"
                onClick={onCalculate}
            />
        </>
    )
}

export default CalculoAcoes