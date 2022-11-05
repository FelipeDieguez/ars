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
    "solo": "Areia",
    "nspt": 0
}

const initialDadosEntrada = {
    "tipo": "Franki",
    "dimensao_1": 0,
    "dimensao_2": 0
}

function Sondagem() {
    // Atualiza obj initial Camada toda vez que o input muda
    const [camada, setCamada] = useState(initialCamada)

    function updateCamada(ev) {
        const { name, value } = ev.target
        
        setCamada({ ...camada, [name]: value })
    }

    // Configurações dos Radios e Selects
    const areias = ["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"]
    const argilas = ["Argila", "Argila arenosa", "Argila areno-siltosa", "Argila siltosa", "Argila silto-arenosa"]
    const siltes = ["Silte", "Silte arenoso", "Silte areno-argiloso", "Silte argiloso", "Silte argilo-arenoso"]
    const [solo, setSolo] = useState("Areia")
    const [solos, setSolos] = useState(areias)

    // Fazendo request de api e setando data para mostrar na interface
    const [data, setData] = useState([{}])
    const [updateTable, setUpdateTable] = useState(0)
    const [calculo, setCalculo] = useState(0)
    
    useEffect(() => {
        axios.get('/sondagem')
            .then((response) => {
                if (calculo === 1) {
                    response.data["sondagens"].forEach((element, index) => {
                        element["lateral"] = response.data["resultados"]["aoki-velloso"][index]["lateral"]
                        element["ponta"] = response.data["resultados"]["aoki-velloso"][index]["ponta"]
                        element["c. rup. (kN)"] = response.data["resultados"]["aoki-velloso"][index]["c. rup. (kN)"]
                        element["c. adm. (kN)"] = response.data["resultados"]["aoki-velloso"][index]["c. adm. (kN)"]
                    })
                }
                else {
                    response.data["sondagens"].forEach((element, index) => {
                        element["lateral"] = ""
                        element["ponta"] = ""
                        element["c. rup. (kN)"] = ""
                        element["c. adm. (kN)"] = ""
                    })
                }
                
                setData(response.data["sondagens"])
                setUpdateTable(0)
            })
    }, [updateTable, calculo])

    // MANIPULAÇÃO DA TABELA (CADATRAR/EDITAR/REMOVER)
    function cadastrar(ev) {
        ev.preventDefault()
        let count = data.length
        camada["#"] = count + 1
        axios.post('/sondagem/cadastrar', camada)
        setUpdateTable(1)
        setCalculo(0)
    }

    const [selectedRow, setSelectedRow] = useState()

    function editar(ev) {
        ev.preventDefault()
        if (typeof selectedRow === "string") {
            camada["#"] = Number(selectedRow)
            axios.post('/sondagem/editar', camada)
            setUpdateTable(1)
            setCalculo(0)
        }
    }
    
    function remover(ev) {
        ev.preventDefault()
        if (typeof selectedRow === "string") {
            camada["#"] = Number(selectedRow)
            axios.post('/sondagem/remover', camada)
            setUpdateTable(1)
            setCalculo(0)
        }
    } 

    // Atualiza obj initial DadosEntrada toda vez que o input muda
    const [dadosEntrada, setDadosEntrada] = useState(initialDadosEntrada)

    function updateDadosEntrada(ev) {
        const { name, value } = ev.target

        setDadosEntrada({ ...dadosEntrada, [name]: value })
    }

    //Configuração dos Radios e Selects
    const [metodo, setMetodo] = useState("aoki-velloso")
    const tipos = ["Franki", "Metálica", "Pré-moldada", "Escavada", "Raiz", "Hélice contínua", "Barrete", "Ômega"]

    //MANIPULAÇÃO DA TABELA (CALCULAR)
    function calcular(ev) {
        ev.preventDefault()
        axios.post('/sondagem/calcular', dadosEntrada)
        setUpdateTable(1)
        setCalculo(1)
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
                                checked={solo === "Areia"}
                                onChange={() => { setSolo("Areia")
                                                setSolos(areias)
                                                setCamada({ ...camada, "solo": areias[0] })
                                                }}
                            />
                            <Radio
                                text="Argila"
                                id="argila"
                                name="solos"
                                checked={solo === "Argila"}
                                onChange={(e) => { setSolo("Argila")
                                                setSolos(argilas)
                                                setCamada({ ...camada, "solo": argilas[0] })
                                                }}
                            />
                            <Radio
                                text="Silte"
                                id="silte"
                                name="solos"
                                checked={solo === "Silte"}
                                onChange={(e) => { setSolo("Silte")
                                                setSolos(siltes)
                                                setCamada({ ...camada, "solo": siltes[0] })
                                                }}
                            />
                        </div>
                        <div className={styles.step}>
                            <Select
                                text="Solo:"
                                name="solo"
                                list={solos}
                                width="160px"
                                onChange={updateCamada}
                            />
                            <LineEdit
                                text="Nspt="
                                type="number"
                                name="nspt"
                                width="50px"
                                onChange={updateCamada}
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
                                name="metodo"
                                checked={metodo === "aoki-velloso"}
                                onChange={() => { setMetodo("aoki-velloso") 
                                                setCalculo(0)
                                                }}
                            />
                        </div>
                        <div className={styles.step}>
                            <Radio
                                text="Decourt-Quaresma"
                                id="decourt"
                                name="metodo"
                                checked={metodo === "decourt-quaresma"}
                                onChange={() => { setMetodo("decourt-quaresma") 
                                                setCalculo(0)
                                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <Select
                                text="Tipo:"
                                name="tipo"
                                list={tipos}
                                width="135px"
                                onChange={updateDadosEntrada}
                            />
                        </div>
                        <div className={styles.step}>
                            <LineEdit
                                text="Diâmetro="
                                type="number"
                                name="dimensao_1"
                                width="50px"
                                onChange={updateDadosEntrada}
                            />
                        </div>
                        <div className={styles.step}>
                            <Button
                                text="Calcular"
                                name="calcular"
                                width="80px"
                                onClick={calcular}
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