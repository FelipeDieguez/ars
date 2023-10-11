import Select from '../../components/Select'

function CalculoEntradas2({ foundationClass, geotechnicsMethod, geotechnicsStress, updateGeotechnicsInputs, geotechnicsData }) {      
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }
    
    if (foundationClass === "sapatas") {
        return (
            <>
                <Select
                    text="Prof.+"
                    name="dimensao_3"
                    list={[0.0, 0.1 , 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
                <Select
                        text="N.A.(m)="
                        name="dimensao_4"
                        list={[...Array(geotechnicsData[geotechnicsStress][geotechnicsMethod].length+2).keys()]}
                        width="50px"
                        onChange={onGeotechnicsInputsChange}
                />
            </>
        )
    }
    else {
        return (
            <>
                <Select
                    text="C.A.(m)="
                    name="dimensao_3"
                    list={[...Array(geotechnicsData[geotechnicsStress][geotechnicsMethod].length).keys()]}
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
            </>
        )
    }
}

export default CalculoEntradas2