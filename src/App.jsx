import React, { useState } from "react";
import SearchProduct from "./components/searchForm";
import ProductList from "./components/productTable";
import MenuEvent from "./components/menuEvent";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export default function App() {
  //Zustand
  const useProductStore = create(
    persist((set) => ({
      produtos: [],

      addProduct: (newProd) => {
        set((state) => ({ produtos: [...state.produtos, newProd] }));
      },

      updatePrice: (nome, novoPreco, dataFab, dataVal) =>
        set((state) => ({
          produtos: state.produtos.map((p) =>
            p.nome === nome
              ? { ...p, price: novoPreco, dataFab: dataFab, dataVal: dataVal }
              : p,
          ),
        })),
    })),
  );

  const { produtos, addProduct, updatePrice } = useProductStore();

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
      return updatePrice(nome, price, dFabBR, dValBR);
    } else {
      // Se o nome NÃO existe na lista, criamos um do zero
      const newProd = {
        id: uuidv4(),
        nome,
        price,
        dataFab: dFabBR,
        dataVal: dValBR,
        isConferied: false,
      };

      return addProduct(newProd);
    }
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
