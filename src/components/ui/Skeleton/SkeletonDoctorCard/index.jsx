const SkeletonDoctorCard = () => {
  return (
    <div className="skeleton-container flex flex-col justify-center lg:w-[240px] md:w-[220px] sm:w-fit w-fit lg:h-[315px] md:h-[300px] sm:h-[290px] h-[290px]  shadow-lg rounded-xl p-4 transform bg-white">
      <div className="skeleton skeleton-image"></div>
      <div className="lg:w-full md:w-full sm:w-[140px] w-[140px] px-2">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
  );
};

export default SkeletonDoctorCard;
