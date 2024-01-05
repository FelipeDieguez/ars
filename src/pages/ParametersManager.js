import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Editable, EditableInput, EditablePreview, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Select, Tab, TabList, Table, TableCaption, TableContainer, Tabs, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Tooltip, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import styles from './ParametersManager.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../utils/services/api'
import parametersMethods from './parameters-manager/utils/data/parametersMethods.json'
import { parameterDuplicate, parameterEdit, parameterRemove, parameterSave } from './parameters-manager/utils/services/parameters'

function ParametersManager() {
    const navigate = useNavigate()
    const [parameters, setParameters] = useState(parametersMethods)
    const [methodInput, setMethodInput] = useState({'type': 'estacas', 'selected_method': 'Aoki-Velloso', 'method': '', 'parameters': parametersMethods['estacas']['Aoki-Velloso']})
    const [formOpen, setFormOpen] = useState('')
    
    const [updateParameters, setUpdateParameters] = useState(0)
    const [projectExistsWarning, setProjectExistsWarning] = useState(false);

    function onMethodChange(ev) {
        const value = ev.target.value
        setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: value }))
        if (value === "Aoki-Velloso" || value === "Decourt-Quaresma" ) {
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods['estacas'][value] }))
        }
        else if (value === 'Bulbo de Tensões') {
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods['sapatas'][value] }))
        }
        else {
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parameters[prevInputs['type']][prevInputs['selected_method']] }))
        }
    }

    function onMethodInputChange(ev) {
        const value = ev.target.value
        setMethodInput(prevInputs => ({ ...prevInputs, ['method']: value }))
    }

    function onMethodInputTypeChange(ev) {
        setMethodInput(prevInputs => ({ ...prevInputs, ['type']: Object.keys(parametersMethods)[ev] }))
        if (Object.keys(parametersMethods)[ev] === 'estacas') {
            setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: 'Aoki-Velloso' }))
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods['estacas']['Aoki-Velloso'] }))
        }
        else if (Object.keys(parametersMethods)[ev] === 'sapatas') {
            setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: 'Bulbo de Tensões' })) 
            setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods['sapatas']['Bulbo de Tensões'] }))
        }
    }

    function onParameterInputChange(key, row, col, value) {
        setMethodInput((prevInputs) => {
            const newState = { ...prevInputs }
            const col_name = Object.keys(prevInputs['parameters'][key][0])
            newState['parameters'][key][row][col_name[col]] = parseFloat(value)
            return newState
        })
    }

    function onParametersAction(action) {
        const options = {
            'duplicate': () => {
                if (Object.keys({...parameters.estacas,...parameters.sapatas}).some(methodName => methodName === methodInput.method)) {
                    setProjectExistsWarning(true)
                }
                else {
                    parameterDuplicate(methodInput)
                    setMethodInput(prevInputs => ({ ...prevInputs, ['method']: '' }))
                    setFormOpen('')
                }
            },
            'edit': () => {
                if (Object.keys({...parameters.estacas,...parameters.sapatas}).some(methodName => methodName === methodInput.method)) {
                    setProjectExistsWarning(true)
                }
                else {
                    parameterEdit(methodInput)
                    setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: prevInputs['method'] }))
                    setMethodInput(prevInputs => ({ ...prevInputs, ['method']: '' }))
                    setFormOpen('')
                }
            },
            'remove': () => {
                parameterRemove(methodInput)
                setMethodInput(prevInputs => ({ ...prevInputs, ['selected_method']: Object.keys(parametersMethods[methodInput['type']])[0]}))
                setMethodInput(prevInputs => ({ ...prevInputs, ['parameters']: parametersMethods[methodInput['type']][Object.keys(parametersMethods[methodInput['type']])[0]] }))
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
        parameterSave(methodInput)
    }

    function onCloseParameters() {
        navigate('/')
    }

    useEffect(() => {
        api.get('/parameters')
            .then((response) => {
                const custom_methods = response['data']
                const new_methods_list = {"estacas": {...parametersMethods["estacas"], ...custom_methods["estacas"]}, "sapatas": {...parametersMethods["sapatas"], ...custom_methods["sapatas"]}}
                setParameters(new_methods_list)
                setUpdateParameters(0)
            })
        return
    }, [updateParameters])

    return (
        <>
            <div className={styles.page}>
                <div className={styles.menu}>
                    <Tabs onChange={onMethodInputTypeChange} variant='soft-rounded' colorScheme='blue'>
                        <TabList>
                            <Tab checked={methodInput['type'] === 'estacas'}>Métodos de Cálculo Estacas</Tab>
                            <Tab checked={methodInput['type'] === 'sapatas'}>Métodos de Cálculo Sapatas</Tab>
                        </TabList>
                    </Tabs>
                </div>
                <div className={styles.menu}>
                    <div className={styles.leftMenu}>
                        <Select 
                            onChange={onMethodChange}
                            variant='outline'
                            w='300px'
                            value={methodInput['selected_method']}
                        >
                            {Object.keys(parameters[methodInput['type']]).map((method) => (
                                <option key={method}>{method}</option>
                            ))}
                        </Select>
                        <Popover isOpen={formOpen === 'duplicate'} onOpen={() => setFormOpen('duplicate')} onClose={() => setFormOpen('')}>
                            <PopoverTrigger>
                                <IconButton
                                    icon={<Tooltip hasArrow label='Duplicar' bg='gray' color='black' fontSize='md'><CopyIcon /></Tooltip>}
                                    borderWidth='sm'
                                    borderRadius='none'
                                    borderColor='border'
                                    variant='solid'
                                    colorScheme='blue'
                                    isDisabled={methodInput['selected_method'] !== "Aoki-Velloso" && methodInput['selected_method'] !== "Decourt-Quaresma" && methodInput['selected_method'] !== "Bulbo de Tensões"}
                                />
                            </PopoverTrigger>
                            <PopoverContent flexDirection={'row'}>
                                <PopoverArrow backgroundColor={'black'}/>
                                <Input
                                    type='text'
                                    placeholder='Digite o nome do método'
                                    onChange={onMethodInputChange}
                                />
                                <IconButton
                                    icon={<CheckIcon />}
                                    onClick={() => onParametersAction('duplicate')}
                                />
                                <IconButton
                                    icon={<CloseIcon />}
                                    onClick={() => setFormOpen('')}
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover isOpen={formOpen === 'edit'} onOpen={() => setFormOpen('edit')} onClose={() => setFormOpen('')}>
                            <PopoverTrigger>
                                <IconButton
                                    icon={<Tooltip hasArrow label='Renomear' bg='gray' color='black' fontSize='md'><EditIcon /></Tooltip>}
                                    borderWidth='sm'
                                    borderRadius='none'
                                    borderColor='border'
                                    variant='solid'
                                    colorScheme='blue'
                                    isDisabled={methodInput['selected_method'] === "Aoki-Velloso" || methodInput['selected_method'] === "Decourt-Quaresma" || methodInput['selected_method'] === "Bulbo de Tensões"}
                                />
                            </PopoverTrigger>
                            <PopoverContent flexDirection={'row'}>
                                <PopoverArrow backgroundColor={'black'}/>
                                <Input
                                    type='text'
                                    placeholder='Digite o nome do método'
                                    onChange={onMethodInputChange}
                                />
                                <IconButton
                                    icon={<CheckIcon />}
                                    onClick={() => onParametersAction('edit')}
                                />
                                <IconButton
                                    icon={<CloseIcon />}
                                    onClick={() => setFormOpen('')}
                                />
                            </PopoverContent>
                        </Popover>
                        <IconButton
                            icon={<Tooltip hasArrow label='Remover' bg='gray' color='black' fontSize='md'><DeleteIcon /></Tooltip>}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => {onParametersAction('remove')}}
                            isDisabled={methodInput['selected_method'] === "Aoki-Velloso" || methodInput['selected_method'] === "Decourt-Quaresma" || methodInput['selected_method'] === "Bulbo de Tensões"}
                        />
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
                        {Object.entries(methodInput['parameters']).map(([key, value]) => {
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
                                                                {Object.entries(element).map(([_, content], col_index) => {
                                                                    return (
                                                                        <Td key={_}>
                                                                            {methodInput['type'] === 'estacas' && methodInput["selected_method"] !== 'Aoki-Velloso' && methodInput["selected_method"] !== 'Decourt-Quaresma' && col_index !== 0 ? (
                                                                                <Editable defaultValue={content} fontSize='md'>
                                                                                    <EditablePreview />
                                                                                    <EditableInput textAlign='start'
                                                                                        onKeyPress={(event) => {
                                                                                            if (!/[0-9.]/.test(event.key)) {
                                                                                                event.preventDefault()}
                                                                                            }}
                                                                                        onChange={(event) => {
                                                                                            onParameterInputChange(key, i, col_index, event.target.value)
                                                                                        }}
                                                                                    />
                                                                                </Editable>
                                                                            ) : (
                                                                                methodInput['type'] === 'sapatas' && methodInput["selected_method"] !== 'Bulbo de Tensões' && col_index > 1 ? (
                                                                                    <Editable defaultValue={content} fontSize='md'>
                                                                                    <EditablePreview />
                                                                                    <EditableInput textAlign='start'
                                                                                        onKeyPress={(event) => {
                                                                                            if (!/[0-9.]/.test(event.key)) {
                                                                                                event.preventDefault()}
                                                                                            }}
                                                                                        onChange={(event) => {
                                                                                            onParameterInputChange(key, i, col_index, event.target.value)
                                                                                        }}
                                                                                    />
                                                                                </Editable>
                                                                                ) : (
                                                                                    <Box fontSize='md'>{content}</Box>
                                                                                )
                                                                            )}
                                                                        </Td>
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
        </>
    )
}

export default ParametersManager