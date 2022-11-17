import { useState, useEffect } from "react";
import axios from "axios";

import Button from "../form/Button";
import Label from "../form/Label";
import LineEdit from "../form/LineEdit";
import Radio from "../form/Radio";
import Select from "../form/Select";
import Tab from "../form/Tab";
import Table from "../form/Table";

import styles from "./Sondagem.module.css";
import { useFoundationStore } from "../stores/foundationStore";

import areia from "../data/areia.json";
import argila from "../data/argila.json";
import silte from "../data/silte.json";

const initialCamada = {
  "#": "",
  solo: "Areia",
  nspt: 0,
};

const initialDadosEntrada = {
  tipo: "Franki",
  dimensao_1: 0,
  dimensao_2: 0,
};

function Sondagem() {
  const fundacao = useFoundationStore((store) => store.type);

  console.log(fundacao);

  // Configurações dos Radios e Selects
  const [solo, setSolo] = useState("areia");
  const [solos, setSolos] = useState(areia);

  function changeSolos(ev) {
    const id = ev.target.id;
    const solos = {
      areia: areia,
      argila: argila,
      silte: silte,
    };
    for (const [key, value] of Object.entries(solos)) {
      if (id === key) {
        var solosSelect = value;
      }
    }
    setSolo(id);
    setSolos(solosSelect);
    setCamada({ ...camada, solo: solosSelect[0] });
  }

  // Atualiza json initialCamada toda vez que o input muda
  const [camada, setCamada] = useState(initialCamada);

  function updateCamada(ev) {
    const { name, value } = ev.target;

    setCamada({ ...camada, [name]: value });
  }

  // Manipulação da tabela (CADATRAR/EDITAR/REMOVER)
  const [selectedRow, setSelectedRow] = useState();

  function changeCamadas(ev) {
    ev.preventDefault();
    const name = ev.target.name;
    const options = {
      cadastrar: () => {
        let count = data.length;
        camada["#"] = count + 1;
        axios.post("/sondagem/cadastrar", camada);
      },
      editar: () => {
        if (typeof selectedRow === "string") {
          camada["#"] = Number(selectedRow);
          axios.post("/sondagem/editar", camada);
        }
      },
      remover: () => {
        if (typeof selectedRow === "string") {
          camada["#"] = Number(selectedRow);
          axios.post("/sondagem/remover", camada);
        }
      },
    };
    for (const [key, value] of Object.entries(options)) {
      if (name === key) {
        value();
      }
    }
    setUpdateTable(1);
    setCalculo(0);
  }

  // Configuração dos Radios e Selects
  const [metodo, setMetodo] = useState("aoki-velloso");
  const [tipos, setTipos] = useState([
    "Franki",
    "Metálica",
    "Pré-moldada",
    "Escavada",
    "Raiz",
    "Hélice contínua",
    "Barrete",
    "Ômega",
  ]);

  function changeFundacao(tipoFundacao) {
    const metodos = {
      estacas: [
        "Franki",
        "Metálica",
        "Pré-moldada",
        "Escavada",
        "Raiz",
        "Hélice contínua",
        "Barrete",
        "Ômega",
      ],
      sapatas: ["Sapata retangular", "Sapata circular"],
      tubulao: ["Tubulão"],
    };
    for (const [key, value] of Object.entries(metodos)) {
      if (tipoFundacao === key) {
        setTipos(value);
        break;
      }
    }
    console.log(tipoFundacao);
    // Mudar métodos e adicionar LN + decimal para sapatas
  }

  const [secondDimension, setSecondDimension] = useState();

  function changeTipo(ev) {
    const tipo = ev.target.value;
    const secoes = {
      "estaca circular": [
        [
          "Franki",
          "Pré-moldada",
          "Escavada",
          "Raiz",
          "Hélice contínua",
          "Ômega",
        ],
        undefined,
      ],
      "estaca retangular": [["Metálica", "Barrete"], 1],
      "sapata circular": [["Sapata circular"], undefined],
      "sapata retangular": [["Sapata retangular"], 1],
      tubulao: [["Tubulão"], 1],
    };
    for (const [key, value] of Object.entries(secoes)) {
      for (const element of value[0]) {
        if (tipo === element) {
          setSecondDimension(value[1]);
          break;
        }
      }
    }
  }

  // Atualiza obj initial DadosEntrada toda vez que o input muda
  const [dadosEntrada, setDadosEntrada] = useState(initialDadosEntrada);

  function updateDadosEntrada(ev) {
    const { name, value } = ev.target;

    setDadosEntrada({ ...dadosEntrada, [name]: value });
  }

  //MANIPULAÇÃO DA TABELA (CALCULAR)
  function calcular(ev) {
    ev.preventDefault();
    axios.post("/sondagem/calcular", dadosEntrada);
    setUpdateTable(1);
    setCalculo(1);
  }

  // Fazendo request de api e setando data para mostrar na interface
  const [data, setData] = useState([{}]);
  const [updateTable, setUpdateTable] = useState(0);
  const [calculo, setCalculo] = useState(0);

  // Navegando nas tabs da tabela
  const [esforco, setEsforco] = useState("compressao");

  useEffect(() => {
    axios.get("/sondagem").then((response) => {
      if (calculo === 1) {
        response.data["sondagens"].forEach((element, index) => {
          element["lateral"] =
            response.data["resultados"]["aoki-velloso"][index]["lateral"];
          element["ponta"] =
            response.data["resultados"]["aoki-velloso"][index]["ponta"];
          element["c. rup. (kN)"] =
            response.data["resultados"]["aoki-velloso"][index]["c. rup. (kN)"];
          element["c. adm. (kN)"] =
            response.data["resultados"]["aoki-velloso"][index]["c. adm. (kN)"];
        });
      } else {
        response.data["sondagens"].forEach((element, index) => {
          element["lateral"] = "";
          element["ponta"] = "";
          element["c. rup. (kN)"] = "";
          element["c. adm. (kN)"] = "";
        });
      }

      setData(response.data["sondagens"]);
      setUpdateTable(0);
      changeFundacao(fundacao["fundacao"]);
    });
  }, [updateTable, calculo, fundacao]);

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
                checked={solo === "areia"}
                onChange={changeSolos}
              />
              <Radio
                text="Argila"
                id="argila"
                name="solos"
                checked={solo === "argila"}
                onChange={changeSolos}
              />
              <Radio
                text="Silte"
                id="silte"
                name="solos"
                checked={solo === "silte"}
                onChange={changeSolos}
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
                onClick={changeCamadas}
              />
              <Button
                text="Editar"
                name="editar"
                width="70px"
                onClick={changeCamadas}
              />
              <Button
                text="Remover"
                name="remover"
                width="100px"
                onClick={changeCamadas}
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
                onChange={() => {
                  setMetodo("aoki-velloso");
                  setCalculo(0);
                }}
              />
            </div>
            <div className={styles.step}>
              <Radio
                text="Decourt-Quaresma"
                id="decourt"
                name="metodo"
                checked={metodo === "decourt-quaresma"}
                onChange={() => {
                  setMetodo("decourt-quaresma");
                  setCalculo(0);
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
                onChange={(ev) => {
                  updateDadosEntrada(ev);
                  changeTipo(ev);
                }}
              />
            </div>
            <div className={styles.step}>
              {!secondDimension && (
                <LineEdit
                  text="Diâmetro="
                  type="number"
                  name="dimensao_1"
                  width="50px"
                  onChange={updateDadosEntrada}
                />
              )}
              {secondDimension && (
                <>
                  <LineEdit
                    text="L="
                    type="number"
                    name="dimensao_1"
                    width="50px"
                    onChange={updateDadosEntrada}
                  />
                  <LineEdit
                    text="B="
                    type="number"
                    name="dimensao_2"
                    width="50px"
                    onChange={updateDadosEntrada}
                  />
                </>
              )}
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
          checked={esforco === "compressao"}
          onChange={(ev) => {
            setEsforco(ev.target.id);
          }}
        />
        <Tab
          text="Tração"
          id="tracao"
          name="tabelas"
          checked={esforco === "tracao"}
          onChange={(ev) => {
            setEsforco(ev.target.id);
          }}
        />
      </nav>
      <section>
        <Table data={data} onChange={(ev) => setSelectedRow(ev.target.id)} />
      </section>
    </div>
  );
}

export default Sondagem;
