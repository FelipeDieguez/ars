import { Select, Input } from "@chakra-ui/react";
import { Tooltip, IconButton } from "@chakra-ui/react"
import { AddIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { useState, useEffect } from "react";

import styles from '../Geotechnics.module.css'
import { soilInvestigationRegister, soilInvestigationEdit, soilInvestigationRemove } from '../../utils/services/geotechnics'
import { api } from '../../../../utils/services/api'

function SondagemAcoes({ updateGeotechnics, setUpdateGeotechnics, layerInputs, updateLayerInputs }) {
    const [formOpen, setFormOpen] = useState('')
    const [soilInvestigationList, setSoilInvestigationList] = useState([])
    const [soilInvestigationName, setSoilInvestigationName] = useState('')
    const [updateSoilInvestigation, setUpdateSoilInvestigation] = useState(0)
    const [existsWarning, setExistsWarning] = useState(false)
    const [lastWarning, setLastWarning] = useState(false)

    function onLayerInputsChange(ev) {
        const value = ev.target.value
        updateLayerInputs("sondagem", value)
        setUpdateGeotechnics(1)
    }

    function onSoilInvestigationNameChange(ev) {
        const value = ev.target.value
        setSoilInvestigationName(value)
    }

    function onSoilInvestigationAction(action) {
        const options = {
            'register': () => {
                if (soilInvestigationList.some(name => name === soilInvestigationName)) {
                    setExistsWarning(true)
                } else {
                    soilInvestigationRegister([layerInputs, soilInvestigationName])
                    setFormOpen('')
                }
            },
            'edit': () => {
                if (soilInvestigationList.some(name => name === soilInvestigationName)) {
                    setExistsWarning(true)
                }
                else {
                    soilInvestigationEdit([layerInputs, soilInvestigationName])
                    updateLayerInputs('sondagem', soilInvestigationName)
                    setFormOpen('')
                }
            },
            'remove': () => {
                if (soilInvestigationList.length === 1) {
                    setLastWarning(true)
                }
                else {
                    soilInvestigationRemove(layerInputs)
                    updateLayerInputs('sondagem', soilInvestigationList[0])
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
        setUpdateSoilInvestigation(1)
    }

    useEffect(() => {
        if (layerInputs['projeto'] !== '') {
            api.post('/soilinvestigation', layerInputs)
                .then((response) => {
                    setSoilInvestigationList(response['data'])
                    setUpdateSoilInvestigation(0)
                    setUpdateGeotechnics(1)
            })
        }
    }, [ updateSoilInvestigation, layerInputs['projeto'] ])

    useEffect(() => {
        api.post('/soilinvestigation', {'projeto': layerInputs['projeto']})
            .then((response) => {
                updateLayerInputs('sondagem', response['data'][0])
                setUpdateGeotechnics(1)
        })
    }, [layerInputs['projeto']])

    return (
        <>
            <Select
                w='250px'
                onChange={onLayerInputsChange}
            >
                {soilInvestigationList.map((name, i) => (
                    <option key={i} value={name}> {name} </option>
                ))}
            </Select>
            <Tooltip hasArrow label='Criar' bg='gray' color='black' fontSize='md'>
                <IconButton
                    icon={<AddIcon />}
                    borderWidth='sm'
                    borderRadius='none'
                    borderColor='border'
                    variant='solid'
                    colorScheme='blue'
                    onClick={() => setFormOpen('register')}
                />
            </Tooltip>
            <Tooltip hasArrow label='Editar' bg='gray' color='black' fontSize='md'>
                <IconButton
                    icon={<EditIcon />}
                    borderWidth='sm'
                    borderRadius='none'
                    borderColor='border'
                    variant='solid'
                    colorScheme='blue'
                    onClick={() => setFormOpen('edit')}
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
                    onClick={() => onSoilInvestigationAction('remove')}
                />
            </Tooltip>
            {formOpen !== '' && (
                <>
                    <Input
                        type='text'
                        placeholder='Digite o nome da sondagem'
                        onChange={onSoilInvestigationNameChange}
                        w='250px'
                    />
                    <IconButton
                        icon={<CheckIcon />}
                        onClick={() => onSoilInvestigationAction(formOpen)}
                    />
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={() => setFormOpen('')}
                    />
                </>
            )}
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