import SkeletonLine from '../SkeletonLine';

const SkeletonTicket = () => {
  return (
    <div className="w-full box-shadow bg-white rounded-lg p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="w-[130px]">
          <SkeletonLine />
        </div>
        <div className="w-[130px]">
          <SkeletonLine />
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-5">
        <div className="w-2/5">
          <SkeletonLine />
          <SkeletonLine />
        </div>
        <div className="w-1/5">
          <SkeletonLine />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTicket;
