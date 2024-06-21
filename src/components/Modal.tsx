import { PropsWithChildren } from "react";
import { Dispatch, SetStateAction } from "react";

interface IConfirmModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm: () => void;
}

function ConfirmModal({ setIsOpen, onConfirm }: IConfirmModalProps) {
    return (
        <Modal>
            <div className="text-center">
                <h2 className="text-2xl font-bold">Er du sikker?</h2>
                <div className="mt-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md"
                    >
                        Ja
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                        }}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                        Nej
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function ModalFullWidth({ children }: PropsWithChildren) {
    return (
        <div className="fixed inset-0 flex items-center justify-center mt-14">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10 w-full max-h-[800px] overflow-y-auto overscroll-none">
                {children}
            </div>
        </div>
    );
}

function Modal({ children }: PropsWithChildren) {
    return (
        <div className="fixed inset-0 flex items-center justify-center mt-14">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10 max-h-[800px] overflow-y-auto overscroll-none">
                {children}
            </div>
        </div>
    );
}

export {Modal, ConfirmModal, ModalFullWidth};