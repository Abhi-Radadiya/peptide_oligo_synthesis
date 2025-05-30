import { Edit3Icon } from "lucide-react"
import { AMEDITE, COLUMN_SIZE, SYNTHESIS_SCALE, ACT, AMEDITE_CONC, COUPLING, OXIDIZATION, SULFURIZATION, CAP_A_B, FINAL_DE_BLOCK, DEA, WASH_COLUMN, PRIME } from "../constants"

export default function TableComponent(props) {
    const { methodData, column } = props

    let text

    switch (column.label) {
        case COLUMN_SIZE:
            text = methodData?.columnSize?.label ?? "-"
            break

        case SYNTHESIS_SCALE:
            text = methodData?.synthesisScale ?? "-"
            break

        case AMEDITE:
            // TODO: ask to mohammadsir is it correct
            text = methodData?.amediteExcessFactor ?? "-"
            break

        case ACT:
            text = methodData?.actExcessFactor ?? "-"
            break

        case AMEDITE_CONC:
            text = methodData?.amediteConcentration ?? "-"
            break

        case WASH_COLUMN:
        case PRIME:
        case COUPLING:
        case OXIDIZATION:
        case SULFURIZATION:
        case CAP_A_B:
        case FINAL_DE_BLOCK:
        case DEA:
        default:
            text = "Edit"
            break
    }

    return (
        <>
            <span className="group:hover:text-blue-700">{text}</span>
            <span className="text-blue-500">
                <Edit3Icon size={18} />
            </span>
        </>
    )
}
