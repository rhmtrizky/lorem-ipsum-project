import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { BsUpload } from 'react-icons/bs';

const ImageUpload = ({ stateImage, setStateImage, title }) => {
  return (
    <div className="relative w-full h-full py-2 flex flex-col justify-center items-center border-2 border-color-gray rounded-md mt-2">
      {stateImage ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src={URL.createObjectURL(stateImage)}
            alt="image"
            width={150}
            height={120}
          />
          <p className="text-center text-sm p-1 bg-color-gray rounded-md">{stateImage.name}</p>
        </div>
      ) : (
        <div className="py-2 flex flex-col justify-center items-center">
          <BsUpload
            size={40}
            className="text-color-gray2 font-bold"
          />
          <Button
            label="Upload Image"
            type="button"
            className="bg-color-gray text-color-dark py-2 px-3 rounded-md text-sm"
          >
            {title || 'Upload Profile Image'}
          </Button>
          <div className="text-xs flex justify-center flex-col items-center text-center mt-1">
            <p>
              Maximum image size is <b>1 MB</b>
            </p>
            <p>
              Accepted formats: <b>.jpg, .jpeg, .png</b>
            </p>
          </div>
          <input
            className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
            type="file"
            name="image"
            onChange={(e) => setStateImage(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
