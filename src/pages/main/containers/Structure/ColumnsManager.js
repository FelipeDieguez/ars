import { Button, Select, IconButton, Tooltip, Input, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Box, Spinner } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import styles from '../Structure.module.css'
import { useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { api } from '../../../../utils/services/api'
import { columnRegister, columnEdit, columnRemove } from '../../utils/services/structure'
import structureHeaders from "../../utils/data/structureHeaders.json"

function ColumnsManager({ projectInputs }) {
    const { isOpen: isOpenColumnManager, onOpen: onOpenColumnManager, onClose: onCloseColumnManager } = useDisclosure()
    const [columnInputs, setColumnInputs] = useState({'selected_name': '', 'Nome': '', 'Nd': 0, 'Mx': 0, 'My': 0})
    const [columnsData, setColumnsData] = useState([])
    const [updateColumns, setUpdateColumns] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [warningMessageF, setWarningMessageF] = useState(false)
    const [warningMessageS, setWarningMessageS] = useState(false)
    const [warningMessageT, setWarningMessageT] = useState(false)

    function onColumnInputChange(ev) {
        const { name, value } = ev.target
        setColumnInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function handleOnCloseColumnManager() {
        setColumnInputs(prevInputs => ({ ...prevInputs, ['selected_name']: '' }))
    }

    function onColumnAction(action) {
        const options = {
            'register': () => {
                if (columnInputs['name_input'] === '') {
                    setWarningMessageF(true)
                }
                else if (columnsData.some(column => column['Nome'] === columnInputs['Nome'])) {
                    setWarningMessageT(true)
                }
                else {
                    columnRegister([projectInputs, columnInputs])
                        .then(() => {
                            setUpdateColumns(prev => prev + 1)
                        })
                }
            },
            'edit': () => {
                if (columnInputs['selected_name'] === '') {
                    setWarningMessageS(true)
                }
                else if (columnInputs['name_input'] === '') {
                    setWarningMessageF(true)
                }
                else if (columnsData.some(column => column['Nome'] === columnInputs['Nome'])) {
                    setWarningMessageT(true)
                }
                else {
                    columnEdit([projectInputs, columnInputs])
                        .then(() => {
                            setUpdateColumns(prev => prev + 1)
                        })
                    setColumnInputs(prevInputs => ({ ...prevInputs, ['selected_name']: '' }))
                }
            },
            'remove': () => {
                if (columnInputs['selected_name'] === '') {
                    setWarningMessageS(true)
                }
                else {
                    columnRemove([projectInputs, columnInputs])
                        .then(() => {
                            setUpdateColumns(prev => prev + 1)
                        })
                    setColumnInputs(prevInputs => ({ ...prevInputs, ['selected_name']: '' }))
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
    }

    useEffect(() => {
        if (projectInputs['selected_name'] !== '') {
            setIsLoading(true)
            api.post('/column', projectInputs)
                    .then((response) => {
                        setColumnsData(response["data"])   
                    })
                    .finally(() => {
                        setIsLoading(false);
                    })
            }
    }, [updateColumns, projectInputs['selected_name']]);

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
                        {columnsData.map((column, i) => (
                            <option key={i} value={column['Nome']}> {column['Nome']} </option>
                        ))}
                    </Select>
                </div>
                <div className={styles.step}>
                    <Button
                        name="manage"
                        width="100px"
                        onClick={() => {onOpenColumnManager()}}
                        colorScheme='blue'
                        size='sm'
                        fontSize='md'
                    >
                        Gerenciar
                    </Button>
                </div>
            </div>
            <Modal isOpen={isOpenColumnManager} onClose={() => {onCloseColumnManager(); handleOnCloseColumnManager()}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize='md'>LISTA DE PILARES</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className={styles.containerColumn}>
                            <div className={styles.stepRow}>
                                <div className={styles.step}>
                                    <Text fontSize='md'>Nome=</Text>
                                    <Input
                                        name='Nome'
                                        onChange={onColumnInputChange}
                                        width='50px'
                                        size='xs'
                                        fontSize='md'
                                    />
                                </div>
                                <div className={styles.step}>
                                    <Text fontSize='md'>Nd=</Text>
                                    <Input
                                        name='Nd'
                                        onKeyPress={(event) => {
                                            if (!/[0-9.]/.test(event.key)) {
                                                event.preventDefault()}
                                            }
                                        }
                                        onChange={onColumnInputChange}
                                        width='50px'
                                        size='xs'
                                        fontSize='md'
                                    />
                                </div>
                                <div className={styles.step}>
                                    <Text fontSize='md'>Mx=</Text>
                                    <Input
                                        name='Mx'
                                        onKeyPress={(event) => {
                                            if (!/[0-9.]/.test(event.key)) {
                                                event.preventDefault()}
                                            }
                                        }
                                        onChange={onColumnInputChange}
                                        width='50px'
                                        size='xs'
                                        fontSize='md'
                                    />
                                </div>
                                <div className={styles.step}>
                                    <Text fontSize='md'>My=</Text>
                                    <Input
                                        name='My'
                                        onKeyPress={(event) => {
                                            if (!/[0-9.]/.test(event.key)) {
                                                event.preventDefault()}
                                            }
                                        }
                                        onChange={onColumnInputChange}
                                        width='50px'
                                        size='xs'
                                        fontSize='md'
                                    />
                                </div>
                            </div>
                            <div className={styles.stepRow}>
                                <Button
                                    name="column_register"
                                    width="100px"
                                    onClick={() => {onColumnAction('register')}}
                                    colorScheme='blue'
                                    size='sm'
                                    fontSize='md'
                                >
                                    Cadastrar
                                </Button>
                                <Button
                                    name="column_edit"
                                    width="100px"
                                    onClick={() => {onColumnAction('edit')}}
                                    colorScheme='blue'
                                    size='sm'
                                    fontSize='md'
                                >
                                    Editar
                                </Button>
                                <Button
                                    name="column_remove"
                                    width="100px"
                                    onClick={() => {onColumnAction('remove')}}
                                    colorScheme='blue'
                                    size='sm'
                                    fontSize='md'
                                >
                                    Remover
                                </Button>
                            </div>
                            <section>
                                {isLoading ? (
                                    // Adicione um componente de loader aqui
                                    // Por exemplo, você pode usar um spinner ou uma mensagem de carregamento
                                    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='500px' flexGrow={1}>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray'
                                            color='blue'
                                            size='xl'
                                        />
                                    </Box>
                                    // <img src={loader} alt='Loader' />
                                ) : (
                                        <TableContainer width='100%' height='500px'>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        {structureHeaders['columns'].map((header) => (
                                                            <Th fontSize='md'>{header}</Th>
                                                        ))}
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {columnsData.map((column, i) => (
                                                        <Tr key={"row-"+i}>
                                                            {structureHeaders['columns'].map((header, j) => (
                                                            <Td 
                                                                key={"col-"+j}  
                                                                fontSize='md'
                                                                _hover={{ cursor: 'pointer' }}
                                                                bg={columnInputs['selected_name'] === column['Nome'] ? 'blue.100' : 'transparent'}
                                                                onClick={() => setColumnInputs(prevInputs => ({ ...prevInputs, ['selected_name']: column['Nome'] }))}
                                                            >
                                                                {column[header]}
                                                            </Td>
                                                            ))}
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                )}
                            </section>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {warningMessageF && (
                <AlertDialog isOpen={warningMessageF}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>O pilar não possui um nome</AlertDialogHeader>
                            <AlertDialogCloseButton onClick={() => setWarningMessageF(false)}/>
                            <AlertDialogBody>
                                Insira um nome para o pilar para prosseguir.
                            </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
            {warningMessageS && (
                <AlertDialog isOpen={warningMessageS}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                                <AlertDialogHeader>Nenhum pilar selecionado</AlertDialogHeader>
                                <AlertDialogCloseButton onClick={() => setWarningMessageS(false)}/>
                                <AlertDialogBody>
                                    Para executar essa função, selecione um pilar.
                                </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}

            {warningMessageT && (
                <AlertDialog isOpen={warningMessageT}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                                <AlertDialogHeader>Pilar existente</AlertDialogHeader>
                                <AlertDialogCloseButton onClick={() => setWarningMessageT(false)}/>
                                <AlertDialogBody>
                                    Esse pilar já existe, insira outro nome.
                                </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    )
}

export default ColumnsManager