import { Input } from '@nextui-org/react';

const InputUi = ({ label, type, name, placeholder, defaultValue, disabled, onChange, required, className }) => {
  return (
    <div className={'flex flex-col'}>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
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
        style={{ outline: 'none', minHeight: '40px' }}
        className={className ? className : 'text-neutral-700 text-sm shadow-md rounded'}
      />
    </div>
  );
};

export default InputUi;
