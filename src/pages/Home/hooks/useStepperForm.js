import { useState, useEffect, useMemo } from "react";

import { getProjectForms } from "../../../services/subProjectService";
import Form from "../components/Form";

const useStepperForm = (subProjectDetail, selectedProject) => {
    const [activeStep, setActiveStep] = useState(0);
    const [responseData, setResponseData] = useState(subProjectDetail);
    const [subProjectName, setSubProjectName] = useState(subProjectDetail?.project_title || "");
    const [isSubProjectNameError, setIsSubProjectNameError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState([]);

    const projectID = selectedProject?.id || subProjectDetail?.data_project_id;
    useEffect(() => {
        fetchProjectForms(projectID);
    }, [projectID]);


    //console.log("subProjectDetail", subProjectDetail);

    const fetchProjectForms = async (id) => {
        try {
            const params = {
                projectID: id
            }
            setLoading(true);
            const res = await getProjectForms(params);
            //console.log("res", res);
            const data = res.data.data;
            const sortedData = data.sort((a, b) => (a.order_id - b.order_id));

            setSteps(sortedData);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleChangeSubProjectName = (e) => {

        if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
            setSubProjectName(e.target.value);
            setIsSubProjectNameError(false)
            // The input value is a valid name (only letters and spaces)
        } else {
            // Invalid name (contains invalid characters)
            setIsSubProjectNameError(true);
            setSubProjectName("")
        }

    }

    const handleBlurSubProjecName = () => {

        if (!subProjectName) {
            setIsSubProjectNameError(true)
        }

    }

    const handleNext = (data) => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setResponseData(data)

    };

    const handleClickPrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const stepForms = useMemo(() =>
        steps.map((step, index) => ({
            label: step.name,
            form: <Form
                key={step.id}
                formDetail={{ order_id: step.order_id, name: step.name }}
                next={handleNext}
                preResponse={responseData}
                back={handleClickPrevious}
                formFields={step?.form_json?.fields}
                currentStep={index + 1}
                isLastStep={steps.length === (index+1)}
                project_id={projectID}
                sub_project_name={subProjectName}
            />
        }))
        , [steps, subProjectName, projectID, responseData]);

    //console.log("selectedProject", selectedProject);

    //console.log("stepForms", stepForms);
    //console.log("steps", steps);



    return {
        activeStep,
        subProjectName,
        stepForms,
        isSubProjectNameError,
        loading,
        handleChangeSubProjectName,
        handleBlurSubProjecName
    }
}

export default useStepperForm