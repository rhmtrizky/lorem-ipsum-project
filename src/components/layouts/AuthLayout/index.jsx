import { heart } from '@/assets/images/images';
import Link from 'next/link';

const AuthLayout = ({ children, title, link, linkText, isError, errorText, linkTitle, subChildren }) => {
  return (
    <div className="flex w-full h-screen lg:justify-center md:justify-between sm:justify-center justify-center items-center bg-auth overflow-hidden">
      <div className="relative w-full min-[1600px]:w-[80%]  px-5 flex justify-center">
        <div className="w-56 h-56 bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] rounded-full absolute -right-12 -top-24"></div>
        <div className="w-36 h-36 bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] rounded-full absolute right-24 -top-24"></div>
        <div className="flex lg:w-[80%] md:w-full sm:w-full w-full h-[500px] rounded-[30px] form-container justify-center lg:items-stretch md:items-stretch sm:items-center items-center">
          <div className="lg:flex md:flex sm:hidden hidden flex-col justify-center items-center w-1/2  col-first">
            <div className="relative">
              <img
                src={heart}
                className="w-[400px] heart-login "
              />
            </div>
          </div>
          <div className="relative flex flex-col justify-center lg:w-1/2 md:w-1/2 sm:full w-full ">
            <div className="flex flex-col items-center w-full">
              <h1 className="flex justify-center font-bold text-3xl my-3 text-[#373a39]">{title}</h1>
              <div>{children}</div>

              {isError && <p className="text-color-red text-sm italic">{errorText}</p>}
              <div className="flex gap-1 text-sm mt-2">
                <p className="font-normal text-color-primary">{linkText}</p>
                <Link href={link}>
                  <p className="font-bold text-color-primary">{linkTitle}</p>
                </Link>
              </div>
              {subChildren}
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default AuthLayout;
