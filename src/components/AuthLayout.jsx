import { Outlet } from "react-router";
import logoSvg from "../assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-400">
      <main className="flex flex-col bg-gray-100 p-8 rounded-lg justify-center items-center gap-10 md:min-w-[500px]">
        <img src={logoSvg} alt="" className="scale-150 md:scale-200" />
        <Outlet />
      </main>
    </div>
  );
}
