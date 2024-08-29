import userService from '@/services/user';
import { Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import ModalUi from '../../Ui/Modal';
import { ToasterContext } from '@/contexts/ToasterContext';

const ModalDeleteUser = ({ dataDeleteUser, setDeleteUser, onOpenChange, isOpen, setUsers }) => {
  const session = useSession();
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await userService.deleteUser(dataDeleteUser.id, session.data.accessToken);
      if (result.status === 200) {
        const { data } = await userService.getAllUsers(session.data.accessToken);
        setUsers(data.data);
        setDeleteUser({});
        setIsLoading(false);
        setToaster({
          variant: 'success',
          message: 'Berhasil menghapus user',
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Gagal menghapus user',
      });
    }
  };

  return (
    <div>
      <ModalUi
        title={''}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setDeleteUser}
      >
        <h4>
          Are you sure you want to delete <span className="text-red-500">{`"${dataDeleteUser.fullname}"`}</span>?
        </h4>
        <div className="w-full flex justify-end items-center gap-2 my-2">
          <Button
            color="danger"
            variant="light"
            onClick={() => setDeleteUser({})}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            className="bg-[#3b82f6] font-semibold text-white p-2 rounded-md"
            onClick={handleDeleteUser}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </ModalUi>
    </div>
  );
};

export default ModalDeleteUser;
