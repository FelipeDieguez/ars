import { useState } from "react";

import Radio from "../form/Radio";

import areia from "../data/areia.json";
import argila from "../data/argila.json";
import silte from "../data/silte.json";

const solos = {
  areia: areia,
  argila: argila,
  silte: silte,
};

export default function SelectSolo({ setCamada, solo, setSolo }) {
  function changeSolos(ev) {
    const id = ev.target.id;

    setSolo(id);
    setCamada(solos[id][0]);
  }

  return (
    <div>
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
  );
}
