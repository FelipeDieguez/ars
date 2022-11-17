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

function Fundacao() {
  const setFoundation = useFoundationStore((store) => store.setFoundation);

  return (
    <div className={styles.grid}>
      <nav>
        <Tab
          text="ESTACAS"
          id="estacas"
          name="fundacoes"
          onChange={() => {
            setFoundation("estacas");
          }}
        />
        <Tab
          text="SAPATAS"
          id="sapatas"
          name="fundacoes"
          onChange={() => {
            setFoundation("sapatas");
          }}
        />
        <Tab
          text="TUBULÃO"
          id="tubulao"
          name="fundacoes"
          onChange={() => {
            setFoundation("tubulao");
          }}
        />
      </nav>
    </div>
  );
}

export default Fundacao;
