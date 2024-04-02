import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import IconClose from "../Modules/Icons/IconClose";

interface ModalProps {
    title?: string
    children: ReactNode
    isOpen: boolean
    className?: string
    size?: "small" | "medium" | "large" | "extra" | "full";
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({
    title,
    children,
    isOpen,
    setIsOpen,
    className = "",
    size = "medium",
}: ModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20 dark:bg-black/50" />
                </Transition.Child>

                <div className="fixed flex flex-col top-0 left-0 right-0 bottom-0 h-screen w-screen md:pt-20 md:pb-10 py-5 px-1">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className={clsx(
                                "relative flex flex-col min-h-0 w-full mx-auto transform bg-white dark:bg-slate-800 rounded-lg shadow-xl transition-all pb-4",
                                {
                                    "max-w-md": size === "small",
                                    "max-w-xl": size === "medium",
                                    "max-w-3xl": size === "large",
                                    "max-w-7xl": size === "extra",
                                    "max-w-full h-full": size === "full"
                                }
                            )}
                        >
                            <div className={`relative font-semibold md:text-xl text-lg h-14 text-center border-b`}>
                                <Dialog.Title className={"leading-[56px]"}>{title}</Dialog.Title>
                                <button
                                    title="Nút thoát"
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-4 top-0 translate-y-[12px] bg-gray-200 hover:bg-gray-300 rounded-full outline-none"
                                >
                                    <IconClose size={32} className="p-[6px] fill-gray-700"/>
                                </button>
                            </div>
                            <div className="relative md:px-10 px-3 py-4 flex flex-col overflow-y-auto">{children}</div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
