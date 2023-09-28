import { useState, useEffect } from 'react'
import {listarProjetos, cadastrarProjeto, editarProjeto, removerProjeto} from '../services/projetos'

import Button from '../form/Button'
import LineEditText from '../form/LineEditText'

import styles from './GerenciadorProjetos.module.css'

function GerenciadorProjetos(dadosProjetos) {
    function mudancasProjetoAcoes(ev) {
        const acao = ev.target.name
        const opcoes = {
            "cadastrar": () => {
                cadastrarProjeto(dadosProjetos)
            },
            "editar": () => {
                editarProjeto(dadosProjetos)
            },
            "remover": () => {
                removerProjeto(dadosProjetos)
            }
        }
        for (const [key, value] of Object.entries(opcoes)) {
            if (acao == key) {
                value()
            }
        }
    }
    return (
        <div className={styles.page}>
            <header>
                <label>GERENCIADOR DE PROJETOS</label>
            </header>
            <main>
                <div className={styles.menu}>
                    <LineEditText
                        text="Nome do Projeto:"
                        type="text"
                        name="nome_projeto"
                        width="100px"
                    />
                    <Button
                        text="Criar"
                        name="cadastrar"
                        width="80px"
                        onClick={mudancasProjetoAcoes}
                    />
                    <Button
                        text="Renomear"
                        name="editar"
                        width="80px"
                        onClick={mudancasProjetoAcoes}
                    />
                    <Button
                        text="Excluir"
                        name="remover"
                        width="80px"
                        onClick={mudancasProjetoAcoes}
                    />
                </div>
                <div className={styles.section}>
                    <table>
                        <thead>
                            <tr>
                                <th>NOME</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default GerenciadorProjetos