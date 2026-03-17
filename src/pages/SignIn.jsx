import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../services/api.js";

const schema = yup.object({
  email: yup.string().email("E-mail invalido").required("E-mail Obrigatorio!"),
  password: yup
    .string()
    .required("Senha Obrigatoria!")
    .min(6, "A senha deve conter ao menos 6 letras"),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    // console.log(data);
    // const a = await fetch("http://localhost:3000/acess", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    //   credentials: "include",
    // });
    // const datas = await a.json();
    // data = JSON.stringify(data);
    const datas = await api.post(
      "/acess",
      {
        ...data,
      },
      {
        withCredentials: true,
      },
    );
    if (datas.status === 200) {
      return window.location.reload();
    } else {
      console.log("ERROR:", datas);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <h1 className="text-4xl self-center mb-10 text-green-700">Sign In</h1>
        <div className="flex flex-col gap-3 mb-3">
          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo.email@gmail.com"
            {...register("email")}
          />
          {errors.email?.message && (
            <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
              {errors.email?.message}
            </h4>
          )}
          <Input
            label="Password"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password?.message && (
            <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
              {errors.password?.message}
            </h4>
          )}
        </div>
        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
      <p className="flex gap-2">
        Nao tenho uma conta?
        <a
          className="text-blue-400 border-b-1 border-blue-400 transition ease-in duration-100 hover:scale-105"
          href="/signup"
        >
          Criar Conta!
        </a>
      </p>
    </div>
  );
}
