import { Button } from '@nextui-org/react';

const ButtonTab = ({ type, state, setState, basicColor, filter }) => {
  const handleClick = () => {
    setState({
      status: true,
      type: type,
    });
  };

  return (
    <div className="relative">
      <Button
        type="button"
        className={`${state?.status && state?.type === type ? `bg-${basicColor}-500 text-white` : `text-${basicColor}-900 border-2 border-${basicColor}-600`} font-semibold text-[12px] rounded-md px-3`}
        onClick={handleClick}
      >
        {type?.charAt(0).toUpperCase() + type?.slice(1) || 'All'}
      </Button>
      {state?.type === type && state?.type !== '' ? <p className={'flex justify-center items-center text-sm font-semibold bg-white text-green-500 absolute -top-1 -right-1 rounded-full px-2'}>{state?.length}</p> : null}
    </div>
  );
};

export default ButtonTab;
