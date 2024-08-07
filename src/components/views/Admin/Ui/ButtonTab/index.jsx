const { Button } = require('@nextui-org/react');

const ButtonTab = ({ type, onClick }) => {
  return (
    <Button
      type="button"
      className="text-blue-900 font-semibold text-[12px] rounded-md px-3 border-2 border-blue-600"
      onClick={onClick}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Button>
  );
};

export default ButtonTab;
