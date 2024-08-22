import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import { gender, golDarah } from '@/constraint/adminPanel';
import activityService from '@/services/activity';
import getDay from '@/utils/getDay';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ModalUpdatePatient = ({ setActivities, updatePatient, setUpdatePatient, isOpen, onOpenChange, doctorName }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [resepDokter, setResepDokter] = useState([
    {
      namaObat: '',
      dosis: '',
      hari: '',
      catatan: '',
    },
  ]);

  const addResepDokter = () => {
    setResepDokter([...resepDokter, { namaObat: '', dosis: '', hari: '', catatan: '' }]);
  };

  const handleRemoveResepDokter = (index) => {
    const newResepDokter = resepDokter.filter((_, i) => i !== index);
    setResepDokter(newResepDokter);
  };

  const handleChangeResepDokter = (index, key, value) => {
    const newResepDokter = resepDokter.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    setResepDokter(newResepDokter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // form
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      id: updatePatient?.id,
      resepDokter: resepDokter,
      catatanDokter: formData.get('catatanDokter'),
      status: 'take medicine',
      isHandle: {
        status: false,
        taken: '',
      },
    };
    console.log(data);

    try {
      const response = await activityService.updateActivity(updatePatient.id, data, session?.accessToken);
      console.log(response);
      if (response.status === 200) {
        const { data } = await activityService.getAllActivities(session.data.accessToken);
        setActivities(data.data);
        setIsLoading(false);
        setUpdatePatient({});
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setUpdatePatient({});
    }
  };
  return (
    <div>
      <ModalUi
        title={''}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setUpdatePatient}
      >
        <form
          className="flex flex-col justify-center items-center gap-1"
          // ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="w-fit flex flex-col justify-center items-center text-white font-semibold bg-blue-500 h-[80px] w-[120px] rounded-md ">
            <h1>Ticket Queue</h1>
            <h1 className="text-4xl font-bold">{updatePatient?.queueNumber}</h1>
          </div>
          <h1 className="font-semibold text-blue-900">Status : {updatePatient?.status?.charAt(0).toUpperCase() + updatePatient?.status.slice(1)}</h1>
          <div className="border-2 border-blue-300 rounded-md p-3 w-full text-md text-blue-900 flex flex-col gap-1 mt-2">
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-user font-semibold" />
                <p> Doctor</p>
              </h1>
              <p className="text-sm">{doctorName}</p>
            </div>

            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-time-five"></i>
                <p>Schedule</p>
              </h1>
              <p className="text-sm">
                {updatePatient?.schedule?.day} - ({updatePatient?.schedule?.startTime} - {updatePatient?.schedule?.endTime})
              </p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-time-five"></i>
                <p>Book Date</p>
              </h1>
              <p className="text-sm">
                {getDay(updatePatient.bookDate)}, {updatePatient.bookDate}
              </p>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col gap-3">
            <InputUi
              name="name"
              type={'text'}
              placeholder={'Nama'}
              label={'Nama Pasien'}
              defaultValue={updatePatient.name}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={updatePatient.status !== 'queue' ? true : false}
            />
            <InputUi
              name="nik"
              type={'text'}
              placeholder={'NIK'}
              label={'NIK'}
              defaultValue={updatePatient.nik}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={updatePatient.status !== 'queue' ? true : false}
            />
            <InputUi
              name="bpjsNumber"
              type={'number'}
              placeholder={'No BPJS'}
              label={'No BPJS'}
              defaultValue={updatePatient.bpjsNumber}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={updatePatient.status !== 'queue' ? true : false}
            />
            <InputUi
              name="bornPlace"
              type={'text'}
              placeholder={'Tempat Lahir'}
              label={'Tempat Lahir'}
              defaultValue={updatePatient.bornPlace}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={updatePatient.status !== 'queue' ? true : false}
            />
            <InputUi
              name="bornDate"
              type={'date'}
              placeholder={'Tanggal Lahir'}
              label={'Tanggal Lahir'}
              defaultValue={updatePatient.bornDate}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={updatePatient.status !== 'queue' ? true : false}
            />
            <div>
              <label className="text-sm font-medium text-neutral-800">Jenis Kelamin</label>
              <Select
                name="gender"
                size="sm"
                placeholder="Jenis Kelamin"
                className={'border-2 border-blue-300 rounded-md text-blue-900'}
                defaultSelectedKeys={[updatePatient.gender]}
                required
                disabled={updatePatient.status !== 'queue' ? true : false}
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
            <div>
              <label className="text-sm font-medium text-neutral-800">Golongan Darah</label>
              <Select
                name="golDarah"
                size="sm"
                placeholder="Golongan Darah"
                className={'border-2 border-blue-300 rounded-md text-blue-900'}
                defaultSelectedKeys={[updatePatient.golDarah]}
                required
                disabled={updatePatient.status !== 'queue' ? true : false}
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
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium text-blue-900">Alamat</label>
              <Textarea
                key={'faded'}
                name="address"
                variant={'faded'}
                labelPlacement="outside"
                placeholder="Alamat"
                defaultValue={updatePatient.address}
                className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                disabled={updatePatient.status !== 'queue' ? true : false}
              />
            </div>
            <InputUi
              name="keluhan"
              type={'text'}
              placeholder={'Keluhan'}
              label={'Keluhan'}
              defaultValue={updatePatient.keluhan}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              disabled={updatePatient.status !== 'queue' ? true : false}
              required
            />
          </div>
          {updatePatient.status === 'checkup' && (
            <>
              <div className="flex flex-col gap-2 ">
                <label className="text-sm font-medium text-blue-900">Resep Dokter:</label>
                {resepDokter.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 w-full items-center border-2 border-blue-300 rounded-md p-4"
                  >
                    <div className="flex gap-2 w-full items-center w-full justify-center">
                      <div className="w-2/4">
                        <InputUi
                          name={`item[${index}].namaObat`}
                          type={'text'}
                          placeholder={'Nama Obat'}
                          value={item.namaObat}
                          label={'Nama Obat'}
                          onChange={(e) => handleChangeResepDokter(index, 'namaObat', e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-2/4 flex gap-2">
                        <InputUi
                          name={`item[${index}].dosis`}
                          type={'number'}
                          placeholder={'Dosis'}
                          label={'Dosis'}
                          value={item.dosis}
                          onChange={(e) => handleChangeResepDokter(index, 'dosis', e.target.value)}
                          required
                        />
                        <InputUi
                          name={`item[${index}].hari`}
                          type={'text'}
                          placeholder={'Hari'}
                          label={'Hari'}
                          value={item.hari}
                          onChange={(e) => handleChangeResepDokter(index, 'hari', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <InputUi
                        name={`item[${index}].catatan`}
                        type={'text'}
                        placeholder={'Catatan'}
                        label={'Catatan'}
                        value={item.hari}
                        onChange={(e) => handleChangeResepDokter(index, 'catatan', e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      color="danger"
                      onClick={() => handleRemoveResepDokter(index)}
                    >
                      <i className="bx bx-trash" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addResepDokter}
                  className="text-xs flex items-center gap-1 items-center bg-blue-500 text-white p-2 rounded-md mt-2"
                >
                  <p className="bx bx-plus-circle text-xl" />
                  Tambah Resep Obat
                </Button>
              </div>
              <div className="w-full flex flex-col gap-1">
                <label className="text-sm font-medium text-blue-900">Catatan Dokter</label>
                <Textarea
                  key={'faded'}
                  name="catatanDokter"
                  variant={'faded'}
                  labelPlacement="outside"
                  placeholder="Catatan Dokter"
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                  required
                />
              </div>
            </>
          )}

          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setUpdatePatient({})}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              className={`${updatePatient.status !== 'checkup' ? 'bg-[#9BC1FF]' : 'bg-[#3b82f6]'}  font-semibold text-white p-2 rounded-md`}
              disabled={isLoading || updatePatient.status !== 'checkup'}
            >
              {isLoading ? 'Loading..' : 'Submit'}
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalUpdatePatient;
