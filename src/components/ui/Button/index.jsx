import Image from 'next/image';

const Button = ({ icon, label, type, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
  
    >
      <div className="flex gap-2 justify-center items-center">
        {icon && (
          <Image
            src={icon}
            alt="..."
            width={20}
            height={20}
          />
        )}
        <p className="text-sm">{label}</p>
      </div>
    </button>
  );
};

export default Button;
