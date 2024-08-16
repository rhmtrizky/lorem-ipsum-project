import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const firestore = getFirestore(app);

const storage = getStorage(app);

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName, id) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(collectionName, field, value) {
  const q = query(collection(firestore, collectionName), where(field, '==', value));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function addData(collectionName, data, callback) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function updateData(collectionName, id, data, callback) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function deleteData(collectionName, id, callback) {
  const docRef = doc(firestore, collectionName, id);
  deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function uploadFile(id, type, name, file, progressCallback, callback) {
  if (file) {
    if (file.size < 1048576) {
      const newFileName = { name } + file.name.split('.')[1];
      const storageRef = ref(storage, `images/${type}/${id}/${newFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallback(true, progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            callback(true, downloadURL);
          });
        }
      );
    } else {
      return callback(false);
    }
  } else {
    return callback(false);
  }
}
