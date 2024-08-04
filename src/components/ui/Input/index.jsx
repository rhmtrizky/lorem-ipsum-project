import { Input } from '@nextui-org/react';

const InputUi = ({ label, type, name, placeholder, defaultValue, disabled, onChange, required }) => {
  return (
    <Input
      key={'outside'}
      labelPlacement={'outside'}
      type={type}
      name={name}
      required={required}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      style={{ outline: 'none', minHeight: '40px'}}
      className="input-auth text-white shadow-md rounded mt-2"
    />
  );
};

export default InputUi;
