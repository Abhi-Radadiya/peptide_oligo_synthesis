import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "lucide-react"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function StyledRadioGroup({ label, options, value, onChange, error, checked }) {
    return (
        <RadioGroup value={value} onChange={onChange} className="mt-2">
            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-700 mb-1">{label}</RadioGroup.Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {options.map((option) => (
                    <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        className={({ active, checked }) =>
                            classNames(
                                "cursor-pointer focus:outline-none",
                                active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                                checked ? "bg-indigo-600 text-white hover:bg-indigo-500" : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                            )
                        }
                    >
                        <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                        {checked && <CheckCircleIcon className="ml-2 h-5 w-5 text-white" />}
                    </RadioGroup.Option>
                ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </RadioGroup>
    )
}
