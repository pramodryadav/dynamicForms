const express = require('express');
const {
    getCompanyCategories,
    handleMainFormSubmission,
    getInfoForm,
    getDocForm,
    handleUpdateInfoForm,
    uploadFile,
    getCustomerByID,
    handleUpdateMainForm,
    getCustomerInfoByID,
    getSubProjectFiles,
    updateDocumentStatus,

    getProjectDetail,
    getProjects,
    getProjectForms,
    handleFormSubmission,
    handleFormUpdate,
    getFormData
} = require('../controller/docuFactsController');

const {
    customerIdSchema,
    companyCategriesSchema,
    createCustomerSchema,
    updateCustomerSchema,
    infoFormSchema,
    updateCustomerInfoSchema,
    updateDocStatusSchema,
    validate,

    getProjectFormSchema,
    formSubmissionSchema,
    getFormDataSchema,
    formUpdateSchema,
    getFilesSchema
} = require("../validations/validationSchema")


const router = express.Router();


router.get('/company-categories', validate(companyCategriesSchema, "query"), getCompanyCategories);
router.post('/mainform-submit', validate(createCustomerSchema), handleMainFormSubmission);
router.post('/mainform-update', validate(updateCustomerSchema), handleUpdateMainForm)
router.get('/info-form', validate(infoFormSchema, "query"), getInfoForm);
router.get('/doc-form', getDocForm);
router.post('/info-form-update', validate(updateCustomerInfoSchema), handleUpdateInfoForm);

router.get('/get-customerById', validate(customerIdSchema, "query"), getCustomerByID);
router.get('/get-customerInfoById', validate(customerIdSchema, "query"), getCustomerInfoByID);
router.post('/update-docs-status', validate(updateDocStatusSchema), updateDocumentStatus);

//above routes not being used anymore

router.get('/get-subProject-files', validate(getFilesSchema, "query"), getSubProjectFiles);
router.post('/upload-file', uploadFile);
router.get('/get-projects-detail', getProjectDetail);
router.get('/list-projects', getProjects);
router.get('/project-forms', validate(getProjectFormSchema, "query"), getProjectForms);
router.post('/submit-form', validate(formSubmissionSchema), handleFormSubmission);
router.get('/form-json-data', validate(getFormDataSchema,"query"), getFormData);
router.post('/update-form',validate(formUpdateSchema),handleFormUpdate)


module.exports = router;