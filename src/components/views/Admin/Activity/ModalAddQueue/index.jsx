import InputUi from '@/components/ui/Input';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import getDay from '@/utils/getDay';
import activityService from '@/services/activity';
import ModalUi from '../../Ui/Modal';
import generateQueueNumber from '@/utils/generateQueueNumber';
import BookingRules from '@/utils/BookingRules';

const ModalAddQueue = ({ onOpenChange, isOpen, setAddQueue, users, activities, setActivities, setTicketQueue, specialists }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const session = useSession();

  // filtering patients and doctors
  useEffect(() => {
    setPatients(users.filter((user) => user.role === 'patient'));
    setDoctors(users.filter((user) => user.role === 'doctor'));
  }, [users]);

  // select patient account
  const [patientAccId, setPatientAccId] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  useEffect(() => {
    const foundPatient = patients.find((patient) => patient.id === patientAccId);
    setSelectedPatient(foundPatient || null);
  }, [patientAccId, patients]);

  // select patient by index
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

  // select spesialist
  const [selectedSpesialist, setSelectedSpesialist] = useState('');
  const [doctorSpesialist, setDoctorSpesialist] = useState('');

  useEffect(() => {
    setDoctorSpesialist(doctors.filter((doctor) => doctor.specialist === selectedSpesialist));
  }, [selectedSpesialist, doctors]);

  // select doctor
  const [selectDoctor, setSelectDoctor] = useState('');
  const [getDocter, setGetDocter] = useState({});
  useEffect(() => {
    if (doctorSpesialist.length > 0) {
      setGetDocter(doctorSpesialist.find((doctor) => doctor.id === selectDoctor));
    }
  }, [doctorSpesialist, selectDoctor]);

  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [getSchedule, setGetSchedule] = useState({});

  useEffect(() => {
    if (selectedSchedule) {
      setGetSchedule(getDocter?.schedule[selectedSchedule]);
    }
  }, [getDocter, selectedSchedule]);

  // book date logic
  const [bookDate, setBookDate] = useState('');
  const [bookDay, setBookDay] = useState('');
  const [resultCompare, setResultCompare] = useState({});

  useEffect(() => {
    if (bookDate) {
      setBookDay(getDay(bookDate));
    }
  }, [bookDate]);

  // booking date rules
  useEffect(() => {
    BookingRules({ bookDate, bookDay, getDocter, getSchedule });
    setResultCompare(BookingRules({ bookDate, bookDay, getDocter, getSchedule }));
  }, [bookDate, bookDay, getDocter, getSchedule, setResultCompare]);

  // handle add queue
  const handleAddQueue = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const formData = new FormData(form);

    const queueNumber = generateQueueNumber({
      activities,
      selectedSpesialist,
      bookDate,
      doctorId: selectDoctor,
    });
    console.log(queueNumber);

    let data = {
      queueNumber: queueNumber,
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
      keluhan: formData.get('keluhan'),
      bookDate: bookDate,
      schedule: getSchedule,
      status: 'queue',
    };

    try {
      const result = await activityService.addQueue(data, session.data.accessToken);
      if (result.status === 200) {
        const result = await activityService.getAllActivities(session.data.accessToken);
        setActivities(result.data.data);
        onOpenChange(false);
        setIsLoading(false);
        setAddQueue({ status: false });
        setTicketQueue(data);
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
              {selectedSpesialist && (
                <div>
                  <label className="text-sm font-medium text-neutral-800">Pilih Dokter</label>
                  <Select
                    name="doctorId"
                    size="sm"
                    placeholder="Pilih Dokter"
                    className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                    onChange={(e) => setSelectDoctor(e.target.value)}
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
              )}
              {selectDoctor && (
                <>
                  <div>
                    <label className="text-sm font-medium text-neutral-800">Pilih Jadwal</label>
                    <Select
                      name="schedule"
                      size="sm"
                      placeholder="Pilih Jadwal"
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      onChange={(e) => setSelectedSchedule(e.target.value)}
                      required
                    >
                      {getDocter?.schedule?.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={index}
                          className="w-full bg-white gap-0"
                        >
                          {`${item.day} - (${item.startTime} - ${item.endTime})`}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <InputUi
                      name="bookDate"
                      type="date"
                      label={'Tgl. Booking'}
                      placeholder="Tgl. Booking"
                      onChange={(e) => setBookDate(e.target.value)}
                      required
                    />
                    {Object.keys(resultCompare).length > 0 && <p className={`${resultCompare.status ? 'text-blue-800' : 'text-red-500'} text-sm italic`}>*{resultCompare.message}</p>}
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
              className={`${resultCompare.status ? 'bg-[#3b82f6]' : 'bg-[#86B5FF]'} font-semibold text-white p-2 rounded-md`}
              isDisabled={isLoading || !resultCompare.status}
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
