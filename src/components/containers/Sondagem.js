import {useState} from 'react'


import Button from '../form/Button'
import Label from '../form/Label'
import LineEdit from '../form/LineEdit'
import Radio from '../form/Radio'
import Select from '../form/Select'
import Tab from '../form/Tab'
import Table from '../form/Table'

import styles from './Sondagem.module.css'

function Sondagem() {
    const [radio, setRadio] = useState(["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"])

    const data = [
        {
            "solos": "Argila",
            "nspt": "10",
            "resistência Lateral": "50",
            "resistência Ponta": "30",
            "c. Rup. (kN)": "80",
            "c. Adm. (kN)": "40"
        },
        {
            "solos": "Areia",
            "nspt": "5",
            "resistência Lateral": "30",
            "resistência Ponta": "20",
            "c. Rup. (kN)": "50",
            "c. Adm. (kN)": "25"
        }
    ]

    return (
        <div className={styles.grid}>
            <div className={styles.gridSolos}>
                <div style={{"justifyContent":"flex-start"}}>
                    <Label text="SONDAGEM:"/>
                </div>
                <div>
                    <Radio
                        text="Areia"
                        name="solos"
                        onChange={()=>{ setRadio(["Areia", "Areia siltosa", "Areia silto-argilosa", "Areia argilosa", "Areia argilo-siltosa"]) }}
                        id="areia"
                    />
                    <Radio
                        text="Argila"
                        name="solos"
                        onChange={(e)=>{ setRadio(["Argila", "Argila arenosa", "Argila areno-siltosa", "Argila siltosa", "Argila silto-arenosa"]) }}
                        id="argila"
                    />
                    <Radio
                        text="Silte"
                        name="solos"
                        onChange={(e)=>{ setRadio(["Silte", "Silte arenoso", "Silte areno-argiloso", "Silte argiloso", "Silte argilo-arenoso"]) }}
                        id="silte"
                    />
                </div>
                <div>
                    <Select
                        text="Solo:"
                        list={radio}
                        width="160px"
                        id="solos"
                    />
                    <LineEdit
                        type="number"
                        text="Nspt="
                        width="50px"
                        id="nspt"
                    />
                </div>
                <div>
                    <Button
                        text="Cadastrar"
                        width="100px"
                        id="cadastrar"
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
            <div className={styles.gridMetodos}>
                <div>
                    <Label text="MÉTODOS" />
                </div>
                <div>
                    <Radio
                        text="Aoki-Velloso"
                        name="metodos"
                        id="aoki"
                    />
                </div>
                <div>
                    <Radio
                        text="Decourt-Quaresma"
                        name="metodos"
                        id="decourt"
                    />
                </div>
            </div>
            <div className={styles.gridDimensoes}>
                <div>
                    <Select
                        text="Tipo:"
                        list={["Franki", "Metálica", "Pré-moldada", "Escavada", "Raiz", "Hélice contínua", "Barrete", "Ômega"]}
                        width="135px"
                        id="tipos"
                    />
                </div>
                <div>
                    <LineEdit
                        type="number"
                        text="Diâmetro="
                        width="50px"
                        id="dimensao_1"
                    />
                </div>
                <div>
                    <Button
                        text="Calcular"
                        width="80px"
                        id="calcular"
                    />
                </div>
            </div>
        </div>
    )
}

export default Sondagem