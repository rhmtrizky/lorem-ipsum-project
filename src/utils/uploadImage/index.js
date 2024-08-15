import { uploadFile } from '@/libs/firebase/service';

const handleImageUpload = async (file, id, collectionName, fileName) => {
  return new Promise((resolve, reject) => {
    uploadFile(
      id,
      collectionName,
      fileName,
      file,
      (status, progressPercent) => {
        console.log(`Upload progress: ${progressPercent}%`);
      },
      async (status, downloadURL) => {
        if (status) {
          resolve(downloadURL); // Resolve the promise with the downloadURL
        } else {
          reject('Upload failed'); // Reject the promise if the upload fails
        }
      }
    );
  });
};

export default handleImageUpload;
