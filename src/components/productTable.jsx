// component Filho q mostra os Itens ná lista
export default function ProductList({ produtos }) {
  const { id, nome, price, dataVal, dataFab } = produtos;
  return (
    <div>
      {produtos && (
        <ul key={id} className="product-grid product-row">
          <li>{nome}</li>
          <li>{price}</li>
          <li>{dataVal}</li>
          <li>{dataFab}</li>
        </ul>
      )}
    </div>
  );
}
