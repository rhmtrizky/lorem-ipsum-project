const { Button } = require('@nextui-org/react');

const ButtonTab = ({ type, state, setState }) => {
  return (
    <Button
      type="button"
      className={`${state.status && state.type === type ? 'bg-blue-500 text-white' : 'text-blue-900 border-2 border-blue-600'} font-semibold text-[12px] rounded-md px-3 `}
      onClick={() => setState({ status: true, type: type })}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Button>
  );
};

export default ButtonTab;
