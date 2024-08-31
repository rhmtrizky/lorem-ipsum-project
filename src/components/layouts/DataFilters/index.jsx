import InputUi from '@/components/ui/Input';
import Search from '@/components/ui/Search';
import { Button } from '@nextui-org/react';

const DataFilters = ({ searchActivities, setSearchActivities, getDateForFilter, setGetDateForFilter, title }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="px-3 mt-2">
        <h1 className="text-2xl font-bold text-blue-900">{title || 'Patient Queue'}</h1>
        <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col lg:items-end md:items-end sm:items-start items-start  w-full gap-8 mt-5">
          <div className="relative lg:w-3/5 md:w-3/5 sm:w-full w-full text-neutral-600">
            <Search
              state={searchActivities}
              setState={setSearchActivities}
            />
          </div>
          <div className="flex flex-col lg:w-2/5 md:w-2/5 sm:w-full w-full items-end">
            <p className="text-neutral-700 text-sm">Filter by date:</p>
            <div className="flex items-center gap-2 justify-end">
              <InputUi
                name="date"
                type="date"
                defaultValue={getDateForFilter}
                onChange={(e) => setGetDateForFilter(e.target.value)}
                className={' border-2 border-neutral-300 rounded-md px-2 text-sm'}
              />
              <Button
                type="button"
                className="text-white font-semibold text-[12px] bg-red-500 rounded-md"
                value={getDateForFilter}
                onClick={() => setGetDateForFilter('')}
                size="sm"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilters;
