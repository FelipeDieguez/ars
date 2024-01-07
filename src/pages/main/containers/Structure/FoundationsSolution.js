import { TabList, Tabs, Tab, Input, Text, Select, Button } from '@chakra-ui/react'

import foundationTypes from "../../utils/data/foundationTypes.json"
import geotechnicsMethods from "../../utils/data/geotechnicsMethods.json"
import styles from '../Structure.module.css'

function FoundationsSolution({ foundationClass, setFoundationClass, updateGeotechnicsInputs }) {
    function onFoundationClassChange(ev) {
        const foundation_type = ev.target.id
        setFoundationClass(foundation_type)
        updateGeotechnicsInputs("metodo", geotechnicsMethods[foundation_type])
        updateGeotechnicsInputs("tipo", foundationTypes[foundation_type][0])
        updateGeotechnicsInputs("esforco", "compressao")
    }

    return (
        <>
            <div className={styles.secondTitle}>
                FUNDAÇÕES:
            </div>
            <div className={styles.nav}>
                <Tabs size='sm' variant='enclosed'>
                    <TabList>
                        <Tab
                            name='estacas'
                            // onClick={}
                            fontSize='md'
                        >
                            ESTACAS
                        </Tab>
                        <Tab
                            name='sapatas'
                            // onClick={}
                            fontSize='md'
                        >
                            SAPATAS
                        </Tab>
                        <Tab
                            name='tubuloes'
                            // onClick={}s
                            fontSize='md'
                        >
                            TUBULÃO
                        </Tab>
                    </TabList>
                </Tabs>
            </div>
            <div className={styles.section}>
                <div className={styles.containerRow}>
                    <div className={styles.containerColumn} style={{ width: '50%', margin: '0px 10px 0px 0px' }}>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                ESFORÇOS:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>Nd= 0 kN</Text>
                            <Text fontSize='md'>Mx= 0 kNm</Text>
                            <Text fontSize='md'>My= 0 kNm</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>L(m)=</Text>
                                <Input
                                    name='dimensao_1'
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault()}
                                        }
                                    }
                                    // onChange={}
                                    width='50px'
                                    size='xs'
                                    fontSize='md'
                                />
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>Nº de estacas=</Text>
                                <Select
                                    name='column'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>1</option>
                                </Select>
                            </div>
                            <Button
                                name="calculate_1"
                                width="120px"
                                // onClick={}
                                colorScheme='blue'
                                size='sm'
                                fontSize='sm'
                            >
                                Calcular Comprimento
                            </Button>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>Compressão= 0 m</Text>
                            <Text fontSize='md'>Tração= 0 m</Text>
                            <div className={styles.step}>
                                <Text fontSize='md'>Adot.(m)=</Text>
                                <Select
                                    name='length'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>1</option>
                                </Select>
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                BLOCO:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>fck(MPa)=</Text>
                                <Select
                                    name='fck'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>25</option>
                                </Select>
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>fyk(MPa)=</Text>
                                <Select
                                    name='fyk'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>50</option>
                                </Select>
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>c(cm)=</Text>
                                <Input
                                    name='dimensao_c'
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault()}
                                        }
                                    }
                                    // onChange={}
                                    width='50px'
                                    size='xs'
                                    fontSize='md'
                                />
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>Ap(cm)=</Text>
                                <Input
                                    name='dimensao_ap'
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault()}
                                        }
                                    }
                                    // onChange={}
                                    width='50px'
                                    size='xs'
                                    fontSize='md'
                                />
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>Bp(cm)=</Text>
                                <Input
                                    name='dimensao_bp'
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault()}
                                        }
                                    }
                                    // onChange={}
                                    width='50px'
                                    size='xs'
                                    fontSize='md'
                                />
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>Ølong(mm)=</Text>
                                <Select
                                    name='arm_pil'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>10</option>
                                </Select>
                            </div>
                            
                        </div>
                        <div className={styles.stepRow} style={{ justifyContent: 'flex-end' }}>
                            <Button
                                name="calculate_2"
                                width="120px"
                                // onClick={}
                                colorScheme='blue'
                                size='sm'
                                fontSize='sm'
                            >
                                Calcular Bielas
                            </Button>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>z(cm)=</Text>
                                <Select
                                    name='z'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>40</option>
                                </Select>
                            </div>
                            <Text fontSize='md'>θ= 0º</Text>
                            <Text fontSize='md'>CTC:</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>C= 100 cm</Text>
                            <Text fontSize='md'>B= 0 cm</Text>
                            <Text fontSize='md'>H= 0 cm</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                ARMADURAS:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>As= 2.38 cm²</Text>
                            <div className={styles.step}>
                                <Text fontSize='md'>5Ø</Text>
                                <Select
                                    name='arm'
                                    // onChange={}
                                    variant='outline'
                                    w='70px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>6.3</option>
                                </Select>
                                <Text fontSize='md'>mm (0 cm²)</Text>
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>As,sup= 2.38 cm²</Text>
                            <div className={styles.step}>
                                <Text fontSize='md'>5Ø</Text>
                                <Select
                                    name='arm'
                                    // onChange={}
                                    variant='outline'
                                    w='70px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>6.3</option>
                                </Select>
                                <Text fontSize='md'>mm (0 cm²)</Text>
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>As,pele= 2.38 cm²</Text>
                            <div className={styles.step}>
                                <Text fontSize='md'>5Ø</Text>
                                <Select
                                    name='arm'
                                    // onChange={}
                                    variant='outline'
                                    w='70px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>6.3</option>
                                </Select>
                                <Text fontSize='md'>mm (0 cm²)</Text>
                            </div>
                        </div>
                        <div className={styles.stepRow} style={{ padding: '0px' }}>
                            <Text fontSize='md'>Asw= 2.38 cm²/m</Text>
                            <div className={styles.step}>
                                <Text fontSize='md'>Ø</Text>
                                <Select
                                    name='arm'
                                    // onChange={}
                                    variant='outline'
                                    w='70px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>5</option>
                                </Select>
                                <Text fontSize='md'>mm c/3cm (0 cm²/m)</Text>
                            </div>
                        </div>
                    </div>
                    <div className={styles.containerColumn} style={{ width: '50%' }}>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                ESTACA:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>fck(MPa)=</Text>
                                <Select
                                    name='fck'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>25</option>
                                </Select>
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>fyk(MPa)=</Text>
                                <Select
                                    name='fyk'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>50</option>
                                </Select>
                            </div>
                            <div className={styles.step}>
                                <Text fontSize='md'>c(cm)=</Text>
                                <Input
                                    name='dimensao_c'
                                    onKeyPress={(event) => {
                                        if (!/[0-9.]/.test(event.key)) {
                                            event.preventDefault()}
                                        }
                                    }
                                    // onChange={}
                                    width='50px'
                                    size='xs'
                                    fontSize='md'
                                />
                            </div>
                        </div>
                        <div className={styles.stepRow} style={{ justifyContent: 'flex-end' }}>
                            <Button
                                name="calculate_3"
                                width="120px"
                                // onClick={}
                                colorScheme='blue'
                                size='sm'
                                fontSize='sm'
                            >
                                Calcular
                            </Button>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                COMPRESSÃO:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>Rc= 0 kN</Text>
                            <Text fontSize='md'>As,min= 0 cm²</Text>
                            <Text fontSize='md'>As= 0 cm²</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                TRAÇÃO:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>Rt= 0 kN</Text>
                            <Text fontSize='md'>As= 0 cm²</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                ARMADURA LONGITUDINAL:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>5Ø</Text>
                                <Select
                                    name='arm'
                                    // onChange={}
                                    variant='outline'
                                    w='70px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>6.3</option>
                                </Select>
                                <Text fontSize='md'>mm (0 cm²)</Text>
                                </div>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.secondTitle}>
                                ARMADURA TRANSVERSAL:
                            </div>
                        </div>
                        <div className={styles.stepRow}>
                            <Text fontSize='md'>Ø5.0mm c/30cm</Text>
                        </div>
                        <div className={styles.stepRow}>
                            <div className={styles.step}>
                                <Text fontSize='md'>Comp. (m)= </Text>
                                <Select
                                    name='comprimento_armadura'
                                    // onChange={}
                                    variant='outline'
                                    w='60px'
                                    size='xs'
                                    fontSize='md'
                                    // value={}
                                >
                                    {/* {soilInvestigationList.map((name, i) => (
                                        <option key={i} value={name['py/tuple']}> {name['py/tuple']} </option>
                                    ))} */}
                                    <option>2</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoundationsSolution