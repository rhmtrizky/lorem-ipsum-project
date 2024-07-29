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
      style={{ outline: 'none', backgroundColor: 'transparent', minHeight: '40px' }}
      className="text-neutral-700 shadow-md rounded"
    />
  );
};

export default InputUi;
