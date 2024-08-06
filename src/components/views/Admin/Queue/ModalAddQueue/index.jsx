import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import queueService from '@/services/queue';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ModalAddQueue = ({ onOpenChange, isOpen, setUsers, setAddQueue, users, queues, setQueues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const session = useSession();

  useEffect(() => {
    setPatients(users.filter((user) => user.role === 'patient'));
    setDoctors(users.filter((user) => user.role === 'doctor'));
  }, [users]);

  const [patientAccId, setPatientAccId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const foundPatient = patients.find((patient) => patient.id === patientAccId);
    setSelectedPatient(foundPatient || null);
  }, [patientAccId, patients]);

  const [indexPatient, setIndexPatient] = useState();
  const [currentPatientData, setCurrentPatientData] = useState(null);

  useEffect(() => {
    if (selectedPatient && selectedPatient.patient && selectedPatient.patient.length > 0) {
      if (indexPatient >= 0 && indexPatient < selectedPatient.patient.length) {
        setCurrentPatientData(selectedPatient.patient[indexPatient]);
      } else {
        setCurrentPatientData(null);
      }
    } else {
      setCurrentPatientData(null);
    }
  }, [selectedPatient, indexPatient]);

  const spesialists = [
    {
      label: 'Umum',
      value: 'umum',
    },
    {
      label: 'Poli Gigi',
      value: 'poli gigi',
    },
    {
      label: 'Poli Mata',
      value: 'poli mata',
    },
  ];

  const [selectedSpesialist, setSelectedSpesialist] = useState('');
  const [doctorSpesialist, setDoctorSpesialist] = useState('');
  useEffect(() => {
    setDoctorSpesialist(doctors.filter((doctor) => doctor.specialist === selectedSpesialist));
  }, [selectedSpesialist, doctors]);

  const handleAddQueue = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const formData = new FormData(form);

    let data = {
      queueNumber: queues.length + 1,
      userId: patientAccId,
      name: currentPatientData.name,
      nik: formData.get('nik'),
      bpjsNumber: formData.get('bpjsNumber'),
      bornPlace: formData.get('bornPlace'),
      bornDate: formData.get('bornDate'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      golDarah: formData.get('golDarah'),
      specialist: formData.get('specialist'),
      doctorId: formData.get('doctorId'),
      status: 'queue',
    };

    try {
      const result = await queueService.addQueue(data, session.data.accessToken);
      if (result.status === 200) {
        const { data } = await queueService.getAllQueues(session.data.accessToken);
        setQueues(data.data);
        onOpenChange(false);
        setIsLoading(false);
        setAddQueue({ status: false });
      }
    } catch (err) {
      console.log(err);
      onOpenChange(false);
      setIsLoading(false);
      setAddQueue({ status: false });
    }
  };

  return (
    <div>
      <ModalUi
        title={'Add New Queue'}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setAddQueue}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleAddQueue}
        >
          <div>
            <label className="text-sm font-medium text-neutral-800">Pilih Akun</label>
            <Select
              name="patient"
              size="sm"
              placeholder="Select Account"
              className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
              required
              onChange={(e) => setPatientAccId(e.target.value)}
            >
              {patients.map((patient) => (
                <SelectItem
                  key={patient.id}
                  value={patient.id}
                  className="w-full bg-white gap-0"
                >
                  {patient.fullname}
                </SelectItem>
              ))}
            </Select>
          </div>
          {selectedPatient && (
            <div>
              <label className="text-sm font-medium text-neutral-800">Pilih Pasien</label>
              <Select
                name="index"
                size="sm"
                placeholder="Select Patient"
                className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                required
                onChange={(e) => setIndexPatient(parseInt(e.target.value))}
              >
                {selectedPatient?.patient?.map((patient, index) => (
                  <SelectItem
                    key={index}
                    value={index}
                    className="w-full bg-white gap-0"
                  >
                    {patient.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
          {currentPatientData ? (
            <>
              <InputUi
                name="nik"
                type="number"
                label={'NIK'}
                placeholder="NIK"
                defaultValue={currentPatientData.nik}
                required
              />
              <InputUi
                name="bpjsNumber"
                type="number"
                label={'No BPJS'}
                placeholder="NIK"
                defaultValue={currentPatientData.bpjsNumber}
                required
              />
              <InputUi
                name="bornPlace"
                type="text"
                label={'Tempat Lahir'}
                placeholder="Tempat Lahir"
                defaultValue={currentPatientData.bornPlace}
                required
              />
              <InputUi
                name="bornDate"
                type="text"
                label={'Tanggal Lahir'}
                placeholder="Tanggal Lahir"
                defaultValue={currentPatientData.bornDate}
                required
              />
              <InputUi
                name="gender"
                type="text"
                label={'Jenis Kelamin'}
                placeholder="Jenis Kelamin"
                defaultValue={currentPatientData.gender}
                required
              />
              <InputUi
                name="golDarah"
                type="text"
                label={'Golongan Darah'}
                placeholder="Golongan Darah"
                defaultValue={currentPatientData.golDarah}
                required
              />
              <InputUi
                name="fatherName"
                type="text"
                label={'Nama Ayah'}
                placeholder="Nama Ayah"
                defaultValue={currentPatientData.fatherName}
                required
              />
              <InputUi
                name="motherName"
                type="text"
                label={'Nama Ibu'}
                placeholder="Nama Ibu"
                defaultValue={currentPatientData.motherName}
                required
              />
              <InputUi
                name="address"
                type="text"
                label={'Alamat'}
                placeholder="Alamat"
                defaultValue={currentPatientData.address}
                required
              />
              <InputUi
                name="suku"
                type="text"
                label={'Suku'}
                placeholder="Suku"
                defaultValue={currentPatientData.suku}
                required
              />
              <div>
                <label className="text-sm font-medium text-neutral-800">Pilih Spesialis</label>
                <Select
                  name="specialist"
                  size="sm"
                  placeholder="Pilih Spesialis"
                  className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                  required
                  onChange={(e) => setSelectedSpesialist(e.target.value)}
                >
                  {spesialists.map((item) => (
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
              {selectedSpesialist && (
                <>
                  <div>
                    <label className="text-sm font-medium text-neutral-800">Pilih Dokter</label>
                    <Select
                      name="doctorId"
                      size="sm"
                      placeholder="Pilih Dokter"
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      required
                    >
                      {doctorSpesialist?.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="w-full bg-white gap-0"
                        >
                          {item.fullname}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <InputUi
                    name="keluhan"
                    type="text"
                    label={'Keluhan'}
                    placeholder="Keluhan"
                    required
                  />
                </>
              )}
            </>
          ) : null}

          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setAddQueue(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              className="bg-[#3b82f6] font-semibold text-white p-2 rounded-md"
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalAddQueue;
