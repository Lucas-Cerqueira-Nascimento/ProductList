import { useState } from "react";

// Filter.jsx
export default function Filter({ setPrice, setNome }) {
  const [nomeChecked, setNomeChecked] = useState(true);
  const [priceChecked, setPriceChecked] = useState(false);

  // Criar o sistema de pesquisa por preço!

  return (
    <div className="Filter">
      <label>Nome</label>
      <input
        type="checkbox"
        checked={nomeChecked}
        onChange={(e) => {
          const val = e.target.checked;
          setNomeChecked(val);
          setNome(val);
        }}
        id="NomeCheckBox"
      />
      <label>Preço</label>
      <input
        type="checkbox"
        checked={priceChecked}
        onChange={(e) => {
          const val = e.target.checked;
          setPriceChecked(val);
          setPrice(val); // Atualiza o pai apenas no clique
        }}
        id="PriceCheckBox"
      />
    </div>
  );
}
