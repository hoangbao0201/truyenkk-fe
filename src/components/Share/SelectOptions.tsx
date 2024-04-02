import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import IconAngleDown from "../Modules/Icons/IconAngleDown";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
];

interface SelectOptionsProps {
    value: string
    options: string[]
    handleOnchange: any
}
export default function SelectOptions({ value, options, handleOnchange }: SelectOptionsProps) {

    return (
        <div className="max-w-[500px] w-full">
            <Listbox value={value} onChange={handleOnchange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-slate-600 py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{value}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IconAngleDown size={18} className="fill-gray-500"/>
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 absolute mt-1 max-h-[300px] w-full overflow-auto rounded-md bg-white dark:bg-slate-600 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {options.map((option, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-3 pr-3 ${
                                            active
                                                ? "bg-slate-500 text-gray-100"
                                                : "text-gray-900 dark:text-gray-100"
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {option}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
