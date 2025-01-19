import React, { useEffect, useState } from "react";
import FirstMethod from "./Tabs/First/FirstMethod";
import NthMethod from "./Tabs/Nth/NthMethod";
import LastMethod from "./Tabs/Last/LastMethod";
import { FormProvider, useForm } from "react-hook-form";
import LeftPanel from "../../Components/LeftPanel/LeftPanel";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import MethodDetails from "./Tabs/Details/MethodDetails";
import Footer from "./Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addMethodSetup, updateMethodSetup } from "../../../redux/reducers/methodSetup/methodSetup";
import { updateFormState } from "../../../redux/reducers/formState/formState";
import { openToast } from "../../../redux/reducers/toastStateReducer/toastStateReducer";
import { SUCCESS } from "../../Helpers/Icons";

export default function MethodSetting(props) {
    const { id } = props;

    const methods = useSelector((state) => state.methodSetup.method);

    const initialState = {
        "1_waste": { label: 1, value: 1 },
        n_deWaste: { label: 1, value: 1 },
        n_couplingWaste: { label: 1, value: 1 },
        n_oxidizationWaste: { label: 1, value: 1 },
        n_sulfurizationWaste: { label: 1, value: 1 },
        n_extraWaste: { label: 1, value: 1 },
        n_cappingWaste: { label: 1, value: 1 },
        last_deWaste: { label: 1, value: 1 },

        last_deaWaste: { label: 1, value: 1 },
        "1_primingWaste": { label: 1, value: 1 },
        last_deaXFactor: 1,
        last_deaWashXFactor: 1,

        last_deXFactor: 1,
        last_deWashXFactor: 1,
        "1_XFactor": 1,
        "1_primingXFactor": 1,
        n_deXFactor: 1,
        n_deWashXFactor: 1,
        n_couplingXFactor: 1,
        n_couplingWashXFactor: 1,
        n_oxidizationXFactor: 1,
        n_oxidizationWashXFactor: 1,
        n_sulfurizationXFactor: 1,
        n_sulfurizationWashXFactor: 1,
        n_extraXFactor: 1,
        n_extraWashXFactor: 1,
        n_cappingAXFactor: 1,
        n_cappingBXFactor: 1,
        n_cappingWashXFactor: 1,
        hasOxidization: true,
        method_name: "",
        columnSize: "",
        synthesisScale: "",
        loadingTime: "",
        amediteExcessFactor: "",
        actExcessFactor: "",
        amediteConcentration: "",
        last_deVolume: "",
        last_deWashVolume: "",
        last_deaVolume: "",
        last_deaWashVolume: "",
        last_deaFlowRate: "",
        last_deaWashFlowRate: "",
        last_deFlowRate: "",
        last_deWashFlowRate: "",
        last_deUVEnable: "",
        last_deCheck: false,
    };

    const getDefaultValue = () => {
        if (id) {
            return methods.find((el) => el.id === id);
        }
        return initialState;
    };

    const method = useForm({
        defaultValues: { ...getDefaultValue() },
    });

    const steps = [
        { label: "Details", value: "detail", component: MethodDetails },
        { label: "Initial Step", value: "firstMethod", component: FirstMethod },
        { label: "Run Step", value: "nThMethod", component: NthMethod },
        { label: "Final Step", value: "lastMethod", component: LastMethod },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const ComponentToRender = steps.find((_, index) => index === activeStep).component;

    const { height: windowHeight } = useWindowSize();

    const {
        handleSubmit,
        setError,
        formState: { isDirty, errors },
    } = method;

    useEffect(() => {
        dispatch(updateFormState(isDirty));
    }, [isDirty]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saveMethod = (data) => {
        dispatch(addMethodSetup(data));
        navigate("/method-setup");
    };

    const editMethod = (data) => {
        dispatch(updateMethodSetup(data));
        navigate("/method-setup");
    };

    const isErrorGenerated = (data) => {
        let isError = false;

        if (!data.color) {
            setError("color", { message: "Please select a color" });
            isError = true;
        }

        return isError;
    };

    const handleSave = (data) => {
        if (isErrorGenerated(data)) {
            return;
        }

        activeStep === 3 ? (!!id ? editMethod(data) : saveMethod(data)) : setActiveStep(activeStep + 1);

        dispatch(openToast({ text: "Method created successfully.", icon: SUCCESS }));

        dispatch(updateFormState(false));
    };

    return (
        <>
            <div className="relative px-4 pt-4">
                <div className="flex flex-row relative">
                    <LeftPanel errors={errors} tabs={steps} activeStep={activeStep} setActiveStep={setActiveStep} />

                    <FormProvider {...method}>
                        <div className="border-l relative border-neutral-500 pl-6 w-full pb-12 overflow-auto scrollbar-style pr-2" style={{ height: windowHeight - 36 }}>
                            <ComponentToRender setActiveStep={setActiveStep} />
                        </div>

                        <Footer onClick={handleSubmit(handleSave)} label={activeStep === 3 ? "Save" : "Next"} />
                    </FormProvider>
                </div>
            </div>
        </>
    );
}

const flags = {
    n: {
        deBlock: ["n_deSolvent", "n_deVolume", "n_deXFactor", "n_deWashSolvent", "n_deWashVolume", "n_deWashXFactor", "n_deUVEnable", "n_deCheck", "n_deWaste"],
        amedite: [
            "n_couplingSolvent",
            "n_couplingVolume",
            "n_couplingXFactor",
            "n_couplingFlowRate",
            "n_couplingMixTime",
            "n_couplingAmediteVolume",
            "n_couplingActVolume",
            "n_couplingWashSolvent",
            "n_couplingWashVolume",
            "n_couplingWashXFactor",
            "n_couplingUVEnable",
            "n_couplingCheck",
            "n_couplingWaste",
        ],
        oxidization: [
            "n_oxidizationSolvent",
            "n_oxidizationVolume",
            "n_oxidizationXFactor",
            "n_oxidizationWashSolvent",
            "n_oxidizationWashVolume",
            "n_oxidizationWashXFactor",
            "n_oxidizationConductivity",
            "n_oxidizationCheck",
            "n_oxidizationWaste",
        ],
        sulfurization: [
            "n_sulfurizationSolvent",
            "n_sulfurizationVolume",
            "n_sulfurizationXFactor",
            "n_sulfurizationWashSolvent",
            "n_sulfurizationWashVolume",
            "n_sulfurizationWashXFactor",
            "n_sulfurizationConductivityEnable",
            "n_sulfurizationCheck",
            "n_sulfurizationWaste",
        ],
        extra: ["n_extraSolvent", "n_extraVolume", "n_extraXFactor", "n_extraWashSolvent", "n_extraWashVolume", "n_extraWashXFactor", "n_extraWaste"],
        capping: [
            "n_cappingASolvent",
            "n_cappingAVolume",
            "n_cappingAXFactor",
            "n_cappingBSolvent",
            "n_cappingBVolume",
            "n_cappingBXFactor",
            "n_cappingWashSolvent",
            "n_cappingWashVolume",
            "n_cappingWashXFactor",
            "n_cappingWaste",
        ],
    },
};
