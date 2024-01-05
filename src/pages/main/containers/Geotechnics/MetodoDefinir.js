import Label from '../../components/Label'
import { Radio, RadioGroup, Select, Stack } from '@chakra-ui/react'

import styles from '../Geotechnics.module.css'

function MetodoDefinir({ foundationClass, geotechnicsInputs, updateGeotechnicsInputs, parameters }) {

    return (
        <>
            <div className={styles.step}>
                <Label text="MÉTODOS:" />
            </div>
            <Select
                onChange={(ev) => updateGeotechnicsInputs('metodo', ev.target.value)}
                variant='outline'
                w='300px'
                value={geotechnicsInputs['metodo']}
            >
                {Object.keys(foundationClass === 'tubuloes' ? parameters['estacas'] : parameters[foundationClass]).map((method) => (
                    <option key={method}>{method}</option>
                ))}
            </Select>
        </>
    )
}

export default MetodoDefinir