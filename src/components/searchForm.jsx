import { useState } from "react";

// Componente filho de Pesquisa
export default function SearchProduct({ setBusca, priceChecked, nomeChecked }) {
  const [searchLocal, setSearchLocal] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    setBusca(searchLocal.toLowerCase());
  };

  return (
    <form onSubmit={handleSearch}>
      {nomeChecked && (
        <input
          type="text"
          placeholder="Nome do Produto"
          style={{ textAlign: "center" }}
          onChange={(e) => setSearchLocal(e.target.value)}
        />
      )}

      {priceChecked && (
        <input
          type="text"
          placeholder="Preço do Produto"
          style={{ textAlign: "center" }}
          onChange={(e) => setSearchLocal(e.target.value)}
        />
      )}
      <button>Buscar</button>
    </form>
  );
}
