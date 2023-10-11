import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Editable, EditableInput, EditablePreview, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Tooltip, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import styles from './ParametersManager.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ParametersManager() {
    const navigate = useNavigate()
    const [updateParamaters, setUpdateParameters] = useState(0)

    function onParametersAction(action) {
        const options = {
            'duplicate': () => {
                return
            },
            'rename': () => {
                return
            },
            'remove': () => {
                return
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
        setUpdateParameters(1)
    }

    function onSaveParameters() {
        return
    }

    function onCloseParameters() {
        navigate('/')
    }

    useEffect(() => {
        return
    }, [updateParamaters])

    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <div className={styles.leftMenu}>
                    <Select variant='outline' w='300px'/>
                    <Tooltip hasArrow label='Duplicar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<CopyIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onParametersAction('duplicate')}}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label='Renomear' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<EditIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onParametersAction('rename')}}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label='Remover' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<DeleteIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onParametersAction('remove')}}
                        />
                    </Tooltip>
                </div>
                <div className={styles.rightMenu}>
                    <Tooltip hasArrow label='Salvar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<CheckIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onSaveParameters()}}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label='Fechar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<CloseIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onCloseParameters()}}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className={styles.section}>
                <Accordion defaultIndex={[0]} allowMultiple w='100%'>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                ATRITO LATERAL
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Aqui estarão os parâmetros
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                ATRITO DE PONTA
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <TableContainer>
                                <Table variant='striped' colorScheme='gray'>
                                    <Thead>
                                        <Tr>
                                            <Th>Solo</Th>
                                            <Th>K (MPA)</Th>
                                            <Th>α (%)</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Areia</Td>
                                            <Td>
                                                <Editable defaultValue='1,00'>
                                                    <EditablePreview/>
                                                    <EditableInput/>
                                                </Editable>
                                            </Td>
                                            <Td>
                                                <Editable defaultValue='1,4'>
                                                    <EditablePreview/>
                                                    <EditableInput/>
                                                </Editable>
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Areia Siltosa</Td>
                                            <Td>
                                                <Editable defaultValue='0,8'>
                                                    <EditablePreview/>
                                                    <EditableInput/>
                                                </Editable>
                                            </Td>
                                            <Td>
                                                <Editable defaultValue='2,0'>
                                                    <EditablePreview/>
                                                    <EditableInput/>
                                                </Editable>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot>
                                        <TableCaption>Aoki-Velloso (1975)</TableCaption>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default ParametersManager