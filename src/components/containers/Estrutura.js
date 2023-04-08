import Label from '../form/Label'
import Loader from '../form/Loader'

import FundacaoDefinir from './Estrutura/FundacaoDefinir'
import FundacaoAcoes from './Estrutura/FundacaoAcoes'

import styles from './Estrutura.module.css'

function Estrutura({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, entradasEstrutura, dadosGeotecnia, mudarEntradasGeotecnia, mudarEntradasEstrutura }) {
    return (
        <div className={styles.grid}>
            <nav>
                <FundacaoDefinir
                    classeFundacao={classeFundacao}
                    setClasseFundacao={setClasseFundacao}
                    setMetodoGeotecnia={setMetodoGeotecnia}
                    setEsforcoGeotecnia={setEsforcoGeotecnia}
                    mudarEntradasGeotecnia={mudarEntradasGeotecnia} 
                />
            </nav>
            <header>
                <FundacaoAcoes
                        dadosGeotecnia={dadosGeotecnia}
                        entradasGeotecnia={entradasGeotecnia}
                        entradasEstrutura={entradasEstrutura}
                        mudarEntradasEstrutura={mudarEntradasEstrutura}
                />
                <br></br>
                <strong> <Label text="ORIENTAÇÕES:" /> </strong>
                <p>1 - Selecione o tipo de solo e um valor de Nspt e aperte em Cadastrar;</p>
                <p>2 - Se necessário fazer alguma alteração, selecione uma camada já cadastrada e utilize os botões Editar ou Remover;</p>
                <p>3 - Selecione um tipo de fundação assim como as suas dimensões e aperte em Calcular;</p>
                <p>4 - Para ver o resultado referente a outro método de cálculo, basta selecioná-lo em MÉTODOS</p>
                <p>5 - Selecione qual a profundidade que você deseja apoiar a base da sua fundação e clique em Gerar Memorial;</p>
                <p>6 - Por fim, responda o nosso rápido formulário para contribuir com o desenvolvimento dessa aplicação!</p>
                <a href="https://forms.gle/1hveTViQLhUxR1Xu9">Clique aqui para abrir o formulário</a>
                <br></br>
                <strong> <Label text="OBSERVAÇÕES:" /> </strong>
                <p>Essa aplicação ainda está em desenvolvimento, sendo assim, ela não deve ser utilizada para resolução de problemas em um caso real</p>
                <br></br>
                <strong> <Label text="Agradecemos pela sua contribuição!" /> </strong>
            </header>
        </div>
    )
}

export default Estrutura