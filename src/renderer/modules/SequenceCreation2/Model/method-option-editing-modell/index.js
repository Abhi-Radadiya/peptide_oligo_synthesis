import ColumnSize from "./components/column-size"
import SynthesisScale from "./components/synthesis-scale"
import AmediteExcessFactor from "./components/amedite-excess-factor"
import ActExcessFactor from "./components/act-excess-factor"
import AmediteConcentration from "./components/amedite-concentration"
import WashColumn from "./components/wash-column"
import {
    COLUMN_SIZE,
    SYNTHESIS_SCALE,
    AMEDITE,
    ACT,
    AMEDITE_CONC,
    PRIME,
    COUPLING,
    OXIDIZATION,
    SULFURIZATION,
    CAP_A_B,
    FINAL_DE_BLOCK,
    DEA,
    WASH_COLUMN
} from "../../Component/constants"
import { ModelButton } from "../../../../Components/Buttons/Buttons"
import ModelWrapper from "../../../../Components/Model/ModelWrapper"
import Prime from "./components/prime"
import Coupling from "../../../MethodSetup2/Tabs/Nth/Tabs/Coupling"
import Oxidization from "../../../MethodSetup2/Tabs/Nth/Tabs/Oxidization"
import Sulfurization from "../../../MethodSetup2/Tabs/Nth/Tabs/Sulfurization"
import Capping from "../../../MethodSetup2/Tabs/Nth/Tabs/Capping"
import DeBlock from "../../../MethodSetup2/Tabs/Last/Tabs/DeBlock"
import DEATab from "../../../MethodSetup2/Tabs/Last/Tabs/DEA"
import { useFormContext } from "react-hook-form"

export default function MethodOptionEditingModel(props) {
    const { onClose, options } = props

    const { setValue, watch } = useFormContext()

    const handleSave = () => {
        const updatedFields = Object.fromEntries(options?.detailsGroupName?.map((el) => [el, watch(el)]) || [])

        setValue(`sequence[${options.index}].methodData`, { ...watch(`sequence[${options.index}].methodData`), ...updatedFields })

        onClose()
    }

    return (
        <>
            <ModelWrapper header="Edit Method Option" width="w-[1000px]" onClose={onClose}>
                <div className="max-h-[75vh] -mr-5 pr-5 overflow-y-auto scrollbar-style">
                    {options?.label === COLUMN_SIZE && <ColumnSize />}

                    {options?.label === SYNTHESIS_SCALE && <SynthesisScale />}

                    {options?.label === AMEDITE && <AmediteExcessFactor />}

                    {options?.label === ACT && <ActExcessFactor />}

                    {options?.label === AMEDITE_CONC && <AmediteConcentration />}

                    {options?.label === PRIME && <Prime />}

                    {options?.label === COUPLING && <Coupling />}

                    {options?.label === OXIDIZATION && <Oxidization />}

                    {options?.label === SULFURIZATION && <Sulfurization />}

                    {options?.label === CAP_A_B && <Capping />}

                    {options?.label === FINAL_DE_BLOCK && <DeBlock />}

                    {options?.label === DEA && <DEATab />}

                    {options?.label === WASH_COLUMN && <WashColumn />}
                </div>

                <ModelButton onCancel={onClose} handleSave={handleSave} />
            </ModelWrapper>
        </>
    )
}
