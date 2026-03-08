import React, { useState } from "react";
import SearchProduct from "./components/searchForm";
import ProductList from "./components/productTable";
import MenuEvent from "./components/menuEvent";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  //banco de Dados (entre aspas)
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "leite",
      price: "4,00",
      dataFab: "18/02/2026",
      dataVal: "25/02/2026",
      isConferied: false,
    },
    {
      id: 2,
      nome: "arroz",
      price: "10,00",
      dataFab: "10/03/2026",
      dataVal: "25/04/2026",
      isConferied: false,
    },
  ]);

  // Adiciona um novo Produto
  const newProduct = (nome, price, dataFab, dataVal) => {
    if (!nome || !price || !dataFab || !dataVal) return;

    const dFabBR = dataFab.split("-").reverse().join("/");
    const dValBR = dataVal.split("-").reverse().join("/");

    // 2. Verifica se já existe um produto com ESSE NOME na lista
    const produtoExistente = produtos.find(
      (p) => p.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (produtoExistente) {
      // 3. Se o nome existe e o preço é diferente, atualizamos apenas esse produto
      if (produtoExistente.price !== price) {
        const listaAtualizada = produtos.map((item) => {
          // Comparamos pelo NOME, pois o ID do 'newProd' é novo e não existe na lista ainda
          if (item.nome.toLowerCase() === nome.toLowerCase()) {
            return { ...item, price: price, dataFab: dFabBR, dataVal: dValBR };
          }
          return item;
        });

        return setProdutos(listaAtualizada);
      }

      // Se o nome e o preço forem iguais, não fazemos nada (evita duplicados idênticos)
      return;
    }

    // 4. Se o nome NÃO existe na lista, criamos um do zero
    const newProd = {
      id: uuidv4(),
      nome,
      price,
      dataFab: dFabBR,
      dataVal: dValBR,
      isConferied: false,
    };

    setProdutos([...produtos, newProd]);
  };

  // Filtro de pesquisa
  const [termoBusca, setTermoBusca] = useState("");

  const productFilter = produtos.filter(
    (prod) =>
      prod.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      prod.price.toLowerCase().includes(termoBusca.toLowerCase()),
  );

  // Filtro para qual tipo de pesquisar você quer
  const [nomeChecked, setNomeChecked] = useState(true);
  const [priceChecked, setPriceChecked] = useState(false);

  return (
    <main>
      <header>
        <h1>ProductList</h1>
      </header>
      <menu>
        <MenuEvent
          newProduct={newProduct}
          setPrice={setPriceChecked}
          setNome={setNomeChecked}
        />
      </menu>

      <section>
        <SearchProduct
          setBusca={setTermoBusca}
          priceChecked={priceChecked}
          nomeChecked={nomeChecked}
        />
      </section>

      <article>
        <nav>
          <ul className="product-grid">
            <li>nome</li>
            <li>preço</li>
            <li>Data de Fabricação</li>
            <li>validade</li>
          </ul>
        </nav>
        {productFilter.map((prods) => (
          <ProductList key={prods.id} produtos={prods} />
        ))}
      </article>
    </main>
  );
}
