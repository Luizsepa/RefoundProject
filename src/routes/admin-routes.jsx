import { Routes, Route } from "react-router";
import { HeaderLayout } from "../components/HeaderLayout";
import { AdminDashboard } from "../pages/admin/dashboard";
import { ContentRefound } from "../pages/admin/ContentRefound";
import { NotFound } from "../pages/NotFound";
import { useState, useEffect } from "react";
import { api } from "../services/api";
export function AdminRoutes() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function username() {
      try {
        // const response = await fetch("http://localhost:3000/me", {
        //   credentials: "include",
        // });
        // const data = await response.json();
        const data = await api.get("/me", { withCredentials: true });
        // console.log(data);
        if (data.data.status === 200) {
          setNome(data.data.name);
        } else {
          setNome("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    username();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>CARREGANDO</h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout name={nome} />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/refund/:id" element={<ContentRefound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
