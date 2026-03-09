import { ListPlus, ListFilter } from "lucide-react";
import { useState } from "react";
import AddProduct from "./Events/AddProduct";
import Filter from "./Events/Filter";
export default function MenuEvent({ newProduct, setPrice, setNome }) {
  const [openTabFilter, setOpenTabFilter] = useState(false);
  const [openTabAddProduct, setOpenTabAddProduct] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpenTabFilter((prev) => !prev)}
        title="filter"
        id="Filter"
      >
        <ListFilter />
      </button>
      <div className="FilterContent">
        {openTabFilter && <Filter setPrice={setPrice} setNome={setNome} />}
      </div>

      <button
        onClick={() => setOpenTabAddProduct((prev) => !prev)}
        title="Add new Product"
        id="AddnewProduct"
      >
        <ListPlus />
      </button>
      {openTabAddProduct && (
        <AddProduct
          tab={() => setOpenTabAddProduct((prev) => !prev)}
          newProduct={newProduct}
        />
      )}
    </div>
  );
}
