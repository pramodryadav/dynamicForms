const express = require('express');
const {
    getMainForm,
    getCompanyCategories,
    handleMainFormSubmission,
    getInfoForm,
    getDocForm,
    handleUpdateInfoForm,
    uploadFile,
    getAllCustomers,
    getCustomerByID,
    handleUpdateMainForm,
    getCustomerInfoByID,
    getCustomerFiles,
    updateDocumentStatus,
    getDocsStatus
} = require('../controller/auditController');

const {
    customerIdSchema,
    companyCategriesSchema,
    createCustomerSchema,
    updateCustomerSchema,
    infoFormSchema,
    updateCustomerInfoSchema,
    updateDocStatusSchema,
    validate } = require("../validations/validationSchema")


const router = express.Router();

router.get('/mainform', getMainForm);
router.get('/company-categories', validate(companyCategriesSchema, "query"), getCompanyCategories);
router.post('/mainform-submit', validate(createCustomerSchema), handleMainFormSubmission);
router.post('/mainform-update', validate(updateCustomerSchema), handleUpdateMainForm)
router.get('/info-form', validate(infoFormSchema, "query"), getInfoForm);
router.get('/doc-form', getDocForm);
router.post('/info-form-update', validate(updateCustomerInfoSchema), handleUpdateInfoForm);
router.post('/upload-file', uploadFile);
router.get('/get-all-customers', getAllCustomers);
router.get('/get-customerById', validate(customerIdSchema, "query"), getCustomerByID);
router.get('/get-customerInfoById', validate(customerIdSchema, "query"), getCustomerInfoByID);
router.get('/get-customer-files', validate(customerIdSchema, "query"), getCustomerFiles);
router.post('/update-docs-status', validate(updateDocStatusSchema), updateDocumentStatus);
router.get('/get-docs-status',getDocsStatus)
module.exports = router;