import { addData, retrieveDataByField } from '@/libs/firebase/service';
import bcrypt from 'bcrypt';

export async function signUp(userData, callback) {
  const dataEmail = await retrieveDataByField('users', 'email', userData.email);
  const dataPhoneNumber = await retrieveDataByField('users', 'phoneNumber', userData.phoneNumber);
  if (dataEmail.length > 0 || dataPhoneNumber.length > 0) {
    callback(false, 'Email already exists');
  } else {
    if (!userData.role) {
      userData.role = 'patient';
    }
    userData.image = '';
    userData.password = await bcrypt.hash(userData.password, 10);
    addData('users', userData, (result) => {
      if (result) {
        callback(result);
      }
    });
  }
}

export async function signIn(email) {
  const data = await retrieveDataByField('users', 'email', email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data, callback) {
  const user = await retrieveDataByField('users', 'email', data.email);
  if (user?.length > 0) {
    callback(user[0]);
  } else {
    data.role = 'patient';
    data.phoneNumber = '';
    await addData('users', data, (status, res) => {
      const userId = res.path.split('/').pop();
      data.id = userId;
      if (status) {
        callback(data);
      }
    });
  }
}
