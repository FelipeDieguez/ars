import { Select, Input, Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "@chakra-ui/react";
import { Tooltip, IconButton } from "@chakra-ui/react"
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { useState, useEffect } from "react";

import styles from '../Geotechnics.module.css'
import { investigationRegister, investigationEdit, investigationRemove, layerList } from '../../utils/services/geotechnics'
import { api } from '../../../../utils/services/api'

function SondagemAcoes({ projectInputs, investigationInputs, updateInvestigationInputs, investigationsData, setInvestigationsData, setUpdateGeotechnics }) {
    const [formOpen, setFormOpen] = useState('')
    const [updateSoilInvestigation, setUpdateSoilInvestigation] = useState(0)
    const [existsWarning, setExistsWarning] = useState(false)
    const [lastWarning, setLastWarning] = useState(false)

    function onInvestigationSelectedChange(ev) {
        const value = ev.target.value
        updateInvestigationInputs('selected_name', value)
        setUpdateGeotechnics(prev => prev + 1)
    }

    function onInvestigationInputChange(ev) {
        const value = ev.target.value
        updateInvestigationInputs('name_input', value)
    }

    function onSoilInvestigationAction(action) {
        const options = {
            'register': () => {
                if (investigationsData.some(name => name === investigationInputs['name_input'])) {
                    setExistsWarning(true)
                } else {
                    investigationRegister([projectInputs, investigationInputs])
                        .then(() => {
                            setUpdateSoilInvestigation(prev => prev + 1)
                        })
                    setFormOpen('')
                    updateInvestigationInputs('selected_name', investigationInputs['name_input'])
                    updateInvestigationInputs('name_input', '')
                }
            },
            'edit': () => {
                if (investigationsData.some(name => name === investigationInputs['name_input'])) {
                    setExistsWarning(true)
                }
                else {
                    investigationEdit([projectInputs, investigationInputs])
                        .then(() => {
                            setUpdateSoilInvestigation(prev => prev + 1)
                        })
                    setFormOpen('')
                    updateInvestigationInputs('selected_name', investigationInputs['name_input'])
                    updateInvestigationInputs('name_input', '')
                }
            },
            'remove': () => {
                if (investigationsData.length === 1) {
                    setLastWarning(true)
                }
                else {
                    investigationRemove([projectInputs, investigationInputs])
                        .then(() => {
                            setUpdateSoilInvestigation(prev => prev + 1)
                        })
                    updateInvestigationInputs('selected_name', investigationsData[0])
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
            api.post('/investigation', projectInputs)
                .then((response) => {
                    setInvestigationsData(response['data'])
                    if (investigationInputs['selected_name'] === '') {
                        updateInvestigationInputs('selected_name', response['data'][0])
                    }
                    else {
                        setUpdateGeotechnics(prev => prev + 1)
                    }
                    
            })
        }
    }, [ updateSoilInvestigation, projectInputs['selected_name'] ])

    return (
        <>
            <Select
                w='250px'
                onChange={onInvestigationSelectedChange}
                value={investigationInputs['selected_name']}
            >
                {investigationsData.map((name, i) => (
                    <option key={i} value={name}> {name} </option>
                ))}
            </Select>
            <Popover placement='bottom' isOpen={formOpen === 'register'} onOpen={() => setFormOpen('register')} onClose={() => setFormOpen('')}>
                <PopoverTrigger>
                    <IconButton
                        icon={<Tooltip hasArrow label='Criar' bg='gray' color='black' fontSize='md'><AddIcon /></Tooltip>}
                        borderWidth='sm'
                        borderRadius='none'
                        borderColor='border'
                        variant='solid'
                        colorScheme='blue'
                    />
                </PopoverTrigger>
                <PopoverContent flexDirection={'row'}>
                    <PopoverArrow backgroundColor={'black'}/>
                    <Input
                        type='text'
                        placeholder='Digite o nome da sondagem'
                        onChange={onInvestigationInputChange}
                        value={investigationInputs['name_input']}
                    />
                    <IconButton
                        icon={<CheckIcon />}
                        onClick={() => onSoilInvestigationAction(formOpen)}
                    />
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={() => {
                            setFormOpen('')
                            updateInvestigationInputs('name_input', '')
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Popover placement='bottom' isOpen={formOpen === 'edit'} onOpen={() => setFormOpen('edit')} onClose={() => setFormOpen('')}>
                <PopoverTrigger>
                    <IconButton
                        icon={<Tooltip hasArrow label='Editar' bg='gray' color='black' fontSize='md'><EditIcon /></Tooltip>}
                        borderWidth='sm'
                        borderRadius='none'
                        borderColor='border'
                        variant='solid'
                        colorScheme='blue'
                    />
                </PopoverTrigger>
                <PopoverContent flexDirection={'row'}>
                    <PopoverArrow backgroundColor={'black'}/>
                    <Input
                        type='text'
                        placeholder='Digite o nome da sondagem'
                        onChange={onInvestigationInputChange}
                        value={investigationInputs['name_input']}
                    />
                    <IconButton
                        icon={<CheckIcon />}
                        onClick={() => onSoilInvestigationAction(formOpen)}
                    />
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={() => {
                            setFormOpen('')
                            updateInvestigationInputs('name_input', '')
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
                onClick={() => onSoilInvestigationAction('remove')}
            />
            {existsWarning && (
                <div className={styles.page}>
                    <AlertDialog isOpen={existsWarning}>
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>Sondagem já existe</AlertDialogHeader>
                                <AlertDialogCloseButton onClick={() => setExistsWarning(false)}/>
                                <AlertDialogBody>
                                    A sondagem com esse nome já existe. Escolha um nome diferente.
                                </AlertDialogBody>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </div>
            )}
            {lastWarning && (
                <div className={styles.page}>
                    <AlertDialog isOpen={lastWarning}>
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>Essa é a última sondagem do projeto</AlertDialogHeader>
                                <AlertDialogCloseButton onClick={() => setLastWarning(false)}/>
                                <AlertDialogBody>
                                    Essa é a última sondagem do projeto, caso queira apagá-la, apague o projeto.
                                </AlertDialogBody>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </div>
            )}
        </>
    )
}

export default SondagemAcoes