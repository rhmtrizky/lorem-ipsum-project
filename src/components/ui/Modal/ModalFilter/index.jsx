import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

export default function ModalFilterUi({ title, children, setSpecialist, setDay }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-14 h-13 bg-white flex items-center justify-center rounded-lg"
      >
        <i className="bx bx-filter-alt text-[#654AB4] bg-white font"></i>
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
          base: 'border-[#ffff] bg-[#fff] dark:bg-[#fff] text-[#5363A6] z-0 overflow-none rounded-lg',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter className="flex ">
                <Button
                  className="bg-[#B53E29] rounded-lg text-white"
                  onClick={() => {
                    setSpecialist('');
                    setDay('');
                    onClose();
                  }}
                >
                  Reset
                </Button>
                <Button
                  className="bg-[#4554D9] rounded-lg text-white"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Terapkan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
