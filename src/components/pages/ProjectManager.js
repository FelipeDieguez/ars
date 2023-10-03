import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectRegister, projectEdit, projectRemove } from '../services/projetos'

import Button from '../form/Button'
import LineEditText from '../form/LineEditText'

import styles from './ProjectManager.module.css';

import { api } from '../services/api'
import { Checkbox, Heading, IconButton, Input, Tooltip, useSafeLayoutEffect } from '@chakra-ui/react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton} from '@chakra-ui/react'
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'

function ProjectManager({ projectInputs, updateProjectInputs }) {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [updateProjects, setUpdateProjects] = useState(0)
    const [formOpen, setFormOpen] = useState('')
    const [warningMessage, setWarningMessage] = useState(false)

    function onProjectInputChange(ev) {
        const value = ev.target.value
        updateProjectInputs('name', value)
    }

    function onOpenProject(ev) {
        if (projectInputs["selected_name"] !== '') {
            navigate('/fundars')
        }
        else {
            setWarningMessage(true)
        }
    }

    function onProjectAction(action) {
        const options = {
            'register': () => {
                projectRegister(projectInputs)
                setFormOpen('')
            },
            'edit': () => {
                if (projectInputs['selected_name'] !== '') {
                    projectEdit(projectInputs)
                    setFormOpen('')
                }
                else {
                    setWarningMessage(true)
                    setFormOpen('')
                }
            },
            'remove': () => {
                if (projectInputs['selected_name'] !== '') {
                    projectRemove(projectInputs)
                }
                else {
                    setWarningMessage(true)
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


    useEffect(() => {
        api.get('/projetos')
            .then((response) => {
                setProjects(response['data'])
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
                        <div className={styles.menu}>
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
                        </div>
                    )}
                    {warningMessage && (
                        <div className={styles.page}>
                            <AlertDialog isOpen={warningMessage}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                            <AlertDialogHeader>Nenhum Projeto Selecionado!</AlertDialogHeader>
                                            <AlertDialogCloseButton onClick={() => setWarningMessage(false)}/>
                                            <AlertDialogBody>
                                                Para executar essa função, selecione um projeto.
                                            </AlertDialogBody>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </div>
                    )}  
                </div>
                <div className={styles.section}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr className={styles.tr}>
                                <th className={styles.th}>NOME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, i) => {
                                return(
                                    <tr 
                                        className={
                                            projectInputs['selected_name'] === project['name'] ? styles.selected : styles.trBody
                                        }   
                                        key={'row-'+i}
                                    >
                                        <td
                                            key={'col-1'}
                                            className={styles.td}
                                            onClick={() => updateProjectInputs('selected_name', project['name'])}
                                        >
                                            <label>{project['name']}</label>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProjectManager