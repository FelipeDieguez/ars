import { useState } from "react";

import Sondagem from "../containers/Sondagem";
import Fundacao from "../containers/Fundacao";

import styles from "./FundArs.module.css";

function FundArs() {
  return (
    <div className={styles.page}>
      <Sondagem></Sondagem>
      <Fundacao></Fundacao>
    </div>
  );
}

export default FundArs;
