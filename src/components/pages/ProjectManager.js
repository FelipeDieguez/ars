import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectRegister, projectEdit, projectRemove } from '../services/projetos'

import Button from '../form/Button'
import LineEditText from '../form/LineEditText'

import styles from './ProjectManager.module.css';

import { api } from '../services/api'

function ProjectManager({ projectInputs, updateProjectInputs }) {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [updateProjects, setUpdateProjects] = useState(0)

    function onOpenProject(ev) {
        if (projectInputs["selected_name"] !== '') {
            navigate('/fundars')
        }
    }

    function onProjectInputChange(ev) {
        const key = ev.target.name 
        const value = ev.target.value
        updateProjectInputs(key, value)
    }

    function onProjectAction(ev) {
        const action = ev.target.name
        const options = {
            "cadastrar": () => {
                projectRegister(projectInputs)
            },
            "editar": () => {
                projectEdit(projectInputs)
            },
            "remover": () => {
                projectRemove(projectInputs)
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action == key) {
                value()
            }
        }
        setUpdateProjects(1)
    }


    useEffect(() => {
        api.get('/projetos')
            .then((response) => {
                setProjects(response["data"])
                setUpdateProjects(0)
            })
    }, [updateProjects])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <label className={styles.label}>GERENCIADOR DE PROJETOS</label>
                </header>
                <main className={styles.main}>
                    <div className={styles.menu}>
                        <Button
                            text="Abrir"
                            name="abrir"
                            width="80px"
                            onClick={onOpenProject}
                        />
                        <LineEditText
                            text="Nome do Projeto:"
                            type="text"
                            name="nome"
                            width="100px"
                            onChange={onProjectInputChange}
                        />
                        <Button
                            text="Criar"
                            name="cadastrar"
                            width="80px"
                            onClick={onProjectAction}
                        />
                        <Button
                            text="Renomear"
                            name="editar"
                            width="80px"
                            onClick={onProjectAction}
                        />
                        <Button
                            text="Excluir"
                            name="remover"
                            width="80px"
                            onClick={onProjectAction}
                        />
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
                                                projectInputs["selected_name"] === project["name"] ? styles.selected : styles.trBody
                                            }   
                                            key={"row-"+i}
                                        >
                                            <td
                                                key={"col-1"}
                                                className={styles.td}
                                                onClick={() => updateProjectInputs("selected_name", project["name"])}
                                            >
                                                <label>{project["name"]}</label>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProjectManager