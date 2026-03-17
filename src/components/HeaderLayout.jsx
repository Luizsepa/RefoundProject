import { Outlet } from "react-router";
import logo from "../assets/logo.svg";
import exitSvg from "../assets/logout.svg";
import { api } from "../services/api.js";
export function HeaderLayout({ name }) {
  async function logout() {
    // const response = await fetch("http://localhost:3000/logout", {
    //   credentials: "include",
    // });
    // const data = await response.json();
    const data = await api.get("/logout", {
      withCredentials: true,
    });
    // console.log(data.data);
    if (data.data.status === 200) {
      window.location.reload();
    }
  }
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-gray-400">
      <div className="w-[90%] flex items-center justify-between mt-15 bg-gray-100 p-2 rounded-xl shadow-2xl shadow-green-700">
        <img src={logo} alt="" />
        <h3 className="flex items-center gap-3">
          Olá, {name}
          <img
            src={exitSvg}
            alt=""
            className="hover:scale-105 hover:opacity-60 cursor-pointer transition ease-in duration-100"
            onClick={logout}
          />
        </h3>
      </div>
      <main className="flex flex-col bg-gray-100 p-8 rounded-lg justify-center items-center gap-10 md:min-w-[500px] mt-50">
        <Outlet />
      </main>
    </div>
  );
}
