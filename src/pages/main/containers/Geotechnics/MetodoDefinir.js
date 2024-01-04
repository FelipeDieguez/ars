import Label from '../../components/Label'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

import styles from '../Geotechnics.module.css'

function MetodoDefinir({ foundationClass, geotechnicsMethod, setGeotechnicsMethod }) {
    
    if (foundationClass === "sapatas") {
        return (
            <>
                <div className={styles.step}>
                    <Label text="MÉTODOS:" />
                </div>
                <div className={styles.step}>
                    <RadioGroup
                        onChange={setGeotechnicsMethod}
                        value={geotechnicsMethod}
                    >
                        <Radio
                            value='metodo-1'
                            color='black'
                            colorScheme='blue'
                            fontSize='md'
                        >
                            Bulbo de Tensões
                        </Radio>
                    </RadioGroup>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={styles.step}>
                    <Label text="MÉTODOS:" />
                </div>
                <RadioGroup
                    onChange={setGeotechnicsMethod}
                    value={geotechnicsMethod}
                >
                    <Stack direction='column'>
                        <Radio
                            value='metodo-1'
                            color='black'
                            colorScheme='blue'
                            fontSize='md'
                        >
                            Aoki-Velloso
                        </Radio>
                        <Radio
                            value='metodo-2'
                            color='black'
                            colorScheme='blue'
                            fontSize='md'
                        >
                            Decourt-Quaresma
                        </Radio>
                    </Stack>
                </RadioGroup>
            </>
        )
    }
}

export default MetodoDefinir