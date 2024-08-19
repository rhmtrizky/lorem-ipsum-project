import { heart } from '@/assets/images/images';
import Link from 'next/link';

const AuthLayout = ({ children, title, link, linkText, isError, errorText, linkTitle, subChildren }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-auth overflow-hidden">

      <div className='relative' >

        <div className='w-56 h-56 bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] rounded-full absolute -right-12 -top-24' ></div>
        <div className='w-36 h-36 bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] rounded-full absolute right-24 -top-24' ></div>
        
        <div className="flex w-[1000px] h-[500px] rounded-[30px] form-container max-[1030px]:w-max max-[830px]:flex-col max-[830px]:h-max">
          <div className='flex flex-col justify-center items-center w-1/2 max-[830px]:hidden col-first' >
            <div className='relative  ' >
              <img src={heart} className='w-[400px] heart-login ' />
            </div>
          </div>
          <div className='relative flex flex-col justify-center w-[45%] p-[20px] max-[300px]:p-[10px] max-[830px]:w-full ' >
            <div className='flex flex-col items-center' >
              <h1 className="flex justify-center font-bold text-xl my-3 text-[#373a39] min-[400px]:text-3xl ">{title}</h1>
              <div className="w-full min-[1030px]:w-[350px] " >{children}</div>

              {isError && <p className='text-color-red text-sm italic' >{errorText}</p>}
              <div className="flex gap-1 text-sm mt-2 max-[400px]:flex-col max-[400px]:items-center">
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
