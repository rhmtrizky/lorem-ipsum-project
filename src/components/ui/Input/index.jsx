import { Input } from '@nextui-org/react';

const InputUi = ({ label, type, name, placeholder, defaultValue, disabled, onChange, required }) => {
  return (
    <Input
      key={'inside'}
      labelPlacement={'inside'}
      type={type}
      name={name}
      required={required}
      label={label ? label : placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      style={{ outline: 'none', backgroundColor: 'transparent' }}
      className="text-neutral-500 shadow-md rounded"
    />
  );
};

export default InputUi;
