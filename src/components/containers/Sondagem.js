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
    "solos": "",
    "nspt": ""
}

function Sondagem() {
    // Definindo useState do radio button que irá mudar o array do select
    const [radio, setRadio] = useState(["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"])

    // Fazendo request para api a fim de encontrar os dados para mostrar na tabela
    const [data, setData] = useState([{}])
    
    useEffect(() => {
        axios.get('http://localhost:5000/sondagens')
            .then((response) => {
                setData(response.data)
        })
    }, [])
    
    // Atualizando values toda vez que um input é alterado 
    const [values, setValues] = useState(initialCamada)

    function onChange(ev) {
        const { name, value } = ev.target
        
        setValues({ ...values, [name]: value })
    }

    // Enviando dados para api e atualizando visualização da tabela
    function onClick(ev) {
        ev.preventDefault()
        axios.post('http://localhost:5000/sondagens', values)
            .then(
                axios.get('http://localhost:5000/sondagens')
                    .then((response) => {
                        setData(response.data)
                })
        )
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
                                name="solos"
                                onChange={() => { setRadio(["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"]) }}
                                id="areia"
                            />
                            <Radio
                                text="Argila"
                                name="solos"
                                onChange={(e) => { setRadio(["Argila", "Argila arenosa", "Argila areno-siltosa", "Argila siltosa", "Argila silto-arenosa"]) }}
                                id="argila"
                            />
                            <Radio
                                text="Silte"
                                name="solos"
                                onChange={(e) => { setRadio(["Silte", "Silte arenoso", "Silte areno-argiloso", "Silte argiloso", "Silte argilo-arenoso"]) }}
                                id="silte"
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
                                width="100px"
                                id="cadastrar"
                                onClick={onClick}
                            />
                            <Button
                                text="Editar"
                                width="70px"
                                id="editar"
                            />
                            <Button
                                text="Remover"
                                width="100px"
                                id="remover"
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
                                name="metodos"
                                id="aoki"
                            />
                        </div>
                        <div className={styles.step}>
                            <Radio
                                text="Decourt-Quaresma"
                                name="metodos"
                                id="decourt"
                            />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <Select
                                text="Tipo:"
                                list={["Franki", "Metálica", "Pré-moldada", "Escavada", "Raiz", "Hélice contínua", "Barrete", "Ômega"]}
                                width="135px"
                                id="tipos"
                            />
                        </div>
                        <div className={styles.step}>
                            <LineEdit
                                type="number"
                                text="Diâmetro="
                                width="50px"
                                id="dimensao_1"
                            />
                        </div>
                        <div className={styles.step}>
                            <Button
                                text="Calcular"
                                width="80px"
                                id="calcular"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <Tab 
                    text="Compressão" 
                    name="tabelas"
                    id="compressao"
                />
                <Tab 
                    text="Tração"
                    name="tabelas"
                    id="tracao"
                />
            </nav>
            <section>
                <Table data={data} />
            </section>
        </div>
    )
}

export default Sondagem