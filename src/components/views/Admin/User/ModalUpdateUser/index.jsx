import InputUi from '@/components/ui/Input';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const { default: ModalUi } = require('@/components/ui/Modal');

const ModalUpdateUser = ({ dataUpdateUser, setUpdateUser, onOpenChange, isOpen, setUsers }) => {
  const session = useSession();
  const [isLoading, setIsloading] = useState(false);

  const roles = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'patient',
      label: 'Patient',
    },
    {
      value: 'doctor',
      label: 'Doctor',
    },
    {
      value: 'pharmacy',
      label: 'Pharmacy',
    },
  ];

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      role: form.role.value,
    };
    try {
      const result = await userService.updateUser(dataUpdateUser.id, data, session.data.accessToken);
      console.log(result);
      if (result.status === 200) {
        const { data } = await userService.getAllUsers(session.data.accessToken);
        setUsers(data.data);
        setUpdateUser({});
        onOpenChange(false);
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
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
          action=""
          onSubmit={handleUpdateUser}
        >
          <InputUi
            name="fullname"
            type={'text'}
            placeholder={'Fullname'}
            defaultValue={dataUpdateUser.fullname}
          />
          <InputUi
            name={'email'}
            type={'email'}
            placeholder={'Email'}
            defaultValue={dataUpdateUser.email}
          />
          <InputUi
            name={'phoneNumber'}
            type={'number'}
            placeholder={'Phone Number'}
            defaultValue={dataUpdateUser.phoneNumber === null ? 'No phone number yet' : dataUpdateUser.phoneNumber}
          />
          <Select
            name="role"
            size="sm"
            defaultSelectedKeys={[dataUpdateUser.role]}
            className="w-full text-neutral-700 shadow-md rounded min-h-[40px] bg-white"
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
          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setUpdateUser({})}
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

export default ModalUpdateUser;
