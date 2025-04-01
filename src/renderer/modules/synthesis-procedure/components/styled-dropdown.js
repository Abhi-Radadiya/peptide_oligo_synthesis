import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function StyledDropdown({ label, options, value, onChange, placeholder = "Select an option", error }) {
    const selectedOption = options.find((opt) => opt.id === value)

    return (
        <Listbox value={value} onChange={onChange}>
            {({ open }) => (
                <div className="relative">
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-700 mb-1">{label}</Listbox.Label>
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="block truncate">{selectedOption ? selectedOption.name : placeholder}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronsUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        classNames(active ? "bg-indigo-600 text-white" : "text-gray-900", "relative cursor-default select-none py-2 pl-3 pr-9")
                                    }
                                    value={option.id} // Pass the ID
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{option.name}</span>
                                            {selected ? (
                                                <span className={classNames(active ? "text-white" : "text-indigo-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
            )}
        </Listbox>
    )
}
