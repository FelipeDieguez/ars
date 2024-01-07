import { Button, Select, IconButton, Tooltip } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from '../Structure.module.css'

function ColumnsManager({  }) {

    return (
        <>
            <div className={styles.containerRow}>
                <div className={styles.step}>
                    <div className={styles.secondTitle}>
                        PILARES:
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
                        <option>P01</option>
                    </Select>
                </div>
                <div className={styles.step}>
                    <Button
                        name="manage"
                        width="100px"
                        // onClick={}
                        colorScheme='blue'
                        size='sm'
                        fontSize='md'
                    >
                        Gerenciar
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ColumnsManager