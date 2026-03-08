import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { useForm } from "react-hook-form";
import z from "zod";

export default function AddProduct({ tab, newProduct }) {
  const Schema = z.object({
    product: z.string().trim().min(1, "O nome é obrigatório"),
    price: z
      .string()
      .min(1, "O preço é obrigatório")
      .regex(/^\d+,\d{2}$/, "Use o formato 0,00 (com vírgula e dois centavos)"),
    DataFab: z.string().min(1, "Data de fabricação é obrigatória"),
    DataVal: z.string().min(1, "Data de validade é obrigatória"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleAdd = (data) => {
    // console.log("Dados Validados: ", data);

    //lidar com a formatação do preço

    newProduct(data.product, data.price, data.DataFab, data.DataVal);
  };

  return (
    <div className="AddproductTab AddproductTab-grid">
      <button onClick={tab} className="closeTab">
        <X />
      </button>
      <form onSubmit={handleSubmit(handleAdd)} className="FormAddproduct">
        <input
          type="text"
          placeholder={
            errors.product ? errors.product.message : "Add new Product"
          }
          {...register("product")}
        />

        <input
          type="text"
          placeholder={errors.price ? errors.price.message : "Add new Price"}
          {...register("price")}
          // OnBlur, formata quando o Ui sai do input
          onBlur={(e) => {
            const value = e.target.value;
            if (value && !value.includes(",")) {
              // e.target.value = `${value},00`;
              setValue("price", `${value},00`);
            }
          }}
        />

        <input
          type="date"
          title="Data de Fabricação"
          {...register("DataFab")}
        />
        <input type="date" title="Data de Validade" {...register("DataVal")} />
        <button>Salvar</button>
      </form>
    </div>
  );
}
