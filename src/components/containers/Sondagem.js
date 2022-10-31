import { useState, useEffect } from 'react'
import axios from 'axios'

import Button from '../form/Button'
import Label from '../form/Label'
import LineEdit from '../form/LineEdit'
import Radio from '../form/Radio'
import Select from '../form/Select'
import Tab from '../form/Tab'
import Table from '../form/Table'

import styles from './Sondagem.module.css'

const initialCamada = {
    "#": "",
    "solos": "",
    "nspt": ""
}

function Sondagem() {
    // Definindo useState do radio button que irá mudar o array do select
    const [radio, setRadio] = useState([])

    // Fazendo request de api e setando data para mostrar na interface (essa função no começo e toda vez que data é alterado)
    // Onde data está sendo alterado fora dessa função???? 
    const [data, setData] = useState([{}])
    
    useEffect(() => {
        axios.get('/sondagem')
            .then((response) => {
                setData(response.data["sondagens"])
            })
    }, [])
    
    // Atualiza obj initial Camada toda vez que o input muda
    const [values, setValues] = useState(initialCamada)

    function onChange(ev) {
        const { name, value } = ev.target
        
        setValues({ ...values, [name]: value })
    }

    // DEFININDO FUNÇÕES DE BOTÕES
    // Enviando obj initial Camada com valores preenchidos para api
    function cadastrar(ev) {
        ev.preventDefault()
        let count = data.length
        values["#"] = count + 1
        console.log(values)
        axios.post('/sondagem/cadastrar', values)
    }

    const [selectedRow, setSelectedRow] = useState()

    // Se tiver uma linha selecionada, mandar informação # da linha e dos novos solo e nspt
    function editar(ev) {
        ev.preventDefault()
        if (typeof selectedRow === "string") {
            values["#"] = Number(selectedRow)
            console.log(values)
            axios.post('/sondagem/editar', values)
        }
    }
    
    // Se tiver uma linha selecionada, mandar informação # da linha para excluir
    function remover(ev) {
        ev.preventDefault()
        if (typeof selectedRow === "string") {
            values["#"] = Number(selectedRow)
            console.log(values)
            axios.post('/sondagem/remover', values)
        }
    } 

    return (
        <div className={styles.grid}>
            <header>
                <Label text="SONDAGEM:" />
                <div className={styles.stepsContainer}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <Radio
                                text="Areia"
                                id="areia"
                                name="solos"
                                onChange={() => { setRadio(["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"]) }}
                            />
                            <Radio
                                text="Argila"
                                id="argila"
                                name="solos"
                                onChange={(e) => { setRadio(["Argila", "Argila arenosa", "Argila areno-siltosa", "Argila siltosa", "Argila silto-arenosa"]) }}
                            />
                            <Radio
                                text="Silte"
                                id="silte"
                                name="solos"
                                onChange={(e) => { setRadio(["Silte", "Silte arenoso", "Silte areno-argiloso", "Silte argiloso", "Silte argilo-arenoso"]) }}
                            />
                        </div>
                        <div className={styles.step}>
                            <Select
                                text="Solo:"
                                name="solos"
                                list={radio}
                                width="160px"
                                onChange={onChange}
                            />
                            <LineEdit
                                text="Nspt="
                                type="number"
                                name="nspt"
                                width="50px"
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.step}>
                            <Button
                                text="Cadastrar"
                                name="cadastrar"
                                width="100px"
                                onClick={cadastrar}
                            />
                            <Button
                                text="Editar"
                                name="editar"
                                width="70px"
                                onClick={editar}
                            />
                            <Button
                                text="Remover"
                                name="remover"
                                width="100px"
                                onClick={remover}
                            />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <Label text="MÉTODOS" />
                        </div>
                        <div className={styles.step}>
                            <Radio
                                text="Aoki-Velloso"
                                id="aoki"
                                name="metodos"
                            />
                        </div>
                        <div className={styles.step}>
                            <Radio
                                text="Decourt-Quaresma"
                                id="decourt"
                                name="metodos"
                            />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <Select
                                text="Tipo:"
                                name="tipos"
                                list={["Franki", "Metálica", "Pré-moldada", "Escavada", "Raiz", "Hélice contínua", "Barrete", "Ômega"]}
                                width="135px"
                            />
                        </div>
                        <div className={styles.step}>
                            <LineEdit
                                text="Diâmetro="
                                type="number"
                                name="dimensao_1"
                                width="50px" 
                            />
                        </div>
                        <div className={styles.step}>
                            <Button
                                text="Calcular"
                                name="calcular"
                                width="80px"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <Tab 
                    text="Compressão"
                    id="compressao"
                    name="tabelas"
                />
                <Tab 
                    text="Tração"
                    id="tracao"
                    name="tabelas"
                />
            </nav>
            <section>
                <Table data={data} 
                    onChange={
                        (ev) => setSelectedRow(ev.target.id)
                        }
                />
            </section>
        </div>
    )
}

export default Sondagem