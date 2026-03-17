import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router";
export function AdminDashboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function db() {
    // const a = await fetch("http://localhost:3000/db", {
    //   credentials: "include",
    // });
    // const data = await a.json();
    const data = await api.get("/db", {
      withCredentials: true,
    });
    // console.log(data.data);
    setList(data.data);
    return data.data;
  }
  useEffect(() => {
    db();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <main className="w-full h-full flex flex-col items-center gap-6">
      <h1>Admin Dashboard</h1>
      <ul className="border border-black p-3 flex flex-col rounded-xl w-[500px] max-h-[400px] gap-2 overflow-scroll">
        <li className="flex w-full justify-between border-b-1 items-center">
          <h4 className="text-md font-semibold">Nome:</h4>
          <h4 className="text-md font-semibold">Categoria:</h4>
          <strong className="text-md font-semibold">Valor:</strong>
          <h4 className="text-md font-semibold">Filename:</h4>
        </li>
        {list.map((a, index) => {
          // console.log(a);
          const [firstNome] = a.nomesolicitacao.split(" ");
          const [filenameSplit] = a.filename.split(" ");
          return (
            <li
              key={index}
              onClick={() => navigate(`/refund/${a.id}`)}
              className="flex w-full justify-between border border-black p-2 rounded-xl cursor-pointer hover:scale-105 transition ease-in duration-150 hover:opacity-72"
            >
              <h4 className="text-md">{firstNome}</h4>
              <p className="text-sm">{a.categoria}</p>
              <strong className="text-md">{a.valor}</strong>
              <p>{filenameSplit}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
/*
        {list.map((a) => {
          // console.log(a);
          const [firstNome] = a.nomeSolicitacao.split(" ");
          return (
            <li
              onClick={() => navigate(`/refund/${a.id}`)}
              className="flex w-full justify-between border border-black p-2 rounded-xl cursor-pointer hover:scale-105 transition ease-in duration-150 hover:opacity-72"
            >
              <h4 className="text-md">{firstNome}</h4>
              <p className="text-sm">{a.categoria}</p>
              <strong className="text-md">{a.valor}</strong>
              <p>{a.file.filename}</p>
            </li>
          );
        })}
*/
