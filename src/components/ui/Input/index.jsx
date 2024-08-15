import { Input } from '@nextui-org/react';

const InputUi = ({ label, type, name, placeholder, defaultValue, disabled, onChange, required, className, colorLabel }) => {
  return (
    <div className={'flex flex-col gap-1'}>
      <label className={`text-sm font-medium text-${colorLabel}`}>{label}</label>
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
        is
        style={{ outline: 'none', minHeight: '40px' }}
        className={className ? className : 'text-neutral-700 text-sm shadow-md rounded'}
      />
    </div>
  );
};

export default InputUi;
