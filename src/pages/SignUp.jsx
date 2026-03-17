import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../services/api";

const schema = yup.object({
  nome: yup
    .string()
    .required("Nome Obrigatorio!")
    .min(8, "Minimo 8 letras no nome"),
  email: yup.string().email("E-mail invalido").required("E-mail Obrigatorio!"),
  password: yup
    .string()
    .required("Password Obrigatorio!")
    .min(6, "Deve conter no minimo 6 letras"),
  confirmPassword: yup
    .string()
    .required("Confirmacao de senha obrigatoria")
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguals"),
});
export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const { nome, email, password } = data;

    const user = {
      nome,
      email,
      password,
    };
    const datas = await api.post(
      "/createacount",
      { ...user },
      {
        withCredentials: true,
      },
    );

    if (datas.status == 200) {
      window.location.href = "/";
    } else {
      console.log(datas.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-2"
      >
        <h1 className="text-4xl self-center mb-10 text-green-700">Sign Up</h1>
        <Input label="Nome" placeholder="Nome Completo" {...register("nome")} />
        {errors.nome?.message && (
          <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
            {errors.nome?.message}
          </h4>
        )}
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
        <Input
          label="Confirm Passoword"
          type="password"
          placeholder="Confirm Passoword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <h4 className="text-red-500 text-sm self-center border-b-1 border-red-500">
            {errors.confirmPassword?.message}
          </h4>
        )}
        <Button isLoading={isLoading} type="submit">
          Cadastrar
        </Button>
      </form>
      <p className="flex gap-2">
        Ja tenho uma Conta?
        <a
          className="text-blue-400 border-b-1 border-blue-400 transition ease-in duration-100 hover:scale-105"
          href="/"
        >
          Entrar!
        </a>
      </p>
    </div>
  );
}
