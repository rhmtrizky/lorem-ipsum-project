import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import { gender, golDarah } from '@/constraint/adminPanel';
import useUser from '@/hooks/useUser';
import activityService from '@/services/activity';
import getDay from '@/utils/getDay';
import { Button, Checkbox, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ModalUpdatePatientPharmacy = ({ setActivities, updatePatient, setUpdatePatient, isOpen, onOpenChange, doctorName }) => {
  const { data: session } = useSession();
  const { users } = useUser();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getDataUser = users.find((user) => user.id === session.user.id);
    setDataUser(getDataUser);
  }, [session.user.id, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    if (updatePatient.isHandle.status === false) {
      const data = {
        id: updatePatient.id,
        isHandle: {
          status: true,
          apoteker: session?.user?.fullname,
          taken: formData.get('taken'),
        },
      };

      try {
        // Update the activity status isHandle is true and get taken time
        const result = await activityService.updateActivity(updatePatient.id, data, session.accessToken);

        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);
          setActivities(activitiesResult.data.data);
          onOpenChange(false);
          setUpdatePatient({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else if (updatePatient.isHandle.status && (updatePatient.isHandle.taken === 'today' || updatePatient.isHandle.taken === 'waiting')) {
      const data = {
        id: updatePatient.id,
        status: 'done',
        isHandle: {
          status: true,
          isTaken: isTaken ? true : false,
          apoteker: session?.user?.fullname,
          taken: 'done',
        },
      };

      console.log(data);

      try {
        // Update the activity status isHandle is true and get taken time
        const result = await activityService.updateActivity(updatePatient.id, data, session.accessToken);
        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);
          setActivities(activitiesResult.data.data);
          onOpenChange(false);
          setUpdatePatient({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendWhastappMessage = async (e) => {
    e.preventDefault();
    const getDate = new Date(updatePatient.bookDate);
    getDate.setDate(getDate.getDate() + 1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = getDate.toLocaleDateString('id-ID', options);
    const data = {
      id: updatePatient.id,
      isHandle: {
        status: true,
        apoteker: session?.user?.fullname,
        taken: 'waiting',
      },
    };
    try {
      // Update the activity status isHandle is true and get taken time
      const result = await activityService.updateActivity(updatePatient.id, data, session.accessToken);
      if (result.status === 200) {
        // Fetch the updated activities
        const activitiesResult = await activityService.getAllActivities(session.accessToken);
        setActivities(activitiesResult.data.data);
        onOpenChange(false);
        setUpdatePatient({});

        // Open whatsapp
        const urlToWhatsapp = `https://wa.me/${dataUser.phoneNumber}?text=Hallo, Selamat Pagi/Siang/Sore ${updatePatient.gender === 'male' ? 'Bapak' : 'Ibu'} ${updatePatient.name}. Kami dari RS Harapan Bunda, ingin menginfokan bahwa obat ${
          updatePatient.gender === 'male' ? 'Bapak' : 'Ibu'
        } sudah dapat diambil pada hari/tanggal ${formattedDate}, dengan batas waktu pengambilan pukul 12.00 WIB. Terima Kasih.  `;
        window.open(urlToWhatsapp, '_blank');
      }
    } catch (error) {
      console.error(error);
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
          <div className="flex flex-col gap-2 ">
            <label className="text-sm font-medium text-blue-900">Resep Dokter:</label>
            {updatePatient?.resepDokter.map((item, index) => (
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
                      defaultValue={item.namaObat}
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
                      defaultValue={item.dosis}
                      required
                    />
                    <InputUi
                      name={`item[${index}].hari`}
                      type={'text'}
                      placeholder={'Hari'}
                      label={'Hari'}
                      value={item.hari}
                      defaultValue={item.hari}
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
                    defaultValue={item.catatan}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium text-blue-900">Catatan Dokter</label>
            <Textarea
              key={'faded'}
              name="catatanDokter"
              variant={'faded'}
              labelPlacement="outside"
              defaultValue={updatePatient.catatanDokter}
              placeholder="Catatan Dokter"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
              required
            />
            <InputUi
              name="apoteker"
              type={'text'}
              placeholder={'Apoteker'}
              label={'Apoteker'}
              defaultValue={session?.user?.fullname}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              disabled
              required
            />
            {updatePatient?.isHandle?.status === false && (
              <div>
                <label className="text-sm font-medium text-blue-900">Hari ini/Besok?</label>
                <Select
                  name="taken"
                  size="sm"
                  placeholder="Ambil hari ini atau besok"
                  className="border-2 border-blue-300 rounded-md text-blue-900 text-sm"
                  required
                >
                  <SelectItem
                    key="today"
                    value="today"
                    className="w-full bg-white gap-0"
                  >
                    Hari ini
                  </SelectItem>
                  <SelectItem
                    key="tomorrow"
                    value="tomorrow"
                    className="w-full bg-white gap-0"
                  >
                    Besok
                  </SelectItem>
                </Select>
              </div>
            )}
            {updatePatient.isHandle.taken === 'tomorrow' && (
              <Button
                className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2 w-full"
                onClick={handleSendWhastappMessage}
                type="submit"
              >
                <p className="bx bxs-whatsapp text-xl" />
                Konfirmasi ke Pasien
              </Button>
            )}
            {updatePatient.isHandle.status && (
              <div className="w-full">
                <Checkbox
                  isSelected={isTaken}
                  onValueChange={setIsTaken}
                  className="w-full text-sm"
                >
                  Obat diambil (Jangan diceklist jika pasien tidak mengambil obat.)
                </Checkbox>
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  className="w-full text-sm"
                >
                  Pastikan semua data dan obat sudah benar.
                </Checkbox>
              </div>
            )}
          </div>

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
              className={`bg-[#3b82f6] font-semibold text-white p-2 rounded-md`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading..' : 'Submit'}
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalUpdatePatientPharmacy;
