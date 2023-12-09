import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Editable, EditableInput, EditablePreview, Select, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Tooltip, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import styles from './ParametersManager.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../utils/services/api'
import parametersMethods from './parameters-manager/utils/data/parametersMethods.json'
import { parameterDuplicate, parameterEdit, parameterRemove } from './parameters-manager/utils/services/parameters'

function ParametersManager() {
    const navigate = useNavigate()
    const [methods, setMethods] = useState(Object.keys(parametersMethods))
    const [parameters, setParameters] = useState(parametersMethods)
    const [methodInput, setMethodInput] = useState({'selected_method': 'Aoki-Velloso', 'method': '', 'parameters': parametersMethods['Aoki-Velloso']})
    const [formOpen, setFormOpen] = useState('')
    
    const [updateParameters, setUpdateParameters] = useState(0)
    const [projectExistsWarning, setProjectExistsWarning] = useState(false);

    function onMethodChange(ev) {
        const value = ev.target.value
        setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: value }))
        if (value === "Aoki-Velloso" || value === "Decourt-Quaresma") {
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods[value] }))
        }
    }

    function onMethodInputChange(ev) {
        const value = ev.target.value
        setMethodInput(prevInputs => ({ ...prevInputs, ['method']: value }))
    }

    function onParametersAction(action) {
        const options = {
            'duplicate': () => {
                if (methods.some(methodName => methodName === methodInput.method)) {
                    setProjectExistsWarning(true)
                }
                else {
                    parameterDuplicate(methodInput)
                    setMethodInput(prevInputs => ({ ...prevInputs, ['method']: '' }))
                    setFormOpen('')
                }
            },
            'edit': () => {
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
        api.get('/parameters')
            .then((response) => {
                const custom_methods = response['data']
                const new_methods_list = Object.assign({}, parametersMethods, custom_methods)
                setMethods(Object.keys(new_methods_list))
                setParameters(new_methods_list)
                console.log(new_methods_list)
                setUpdateParameters(0)
            })
        return
    }, [updateParameters])

    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <div className={styles.leftMenu}>
                    <Select 
                        onChange={onMethodChange}
                        variant='outline'
                        w='300px'
                    >
                        {methods.map((method) => (
                            <option key={method}>{method}</option>
                        ))}
                    </Select>
                    <Tooltip hasArrow label='Duplicar' bg='gray' color='black' fontSize='md'>
                        <IconButton
                            icon={<CopyIcon />}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {setFormOpen('duplicate')}}
                            isDisabled={methodInput['selected_method'] !== "Aoki-Velloso" && methodInput['selected_method'] !== "Decourt-Quaresma"}
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
                            onClick={() => {setFormOpen('edit')}}
                            isDisabled={methodInput['selected_method'] === "Aoki-Velloso" || methodInput['selected_method'] === "Decourt-Quaresma"}
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
                            isDisabled={methodInput['selected_method'] === "Aoki-Velloso" || methodInput['selected_method'] === "Decourt-Quaresma"}
                        />
                    </Tooltip>
                    {formOpen !== '' && (
                        <>
                            <Input
                                type='text'
                                placeholder='Digite o nome do método'
                                onChange={onMethodInputChange}
                            />
                            <IconButton
                                icon={<CheckIcon />}
                                onClick={() => onParametersAction(formOpen)}
                            />
                            <IconButton
                                icon={<CloseIcon />}
                                onClick={() => setFormOpen('')}
                            />
                        </>
                    )}
                    {projectExistsWarning && (
                        <div className={styles.page}>
                            <AlertDialog isOpen={projectExistsWarning}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>Metódo já existe</AlertDialogHeader>
                                        <AlertDialogCloseButton onClick={() => setProjectExistsWarning(false)}/>
                                        <AlertDialogBody>
                                            O método com esse nome já existe. Escolha um nome diferente.
                                        </AlertDialogBody>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </div>
                    )}
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
                    {Object.entries(parameters[methodInput['selected_method']]).map(([key, value]) => {
                        return (
                            <AccordionItem>
                                <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left'>
                                        <strong>{key}</strong>
                                    </Box>
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <TableContainer>
                                        <Table variant='striped' colorScheme='gray' size='sm'>
                                            <Thead>
                                                <Tr>
                                                    {Object.entries(value[0]).map(([header, _]) => {
                                                        return(
                                                            <Th>{header}</Th>
                                                        )
                                                    })}
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {value.map((element, i) => {
                                                    return(
                                                        <Tr>
                                                            {Object.entries(element).map(([_, content]) => {
                                                                return (
                                                                    <Td fontSize='md'>{content}</Td>
                                                                )
                                                            })}
                                                        </Tr>
                                                    )
                                                })}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </div>
        </div>
    )
}

export default ParametersManager