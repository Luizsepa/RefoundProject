export function Select({ label, categorys, ...rest }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label} className="text-green-800 text-lg">
        {label}
      </label>
      <select
        className="w-full h-10 transition-all duration-150 font-semibold tracking-[0.3px] placeholder:font-medium border 1 placeholder:text-gray-400 border-gray-500 outline-none p-2 rounded-lg focus:border-2 focus:border-green-800"
        defaultValue="default"
        {...rest}
      >
        <option value="default" disabled>
          Selecionar
        </option>
        {categorys &&
          categorys.map((category, index) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
      </select>
    </div>
  );
}
