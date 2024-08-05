import { Input } from '@nextui-org/react';

const InputUi = ({ label, type, name, placeholder, defaultValue, disabled, onChange, required }) => {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-800">{label}</label>
      <Input
        key={'outside'}
        labelPlacement={'outside'}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        style={{ outline: 'none', backgroundColor: 'transparent', minHeight: '40px' }}
        className="text-neutral-500 shadow-md rounded"
      />
    </div>
  );
};

export default InputUi;
