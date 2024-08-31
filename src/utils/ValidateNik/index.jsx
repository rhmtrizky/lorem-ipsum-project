import { useState } from 'react';

const ValidateNik = () => {
  const [nik, setNik] = useState('');
  const [error, setError] = useState('');

  const handleChangeNik = (value) => {
    const nikRegex = /^[0-9]+$/;

    if (!nikRegex.test(value)) {
      setError('NIK hanya boleh terdiri dari angka.');
      setNik('');
    } else if (value.length !== 16) {
      setError('NIK harus terdiri dari 16 digit.');
      setNik('');
    } else {
      setError('');
      setNik(value);
    }
  };

  return {
    nik,
    error,
    handleChangeNik,
  };
};

export default ValidateNik;
