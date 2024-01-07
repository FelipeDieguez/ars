import { Button, IconButton, Select, Tooltip } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import foundationTypes from "../../utils/data/foundationTypes.json"
import geotechnicsMethods from "../../utils/data/geotechnicsMethods.json"
import styles from '../Structure.module.css'

function FoundationsManager({ foundationClass, setFoundationClass, updateGeotechnicsInputs }) {
    function onFoundationClassChange(ev) {
        const foundation_type = ev.target.id
        setFoundationClass(foundation_type)
        updateGeotechnicsInputs("metodo", geotechnicsMethods[foundation_type])
        updateGeotechnicsInputs("tipo", foundationTypes[foundation_type][0])
        updateGeotechnicsInputs("esforco", "compressao")
    }

    return (
        <>
            <div className={styles.containerRow}>
                <div className={styles.step}>
                    <Tooltip hasArrow label='Criar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<AddIcon />}
                            size='sm'
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            // onClick={}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label='Editar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<EditIcon />}
                            size='sm'
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            // onClick={}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label='Remover' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<DeleteIcon />}
                            size='sm'
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            // onClick={}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={styles.section} style={{ height: '90%' }}></div>
        </>
    )
}

export default FoundationsManager