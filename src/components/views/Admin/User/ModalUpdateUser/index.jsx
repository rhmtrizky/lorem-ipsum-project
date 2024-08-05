import InputUi from '@/components/ui/Input';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const { default: ModalUi } = require('@/components/ui/Modal');

const ModalUpdateUser = ({ dataUpdateUser, setUpdateUser, onOpenChange, isOpen, setUsers }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(dataUpdateUser.role);
  const [schedules, setSchedules] = useState(dataUpdateUser.schedule || [{ day: '', time: '' }]);
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
      setSchedules(dataUpdateUser.schedule || [{ day: '', time: '' }]);
    }
  }, [dataUpdateUser]);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'pharmacy', label: 'Pharmacy' },
  ];

  const gender = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' },
  ];

  const golDarah = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
  ];

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
        const { data } = await userService.getAllUsers(session.data.accessToken);
        setUsers(data.data);
        setUpdateUser({});
        onOpenChange(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
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
    setSchedules([...schedules, { day: '', time: '' }]);
  };

  const removeSchedule = (index) => {
    const newSchedule = schedules.filter((_, i) => i === index);
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
              className="w-full text-neutral-700 shadow-md rounded min-h-[40px] bg-white"
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
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
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
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
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
              <InputUi
                name={'specialist'}
                type={'text'}
                placeholder={'Specialist'}
                label={'Specialist'}
                defaultValue={dataUpdateUser.specialist}
                required
              />
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
                      name={`schedule[${index}].time`}
                      type={'text'}
                      placeholder={'Jam'}
                      label={'Jam'}
                      onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                      defaultValue={schedule.time}
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
