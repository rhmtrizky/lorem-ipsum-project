import { useEffect, useRef, useState } from 'react';

const toasterVariant = {
  success: {
    title: 'Success',
    icon: 'bxs-check-circle',
    colorBar: 'bg-green-500',
  },
  error: {
    title: 'Error',
    icon: 'bxs-x-circle',
    colorBar: 'bg-red-500',
  },
};

const Toaster = ({ variant, message, setToaster }) => {
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prevLengthBar) => prevLengthBar - 0.13);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full h-screen fixed flex justify-end items-end bottom-5 right-5 z-40">
      <div className="fixed min-w-72 min-h-24 flex justify-start items-center gap-3 rounded-md shadow-xl px-5 py-3 bg-color-primary bg-white">
        <button
          className="absolute top-4 right-4"
          onClick={() => setToaster({})}
        >
          <i className="bx bx-x-circle text-xl font-semibold"></i>
        </button>
        <div>
          <i className={`bx ${toasterVariant[variant].icon} text-4xl text-green-500`}></i>
        </div>
        <div>
          <p className="font-bold text-lg">{toasterVariant[variant].title}</p>
          <p className="text-sm">{message}</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-green">
          <div
            style={{ width: `${lengthBar}%` }}
            className={`${toasterVariant[variant].colorBar} h-full`}
          />
        </div>
      </div>
    </div>
  );
};

export default Toaster;
