import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectRegister, projectEdit, projectRemove } from '../utils/services/projects'

import styles from './ProjectManager.module.css';

import { api } from '../../../utils/services/api'
import { Button, Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react'

function ProjectManager({ projectInputs, updateProjectInputs, updateLayerInputs, isOpen, onOpen, onClose }) {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [updateProjects, setUpdateProjects] = useState(0)
    const [formOpen, setFormOpen] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [warningMessage, setWarningMessage] = useState(false)
    const [projectExistsWarning, setProjectExistsWarning] = useState(false);

    function onSearchInputChange(ev) {
        const value = ev.target.value
        setSearchTerm(value)
        setUpdateProjects(1)
    }

    function onProjectInputChange(ev) {
        const value = ev.target.value
        updateProjectInputs('name', value)
    }

    function onOpenProject(ev) {
        if (projectInputs['selected_name'] !== '') {
            updateLayerInputs('projeto', projectInputs["selected_name"])
            onClose()
        }
        else {
            setWarningMessage(true)
        }
    }

    function onProjectAction(action) {
        const options = {
            'register': () => {
                if (projects.some(project => project.name === projectInputs.name)) {
                    setProjectExistsWarning(true)
                }
                else {
                    projectRegister(projectInputs)
                    setFormOpen('')
                }
            },
            'edit': () => {
                if (projectInputs['selected_name'] === '') {
                    setWarningMessage(true)
                }
                else if (projects.some(project => project.name === projectInputs.name)) {
                    setProjectExistsWarning(true)
                }
                else {
                    projectEdit(projectInputs)
                    updateProjectInputs('selected_name', '')
                    setFormOpen('')
                }
            },
            'remove': () => {
                if (projectInputs['selected_name'] === '') {
                    setWarningMessage(true)
                }
                else {
                    projectRemove(projectInputs)
                    updateProjectInputs('selected_name', '')
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
        setUpdateProjects(1)
    }

    function onOpenParameters() {
        navigate('/parameters')
    }

    useEffect(() => {
        api.get('/projects')
            .then((response) => {
                setProjects(response['data'])
                const filter = response['data'].filter(project =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                setFilteredProjects(filter)
                setUpdateProjects(0)
            })
    }, [updateProjects])

    return (
        <>
            <Drawer size={'md'} placement={'left'} onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} onOpen={onOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        <Heading fontFamily='title' fontSize='lg'>GERENCIADOR DE PROJETOS</Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className={styles.menu}>
                            <IconButton
                                icon={<Tooltip hasArrow label='Abrir Projeto' bg='gray' color='black' fontSize='md'><ExternalLinkIcon /></Tooltip>}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={onOpenProject}
                            />
                            <IconButton
                                icon={<Tooltip hasArrow label='Criar' bg='gray' color='black' fontSize='md'><AddIcon /></Tooltip>}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={() => setFormOpen('register')}
                            />
                            <IconButton
                                icon={<Tooltip hasArrow label='Editar' bg='gray' color='black' fontSize='md'><EditIcon /></Tooltip>}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={() => setFormOpen('edit')}
                            />
                            <IconButton
                                icon={<Tooltip hasArrow label='Remover' bg='gray' color='black' fontSize='md'><DeleteIcon /></Tooltip>}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={() => onProjectAction('remove')}
                            />
                            {formOpen !== '' && (
                                <>
                                    <Input
                                        type='text'
                                        placeholder='Digite o nome do projeto'
                                        onChange={onProjectInputChange}
                                    />
                                    <IconButton
                                        icon={<CheckIcon />}
                                        onClick={() => onProjectAction(formOpen)}
                                    />
                                    <IconButton
                                        icon={<CloseIcon />}
                                        onClick={() => setFormOpen('')}
                                    />
                                </>
                            )}
                        </div>
                        <div className={styles.menu}>
                            <InputGroup size='md'>
                                <InputLeftAddon children={<SearchIcon/>} />
                                <Input
                                    type='text'
                                    placeholder='Buscar projeto'
                                    value={searchTerm}
                                    onChange={onSearchInputChange}
                                />
                            </InputGroup>
                        </div>
                        <div className={styles.section}>
                            <TableContainer>
                                <Table variant='striped' colorScheme='gray'>
                                    <Thead>
                                        <Tr>
                                            <Th display='flex'
                                                justifyContent='center'
                                                alignItems='center'
                                                fontSize='md'
                                                border='2px'
                                            >
                                                PROJETOS
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredProjects.map((project, i) => {
                                            return(
                                                <Tr background={projectInputs['selected_name'] === project['name'] ? 'selected' : 'white'}
                                                    cursor='pointer'
                                                    border='1px'
                                                    h='25px'
                                                >
                                                    <Td onClick={() => updateProjectInputs('selected_name', project['name'])} 
                                                    borderBottom='0px'
                                                    display='flex'
                                                    justifyContent='center'
                                                    alignItems='center'
                                                    fontSize='md'
                                                    padding='0px'
                                                    w='100%'
                                                    >
                                                        {project['name']}
                                                    </Td>
                                                </Tr>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <IconButton
                            icon={<Tooltip hasArrow label='Configurações' bg='gray' color='black' fontSize='md'><SettingsIcon /></Tooltip>}
                            borderWidth='sm'
                            borderRadius='none'
                            borderColor='border'
                            variant='solid'
                            colorScheme='blue'
                            onClick={() => onOpenParameters()}
                        />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {projectExistsWarning && (
                <AlertDialog isOpen={projectExistsWarning}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>Projeto já existe</AlertDialogHeader>
                            <AlertDialogCloseButton onClick={() => setProjectExistsWarning(false)}/>
                            <AlertDialogBody>
                                O projeto com esse nome já existe. Escolha um nome diferente.
                            </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
            {warningMessage && (
                <AlertDialog isOpen={warningMessage}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                                <AlertDialogHeader>Nenhum projeto selecionado</AlertDialogHeader>
                                <AlertDialogCloseButton onClick={() => setWarningMessage(false)}/>
                                <AlertDialogBody>
                                    Para executar essa função, selecione um projeto.
                                </AlertDialogBody>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    )
}

export default ProjectManager