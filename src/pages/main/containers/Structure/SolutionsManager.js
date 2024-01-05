import { Button, IconButton, Select, Tooltip } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from '../Structure.module.css'

function SolutionsManager({  }) {

    return (
        <>
            <div className={styles.stepsRow}>
                <div className={styles.step}>
                    <div className={styles.secondTitle}>
                        SOLUÇÃO:
                    </div>
                    <Select
                        name='column'
                        // onChange={}
                        variant='outline'
                        w='150px'
                        size='xs'
                        fontSize='md'
                        // value={}
                    >
                        {/* {soilInvestigationList.map((name, i) => (
                            <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                        ))} */}
                        <option>Solução 01</option>
                    </Select>
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
                <div className={styles.step}>
                    <Button
                        name="fill"
                        width="100px"
                        // onClick={}
                        colorScheme='blue'
                        size='sm'
                        fontSize='md'
                    >
                        Preencher
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SolutionsManager