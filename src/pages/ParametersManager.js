import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Editable, EditableInput, EditablePreview, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Select, Tab, TabList, Table, TableCaption, TableContainer, Tabs, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Tooltip, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, CopyIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import styles from './ParametersManager.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../utils/services/api'
import parametersMethods from './parameters-manager/utils/data/parametersMethods.json'
import { methodDuplicate, methodEdit, methodRemove, methodSave } from './parameters-manager/utils/services/methods'

function ParametersManager({ methodInputs, setMethodInputs, updateMethodInputs, methodsData, setUpdateMethods }) {
    const navigate = useNavigate()
    const [formOpen, setFormOpen] = useState('')
    const [projectExistsWarning, setProjectExistsWarning] = useState(false);

    function onMethodSelectedChange(ev) {
        const value = ev.target.value
        updateMethodInputs('selected_name', value)
        if (value === "Aoki-Velloso" || value === "Decourt-Quaresma" ) {
            updateMethodInputs('parameters', parametersMethods['estacas'][value])
        }
        else if (value === 'Bulbo de Tensões') {
            updateMethodInputs('parameters', parametersMethods['sapatas'][value])
        }
        else {
            updateMethodInputs('parameters', methodsData[methodInputs['foundation_class']][value])
        }
    }

    function onMethodInputChange(ev) {
        const value = ev.target.value
        updateMethodInputs('name_input', value)
    }

    function onMethodFoundationClassChange(ev) {
        updateMethodInputs('foundation_class', Object.keys(parametersMethods)[ev])
        if (Object.keys(parametersMethods)[ev] === 'estacas') {
            updateMethodInputs('selected_name', 'Aoki-Velloso')
            updateMethodInputs('parameters', parametersMethods['estacas']['Aoki-Velloso'])
        }
        else if (Object.keys(parametersMethods)[ev] === 'sapatas') {
            updateMethodInputs('selected_name', 'Bulbo de Tensões')
            updateMethodInputs('parameters', parametersMethods['sapatas']['Bulbo de Tensões'])
        }
    }

    function onParameterInputChange(key, row, col, value) {
        setMethodInputs((prevInputs) => {
            const newState = { ...prevInputs }
            const col_name = Object.keys(prevInputs['parameters'][key][0])
            newState['parameters'][key][row][col_name[col]] = parseFloat(value)
            return newState
        })
    }

    function onMethodActions(action) {
        const options = {
            'duplicate': () => {
                if (Object.keys({...methodsData.estacas,...methodsData.sapatas}).some(name => name === methodInputs.name_input)) {
                    setProjectExistsWarning(true)
                }
                else {
                    methodDuplicate(methodInputs)
                        .then(() => {
                            setUpdateMethods(prev => prev + 1)
                        })
                    updateMethodInputs('selected_name', methodInputs['name_input'])
                    setFormOpen('')
                    updateMethodInputs('name_input', '')
                }
            },
            'edit': () => {
                if (Object.keys({...methodsData.estacas,...methodsData.sapatas}).some(name => name === methodInputs.name_input)) {
                    setProjectExistsWarning(true)
                }
                else {
                    methodEdit(methodInputs)
                        .then(() => {
                            setUpdateMethods(prev => prev + 1)
                        })
                    updateMethodInputs('selected_name', methodInputs['name_input'])
                    setFormOpen('')
                    updateMethodInputs('name_input', '')
                }
            },
            'remove': () => {
                methodRemove(methodInputs)
                    .then(() => {
                        setUpdateMethods(prev => prev + 1)
                    })
                updateMethodInputs('selected_name', Object.keys(parametersMethods[methodInputs['foundation_class']])[0])
                updateMethodInputs('parameters', parametersMethods[methodInputs['foundation_class']][Object.keys(parametersMethods[methodInputs['foundation_class']])[0]])
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
    }

    function onMethodSave() {
        methodSave(methodInputs)
    }

    function onCloseParameters() {
        updateMethodInputs('foundation_class', 'estacas')
        navigate('/')
    }

    return (
        <>
            <div className={styles.page}>
                <div className={styles.menu}>
                    <Tabs onChange={onMethodFoundationClassChange} variant='soft-rounded' colorScheme='blue' value={methodInputs['foundation_class']}>
                        <TabList>
                            <Tab checked={methodInputs['foundation_class'] === 'estacas'}>Métodos de Cálculo Estacas</Tab>
                            <Tab checked={methodInputs['foundation_class'] === 'sapatas'}>Métodos de Cálculo Sapatas</Tab>
                        </TabList>
                    </Tabs>
                </div>
                <div className={styles.menu}>
                    <div className={styles.leftMenu}>
                        <Select 
                            onChange={onMethodSelectedChange}
                            variant='outline'
                            w='300px'
                            value={methodInputs['selected_name']}
                        >
                            {Object.keys(methodsData[methodInputs['foundation_class']]).map((method) => (
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
                                    isDisabled={methodInputs['selected_name'] !== "Aoki-Velloso" && methodInputs['selected_name'] !== "Decourt-Quaresma" && methodInputs['selected_name'] !== "Bulbo de Tensões"}
                                />
                            </PopoverTrigger>
                            <PopoverContent flexDirection={'row'}>
                                <PopoverArrow backgroundColor={'black'}/>
                                <Input
                                    type='text'
                                    placeholder='Digite o nome do método'
                                    onChange={onMethodInputChange}
                                    value={methodInputs['name_input']}
                                />
                                <IconButton
                                    icon={<CheckIcon />}
                                    onClick={() => onMethodActions('duplicate')}
                                />
                                <IconButton
                                    icon={<CloseIcon />}
                                    onClick={() => {
                                        setFormOpen('')
                                        setMethodInputs(prevInputs => ({ ...prevInputs, ['name_input']: '' }))
                                    }}
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
                                    isDisabled={methodInputs['selected_name'] === "Aoki-Velloso" || methodInputs['selected_name'] === "Decourt-Quaresma" || methodInputs['selected_name'] === "Bulbo de Tensões"}
                                />
                            </PopoverTrigger>
                            <PopoverContent flexDirection={'row'}>
                                <PopoverArrow backgroundColor={'black'}/>
                                <Input
                                    type='text'
                                    placeholder='Digite o nome do método'
                                    onChange={onMethodInputChange}
                                    value={methodInputs['name_input']}
                                />
                                <IconButton
                                    icon={<CheckIcon />}
                                    onClick={() => onMethodActions('edit')}
                                />
                                <IconButton
                                    icon={<CloseIcon />}
                                    onClick={() => {
                                        setFormOpen('')
                                        setMethodInputs(prevInputs => ({ ...prevInputs, ['name_input']: '' }))
                                    }}
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
                            onClick={() => {onMethodActions('remove')}}
                            isDisabled={methodInputs['selected_name'] === "Aoki-Velloso" || methodInputs['selected_name'] === "Decourt-Quaresma" || methodInputs['selected_name'] === "Bulbo de Tensões"}
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
                                onClick={() => {onMethodSave()}}
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
                        {Object.entries(methodInputs['parameters']).map(([key, value]) => {
                            return (
                                <AccordionItem>
                                    {key === Object.keys(methodInputs['parameters'])[0] ? (
                                        <AccordionButton>
                                            <Box as='span' flex='1' textAlign='left'>
                                                <strong>{key}: {value}</strong>
                                            </Box>
                                        </AccordionButton>
                                    ) : (
                                        <>
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
                                                                {/* Preciso de alguma forma ter o state de qual método esse método foi duplicado para puxar o cabeçalho certo */}
                                                                {/* {Object.entries(parametersMethods[methodInput['type']][methodInput['selected_method']])} */}
                                                                {Object.entries(value[0]).map(([header, _]) => {
                                                                    return(
                                                                        <Th key={header}>{header}</Th>
                                                                    )
                                                                })}
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {value.map((element, i) => {
                                                                return(
                                                                    <Tr key={i}>
                                                                        {Object.entries(element).map(([_, content], col_index) => {
                                                                            return (
                                                                                <Td key={col_index}>
                                                                                    {methodInputs['foundation_class'] === 'estacas' && methodInputs["selected_name"] !== 'Aoki-Velloso' && methodInputs["selected_name"] !== 'Decourt-Quaresma' && col_index !== 0 ? (
                                                                                        <Editable defaultValue={content || '0'} fontSize='md'>
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
                                                                                        methodInputs['foundation_class'] === 'sapatas' && methodInputs["selected_name"] !== 'Bulbo de Tensões' && col_index > 1 ? (
                                                                                            <Editable defaultValue={content || '0'} fontSize='md'>
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
                                        </>
                                    )}
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