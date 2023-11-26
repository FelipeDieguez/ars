import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectRegister, projectEdit, projectRemove } from './project-manager/utils/services/projects'

import styles from './ProjectManager.module.css';

import { api } from '../utils/services/api'
import { Checkbox, Heading, IconButton, Input, InputGroup, InputLeftAddon, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, ExternalLinkIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'

function ProjectManager({ projectInputs, updateProjectInputs }) {
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
            navigate('/main')
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
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <Heading fontFamily='title' fontSize='lg'>GERENCIADOR DE PROJETOS</Heading>
                </header>
                <div className={styles.menu}>
                    <div className={styles.leftMenu}>
                        <Tooltip hasArrow label='Abrir Projeto' bg='gray' color='black' fontSize='md'>
                            <IconButton
                                icon={<ExternalLinkIcon />}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={onOpenProject}
                            />
                        </Tooltip>
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
                                onClick={() => onProjectAction('remove')}
                            />
                        </Tooltip>
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
                    <div className={styles.rigthMenu}>
                        <Tooltip hasArrow label='Configurações' bg='gray' color='black' fontSize='md'>
                            <IconButton
                                icon={<SettingsIcon />}
                                borderWidth='sm'
                                borderRadius='none'
                                borderColor='border'
                                variant='solid'
                                colorScheme='blue'
                                onClick={() => onOpenParameters()}
                            />
                        </Tooltip>
                    </div>
                    {warningMessage && (
                        <div className={styles.page}>
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
                        </div>
                    )}
                    {projectExistsWarning && (
                        <div className={styles.page}>
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
                        </div>
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
            </div>
        </div>
    )
}

export default ProjectManager