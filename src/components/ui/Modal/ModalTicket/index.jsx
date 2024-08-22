import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

export default function ModalTicketUi({ title, children, isOpen, onOpen, onOpenChange }) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      radius="lg"
      classNames={{
        body: 'py-6',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40  ',
        base: 'border-[#ffff] bg-[#fff] text-purple-800 rounded-lg  ',
        closeButton: 'hover:bg-white/5 active:bg-white/10',
      }}
    >
      <ModalContent className="relative">
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
