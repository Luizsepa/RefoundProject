import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { AdminRoutes } from "./admin-routes";
import { UserRoutes } from "./user-routes";
import { useState, useEffect } from "react";
import { api } from "../services/api";

export function Routes() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      try {
        // const response = await fetch("http://localhost:3000/meRole", {
        //   credentials: "include",
        // });
        // const data = await response.json();
        const data = await api.get("/meRole", { withCredentials: true });

        if (data.data.status === 403) {
          setRole("none");
          // console.log("parou no if data.status");
        } else {
          setRole(data.data.role);
          // console.log("else");
        }
      } catch (error) {
        setRole("");
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkRole();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <BrowserRouter>
      {role === "admin" && <AdminRoutes />}
      {role === "user" && <UserRoutes />}
      {role === "none" && <AuthRoutes />}
      {!["admin", "user", "none"].includes(role) && <AuthRoutes />}
    </BrowserRouter>
  );
}
