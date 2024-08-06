import { Input } from '@nextui-org/react';

const Search = ({ state, setState }) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Search..."
        className="w-full border-2 border-neutral-300 rounded-md px-2 text-sm"
        variant="underlined"
        color="danger"
        style={{ backgroundColor: 'transparent' }}
        onChange={(e) => setState(e.target.value)}
      />
      <div className="absolute top-3 right-2">
        {state !== '' ? (
          <button
            type="button"
            className="bx bx-x text-xl"
            onClick={() => setState('')}
          />
        ) : (
          <i className="bx bx-search text-xl" />
        )}
      </div>
    </>
  );
};

export default Search;
