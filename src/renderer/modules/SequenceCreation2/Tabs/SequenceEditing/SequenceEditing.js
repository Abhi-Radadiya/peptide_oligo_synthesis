import TextArea from "./Component/TextArea"

export default function SequenceEditing(props) {
    const { handleScale, isExpanded } = props

    return (
        <>
            <div className="w-1/2 pr-4 border-r border-neutral-300 overflow-auto no-scrollbar">
                <TextArea isExpanded={isExpanded} handleScale={handleScale} />
            </div>
        </>
    )
}
