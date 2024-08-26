import { ChangeEvent, useState } from 'react';

export const InputLogin = ({
  text,
  type,
  name,
  onInputChange,
}: {
  text: string;
  type: string;
  name: string;
  onInputChange: (event: { prop: string, value: string }) => void;
}) => {
  const [value, setValue] = useState<number>(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const prop = event.target.name;

    setValue(value.length);
    onInputChange({ prop, value });
  }

  return (
    <>
      <input
        required
        className="w-[250px] border-2 border-[#E75F0B] text-[#E75F0B] h-[50px] rounded-md text-sm py-0 px-4 bg-transparent outline-none"
        name={name}
        type={type}
        onChange={handleChange}
      />
      <label className={`text-[#E75F0B] absolute top-[50%] left-[15px] translate-y-[-50%] text-sm pointer-events-none transition-all duration-300 ${value > 0 ? 'active' : ''}`}>
        {text}
      </label>
    </>
  );
};
