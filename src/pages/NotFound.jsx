export function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5 bg-[linear-gradient(0deg,rgba(34,_193,_195,_1)_0%,_rgba(253,_187,_45,_1)_100%)]">
      <h1 className="text-xl">Op's! Essa pagina nao existe. ☹️</h1>
      <a
        className="text-xl text-green-300 border-b-1 border-greentext-green-300 transition ease-in duration-100 hover:scale-105"
        href="/"
      >
        Voltar para o inicio!
      </a>
    </div>
  );
}
