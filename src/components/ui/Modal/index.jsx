import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import ModalUpdateUser from '@/components/views/Admin/User/ModalUpdateUser';

export default function ModalUi({ children, isOpen, onOpenChange, title, setCloseModal }) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setCloseModal({})}
      classNames={{
        backdrop: 'bg-gradient-to-t from-blue-500 to-blue-900/10 backdrop-opacity-20',
      }}
      className="bg-white rounded-md "
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
