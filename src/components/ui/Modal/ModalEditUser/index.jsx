import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

export default function ModalEditUser({ title, children, isOpen, onOpen, onOpenChange }) {
    return (
        <>
            <Button
                onPress={onOpen}
                className='opacity-0 group-hover:opacity-50 w-full h-full text-white flex items-center justify-center'
            >
                <i className='bx bx-edit-alt text-5xl'></i>
            </Button>
            <Modal
                size="2xl"
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="outside"
                radius="lg"
                classNames={{
                    body: 'py-6',
                    backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
                    base: 'border-[#ffff] bg-[#fff] text-purple-800 rounded-lg',
                    closeButton: 'hover:bg-white/5 active:bg-white/10',
                }}
            >
                <ModalContent className="relative">
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
