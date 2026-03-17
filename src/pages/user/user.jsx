import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Upload } from "../../components/Upload";
import { Button } from "../../components/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api.js";

const schema = yup.object({
  nomeSolicitacao: yup.string().required("Nome da Solicitacao Obrigatorio!"),
  categoria: yup.string().required("Selecione a categoria!"),
});

const categorys = [
  "Serviços",
  "Transporte",
  "Hospedagem",
  "Alimentaçao",
  "Outros",
];
export function UserDashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [valor, setValor] = useState("R$ 0,00");
  const [filename, setFilename] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  async function onSubmit(data) {
    let base64File = null;
    if (filename) {
      base64File = await fileToBase64(filename); // Transforma em texto
    }

    if (limpovalor(valor) <= 0) {
      return alert("Valor igual ou menor que zero nao eh possivel ser enviado");
    }

    // const db = await fetch("http://localhost:3000/db", {
    //   credentials: "include",
    // });
    // const datass = await db.json();
    const finalValues = {
      ...data,
      valor: limpovalor(valor),
      file: {
        nameoffile: filename.name,
        filx: base64File,
      },
    };
    // console.log(finalValues);
    // const reponse = await fetch("http://localhost:3000/dbrefound", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(finalValues),
    //   credentials: "include",
    // });
    // const datas = await reponse.json();
    const datas = await api.post("/dbpost", finalValues, {
      withCredentials: true,
    });
    console.log(datas.data);
    if (datas.data.status === 200) {
      if (confirm("ENVIADO COM SUCESSO")) {
        window.location.href = "/";
      }
    }
  }

  const limpovalor = (value) => {
    const valorLimpo = value
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const valorFloat = parseFloat(valorLimpo);
    return valorFloat;
  };

  const handleChangeMoeda = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    const result = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value) / 100);

    setValor(value === "" ? "R$ 0,00" : result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input
        label="Nome da Solicitacao"
        placeholder="Nome da Solicitacao"
        {...register("nomeSolicitacao")}
      />
      {errors.nomeSolicitacao?.message && (
        <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
          {errors.nomeSolicitacao?.message}
        </h4>
      )}
      <div className="flex gap-2 items-center">
        <Select
          label="Categoria"
          categorys={categorys}
          {...register("categoria")}
        />
        {errors.categoria?.message && (
          <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
            {errors.categoria?.message}
          </h4>
        )}
        <Input
          label="Valor"
          placeholder="R$ 00,0"
          value={valor}
          onChange={handleChangeMoeda}
          //Nao usamos register pra podermos usar o onChange e salvar
          //   {...register("valor")}
        />
      </div>
      <Upload
        filename={filename && filename}
        onChange={(e) => {
          const file = e.target.files[0];
          console.log(e.target.files[0]);
          if (file) {
            setFilename(file);
          }
        }}

        // {...register("upload")}
      />
      <Button type="submit">Enviar</Button>
      <a href="/">Voltar</a>
    </form>
  );
}
