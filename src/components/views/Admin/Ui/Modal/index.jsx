import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';

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
      className="bg-white rounded-md max-h-[90vh] overflow-y-auto"
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
