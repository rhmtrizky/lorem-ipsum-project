import InputUi from '@/components/ui/Input';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { roles, gender, golDarah } from '@/constraint/adminPanel';
import ModalUi from '@/components/ui/Modal';
import Image from 'next/image';
import { uploadFile } from '@/libs/firebase/service';
import ImageUpload from '../../Ui/ImageUpload';

const ModalUpdateUser = ({ dataUpdateUser, setUpdateUser, onOpenChange, isOpen, setUsers, specialists }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(dataUpdateUser.role);
  const [imageFile, setImageFile] = useState(null);
  const [schedules, setSchedules] = useState(dataUpdateUser.schedule || [{ day: '', startTime: '', endTime: '' }]);
  console.log(imageFile);

  const [patients, setPatients] = useState(
    dataUpdateUser.patient || [
      {
        name: '',
        bornPlace: '',
        bornDate: '',
        gender: '',
        nik: '',
        bpjsNumber: '',
        fatherName: '',
        motherName: '',
        address: '',
        golDarah: '',
        suku: '',
      },
    ]
  );

  useEffect(() => {
    setRole(dataUpdateUser.role);

    if (role === 'patient') {
      setPatients(
        dataUpdateUser.patient || [
          {
            name: '',
            bornPlace: '',
            bornDate: '',
            gender: '',
            nik: '',
            bpjsNumber: '',
            fatherName: '',
            motherName: '',
            address: '',
            golDarah: '',
            suku: '',
          },
        ]
      );
    } else if (role === 'doctor') {
      setSchedules(dataUpdateUser.schedule || [{ day: '', startTime: '', endTime: '' }]);
    }
  }, [dataUpdateUser]);

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    let data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      role: form.role.value,
    };

    if (role === 'patient') {
      data = {
        ...data,
        patient: patients,
      };
    } else if (role === 'doctor') {
      data = {
        ...data,
        specialist: form.specialist.value,
        licenceNumber: form.licenceNumber.value,
        address: form.address.value,
        schedule: schedules,
      };
    } else if (role === 'pharmacy') {
      data = {
        ...data,
        licenceNumber: form.licenceNumber.value,
        address: form.address.value,
      };
    }

    try {
      const result = await userService.updateUser(dataUpdateUser.id, data, session.data.accessToken);

      if (result.status === 200) {
        if (imageFile) {
          await handleImageUpload(imageFile, dataUpdateUser.id);
        } else {
          const { data } = await userService.getAllUsers(session.data.accessToken);
          setUsers(data.data);
          setUpdateUser({});
          onOpenChange(false);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file, userId) => {
    setIsLoading(true);

    await uploadFile(
      userId,
      'users',
      'doctor image profile',
      file,
      (status, progressPercent) => {
        console.log(`Upload progress: ${progressPercent}%`);
      },
      async (status, downloadURL, e) => {
        if (status) {
          const data = {
            image: downloadURL,
          };

          const result = await userService.updateUser(userId, data, session.data.accessToken);

          if (result.status === 200) {
            const { data } = await userService.getAllUsers(session.data.accessToken);
            setUsers(data.data);
            setUpdateUser({});
          } else {
            console.log('failed upload image profile', result);
          }
        } else {
          console.log('Size image should be less than 1MB');
          setIsLoading(false);
          e.target[0].value = '';
        }
      }
    );
  };

  const addPatient = () => {
    setPatients([...patients, { name: '', bornPlace: '', bornDate: '', gender: '', nik: '', bpjsNumber: '', fatherName: '', motherName: '', address: '', golDarah: '', suku: '' }]);
  };

  const removePatient = (index) => {
    const newPatients = patients.filter((_, i) => i !== index);
    setPatients(newPatients);
  };

  const handlePatientsChange = (index, key, value) => {
    const newPatients = patients.map((patient, i) => (i === index ? { ...patient, [key]: value } : patient));
    setPatients(newPatients);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: '', startTime: '', endTime: '' }]);
  };

  const removeSchedule = (index) => {
    const newSchedule = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedule);
  };

  const handleScheduleChange = (index, key, value) => {
    const newSchedules = schedules.map((schedule, i) => (i === index ? { ...schedule, [key]: value } : schedule));
    setSchedules(newSchedules);
  };

  return (
    <div>
      <ModalUi
        title={'Update User'}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setUpdateUser}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleUpdateUser}
        >
          {dataUpdateUser?.image ? (
            <div className="flex flex-col items-center gap-2 justify-center w-full">
              <Image
                src={imageFile !== null || '' ? URL.createObjectURL(imageFile) : dataUpdateUser?.image}
                alt="profile"
                width={300}
                height={300}
                className="rounded-full h-[200px] w-[200px] object-cover"
              />
              <div className="relative">
                <Button
                  size="sm"
                  className="bg-blue-500 text-white text-sm rounded-md"
                >
                  Change Image
                </Button>
                <input
                  className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                  type="file"
                  name="image"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>
            </div>
          ) : (
            <ImageUpload
              stateImage={imageFile}
              setStateImage={setImageFile}
            />
          )}

          <InputUi
            name="fullname"
            type={'text'}
            placeholder={'Fullname'}
            label={'Nama Lengkap'}
            defaultValue={dataUpdateUser.fullname}
            required
          />
          <InputUi
            name={'email'}
            type={'email'}
            placeholder={'Email'}
            label={'Email'}
            defaultValue={dataUpdateUser.email}
            required
          />
          <InputUi
            name={'phoneNumber'}
            type={'number'}
            label={'No Handphone'}
            placeholder={'Phone Number'}
            defaultValue={dataUpdateUser.phoneNumber === null ? '' : dataUpdateUser.phoneNumber}
            required
          />
          <div>
            <label className="text-sm font-medium text-neutral-800">Pilih Role</label>
            <Select
              name="role"
              size="sm"
              defaultSelectedKeys={[dataUpdateUser.role]}
              className="w-full text-neutral-700 shadow-md rounded min-h-[40px] bg-white text-sm"
              required
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="w-full bg-white gap-0"
                >
                  {role.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          {role == 'patient' && (
            <div className="flex flex-col gap-4">
              {patients.map((patient, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{`Data Pasien ${index + 1}`}</h2>
                    <Button
                      className="bg-red-500 text-white rounded p-2 w-4 h-8 "
                      color="danger"
                      onClick={() => removePatient(index)}
                    >
                      <i className="bx bx-trash" />
                    </Button>
                  </div>
                  <InputUi
                    name={`patient[${index}].name`}
                    type={'text'}
                    placeholder={'Patient Name'}
                    defaultValue={patient.name}
                    label={'Nama Pasien'}
                    onChange={(e) => handlePatientsChange(index, 'name', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornPlace`}
                    type={'text'}
                    placeholder={'Tempat Lahir'}
                    label={'Tempat Lahir'}
                    defaultValue={patient.bornPlace}
                    onChange={(e) => handlePatientsChange(index, 'bornPlace', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornDate`}
                    type={'date'}
                    placeholder={'Tanggal Lahir'}
                    label={'Tanggal Lahir'}
                    defaultValue={patient.bornDate}
                    onChange={(e) => handlePatientsChange(index, 'bornDate', e.target.value)}
                    required
                  />
                  <div>
                    <label className="text-sm font-medium text-neutral-800">Jenis Kelamin</label>
                    <Select
                      name={`patient[${index}].gender`}
                      size="sm"
                      defaultSelectedKeys={[patient.gender]}
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      onChange={(e) => handlePatientsChange(index, 'gender', e.target.value)}
                      placeholder="Jenis Kelamin"
                      required
                    >
                      {gender.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="w-full bg-white gap-0"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <InputUi
                    name={`patient[${index}].nik`}
                    type={'number'}
                    placeholder={'NIK'}
                    label={'NIK'}
                    defaultValue={patient.nik}
                    onChange={(e) => handlePatientsChange(index, 'nik', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bpjsNumber`}
                    type={'number'}
                    placeholder={'No BPJS'}
                    label={'No BPJS'}
                    defaultValue={patient.bpjsNumber}
                    onChange={(e) => handlePatientsChange(index, 'bpjsNumber', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].fatherName`}
                    type={'text'}
                    placeholder={'Nama Ayah'}
                    label={'Nama Ayah'}
                    defaultValue={patient.fatherName}
                    onChange={(e) => handlePatientsChange(index, 'fatherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].motherName`}
                    type={'text'}
                    placeholder={'Nama Ibu'}
                    label={'Nama Ibu'}
                    defaultValue={patient.motherName}
                    onChange={(e) => handlePatientsChange(index, 'motherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].address`}
                    type={'text'}
                    placeholder={'Alamat'}
                    label={'Alamat'}
                    defaultValue={patient.address}
                    onChange={(e) => handlePatientsChange(index, 'address', e.target.value)}
                    required
                  />
                  <div>
                    <label className="text-sm font-medium text-neutral-800">Golongan Darah</label>
                    <Select
                      name={`patient[${index}].golDarah`}
                      size="sm"
                      defaultSelectedKeys={[patient.golDarah]}
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      onChange={(e) => handlePatientsChange(index, 'golDarah', e.target.value)}
                      placeholder="Golongan Darah"
                      required
                    >
                      {golDarah.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="w-full bg-white gap-0"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <InputUi
                    name={`patient[${index}].suku`}
                    type={'text'}
                    placeholder={'Suku'}
                    defaultValue={patient.suku}
                    label={'Suku'}
                    onChange={(e) => handlePatientsChange(index, 'suku', e.target.value)}
                    required
                  />
                </div>
              ))}
              <Button
                className="bg-green-500 text-white rounded p-2 w-full mt-2"
                color="primary"
                onClick={addPatient}
              >
                Tambah Pasien Baru
              </Button>
            </div>
          )}
          {role === 'doctor' && (
            <>
              <div>
                <label className="text-sm font-medium text-neutral-800">Pilih Spesialis</label>
                <Select
                  name="specialist"
                  size="sm"
                  placeholder="Pilih Spesialis"
                  className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                  defaultSelectedKeys={[dataUpdateUser.specialist]}
                  required
                >
                  {specialists.map((item) => (
                    <SelectItem
                      key={item.specialistName}
                      value={item.specialistName}
                      className="w-full bg-white gap-0"
                    >
                      {item.specialistName}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <InputUi
                name={'licenceNumber'}
                type={'number'}
                label="No Lisensi"
                placeholder={'Licence Number'}
                defaultValue={dataUpdateUser.licenceNumber}
                required
              />
              <InputUi
                name={'address'}
                type={'text'}
                label={'Alamat'}
                placeholder={'Alamat'}
                defaultValue={dataUpdateUser.address}
                required
              />
              <div className="flex flex-col gap-4">
                <label>Schedule:</label>
                {schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex gap-2 w-full"
                  >
                    <InputUi
                      name={`schedule[${index}].day`}
                      type={'text'}
                      placeholder={'Hari'}
                      label={'Hari'}
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      defaultValue={schedule.day}
                      required
                    />
                    <InputUi
                      name={`schedule[${index}].startTime`}
                      type={'time'}
                      placeholder={'Jam Mulai'}
                      label={'Jam Mulai'}
                      onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                      defaultValue={schedule.startTime}
                      required
                    />
                    <InputUi
                      name={`schedule[${index}].endTime`}
                      type={'time'}
                      placeholder={'Jam Selesai'}
                      label={'Jam Selesai'}
                      onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                      defaultValue={schedule.endTime}
                      required
                    />
                    <Button
                      color="danger"
                      onClick={() => removeSchedule(index)}
                    >
                      <i className="bx bx-trash" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addSchedule}
                  className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2"
                >
                  <p className="bx bx-plus-circle text-xl" />
                  Add Schedule
                </Button>
              </div>
            </>
          )}
          {role === 'pharmacy' && (
            <>
              <InputUi
                name={'licenceNumber'}
                type={'number'}
                placeholder={'No Lisensi'}
                label={'No Lisensi'}
                defaultValue={dataUpdateUser.licenceNumber}
                required
              />
              <InputUi
                name={'address'}
                type={'text'}
                placeholder={'Alamat'}
                label={'Alamat'}
                defaultValue={dataUpdateUser.address}
                required
              />
            </>
          )}
          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setUpdateUser({})}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white rounded p-2"
              type="submit"
              color="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Update
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalUpdateUser;
