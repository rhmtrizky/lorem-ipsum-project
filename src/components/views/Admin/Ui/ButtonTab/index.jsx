const { Button } = require('@nextui-org/react');

const ButtonTab = ({ type, state, setState, basicColor }) => {
  return (
    <Button
      type="button"
      className={`${state.status && state.type === type ? `bg-${basicColor}-500 text-white` : `text-${basicColor}-900 border-2 border-${basicColor}-600`} font-semibold text-[12px] rounded-md px-3`}
      onClick={() => setState({ status: true, type: type })}
    >
      {type.charAt(0).toUpperCase() + type.slice(1) || 'All'}
    </Button>
  );
};

export default ButtonTab;
