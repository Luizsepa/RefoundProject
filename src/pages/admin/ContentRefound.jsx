import { Input } from "../../components/Input";
import { Button } from "../../components/Button.jsx";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
export function ContentRefound() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getDb() {
      try {
        // const response = await fetch("http://localhost:3000/db", {
        //   credentials: "include",
        // });
        // const data = await response.json();
        const data = await api.get("/db", {
          withCredentials: true,
        });

        setList(data.data);
        return data.data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getDb();
  }, []);

  {
    loading && (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1>carregando..</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      {list.map((e, index) => {
        if (e.id == id.toString()) {
          const result = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(parseFloat(e.valor));
          return (
            <div className="flex flex-col items-center" key={index}>
              <Input
                label="Nome da Solicitacao"
                placeholder="Nome da Solicitacao"
                value={e.nomesolicitacao}
                disabled
              />
              <div className="flex gap-2 items-center">
                <Input label="Categoria" value={e.categoria} disabled />
                <Input
                  label="Valor"
                  placeholder="R$ 00,0"
                  value={result}
                  disabled
                />
              </div>
              <Input
                label="File:"
                placeholder="R$ 00,0"
                value={e.filename}
                className="min-w-max"
                disabled
              />
              <img
                src={e.filecontent}
                alt=""
                className="max-w-[500px] max-h-[600px] border border-black rounded-xl mt-5"
              />
              {/* <Button type="submit">Voltar</Button> */}
            </div>
          );
        }
      })}
      <a
        href="/"
        className="border border-gray-400 p-3 mt-10 rounded-xl bg-green-600 text-white font-semibold"
      >
        VOLTAR
      </a>
    </div>
  );
}
