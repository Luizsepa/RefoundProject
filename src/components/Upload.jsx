import uploadSvg from "../assets/upload.svg";
export function Upload({ filename = null, ...rest }) {
  return (
    <div className="flex flex-col">
      <legend className="uppercase text-xxs text-gray-500 mb-2">
        Comprovante
      </legend>
      <div className="w-full flex items-center border-1 border-gray-500 rounded-xl">
        <input type="file" id="upload" {...rest} className="hidden" />
        <span
          htmlFor="upload"
          className="text-md text-gray-900 flex-1 pl-4 cursor-default"
        >
          {filename ? filename.name : "Seleciona o arquivo"}
        </span>
        <label
          htmlFor="upload"
          className="hover:scale-110 transition ease-in duration-100 cursor-pointer"
        >
          <img src={uploadSvg} alt="" className="bg-green-700 rounded-xl p-2" />
        </label>
      </div>
    </div>
  );
}
