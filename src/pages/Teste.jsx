import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./css/teste.css";

const schema = yup.object({
  name: yup.string().required("PREENCHER O NOME").min(10, "MINIMO 10 LETRAS"),
  data: yup.string().required(),
});
function Teste() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      data: "",
    },
    resolver: yupResolver(schema),
  });
  function onSubmin(data) {
    console.log(data);
  }
  return (
    <div className="bg-[#313131] w-screen h-screen flex justify-center items-center">
      <form
        className="border-1 border-white p-10 rounded-xl flex-col"
        onSubmit={handleSubmit(onSubmin)}
      >
        <div className="flex gap-10 items-center">
          <input
            type="text"
            name="name"
            id="joj"
            {...register("name")}
            className="p-2 border-1 rounded-md border-white text-white md:text-red-600 "
          />
          {errors.name?.message && (
            <div>
              <h1 className="text-white border-b-1 border-white cursor-pointer">
                {errors.name.message}
              </h1>
            </div>
          )}
        </div>
        <div className="flex gap-10 items-center">
          <input
            type="date"
            name=""
            id=""
            {...register("data")}
            className="p-2 border-1 rounded-md border-white text-white"
          />
          {errors.data?.message && (
            <div>
              <h1 className="text-white border-b-1 cursor-pointer">
                {errors.data.message}
              </h1>
            </div>
          )}
        </div>
        <button
          className="nigger p-2 border-1 rounded-md text-white border-white ml-auto"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default Teste;
