import Label from '../form/Label'

import FundacaoTypeSet from './Fundacao/FundacaoTypeSet'

import styles from './Sondagem.module.css'

function Fundacao({ fundacao, setFundacao, setTipos, changeSondagemInput, changeFundacaoGeometry }) {
    return (
        <div className={styles.grid}>
            <nav>
                <FundacaoTypeSet fundacao={fundacao} setFundacao={setFundacao} setTipos={setTipos} changeSondagemInput={changeSondagemInput} changeFundacaoGeometry={changeFundacaoGeometry} />
            </nav>
        </div>
    )
}

export default Fundacao