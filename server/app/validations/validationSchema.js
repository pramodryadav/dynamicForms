const Joi = require('joi');


const infoFormSchema = Joi.object({
    id: Joi.number().integer().required(),
    category: Joi.string().valid(
        'pvt_ltd',
        'public_ltd',
        'mnc',
        'partnership',
        'propreitorship',
        'govt_semi_govt_enterprise',
        'other'
    ).required(),

});
const updateCustomerInfoSchema = Joi.object({
    id: Joi.number().integer().required(),  // Ensure 'id' is a required integer
    category: Joi.string().valid('pvt_ltd', 'public_ltd', 'mnc', 'partnership', 'propreitorship', 'govt_semi_govt_enterprise', 'other').required(),  // Ensure 'category' is valid
    formData: Joi.object({
    
        // Conditional validation for the 'formData' fields
        gst_no: Joi.string().pattern(/^[0-9]{5,}$/).when('category', { // Example GST validation: minimum 5 digits
            is: 'pvt_ltd',  // If category is 'pvt_ltd', then this field is required
            then: Joi.required(),
            otherwise: Joi.optional()  // If not 'pvt_ltd', this field is optional
        }),
        di_number: Joi.string().pattern(/^[0-9]{5,}$/).when('category', { // DI Number validation: minimum 5 digits
            is: 'pvt_ltd',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        pan_no: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).when('category', { // PAN format: Indian PAN format
            is: 'pvt_ltd',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
        dsc: Joi.string().when('category', {
            is: 'public_ltd',  // If category is not 'pvt_ltd', then 'dsc' is required
            then: Joi.required(),
            otherwise: Joi.optional()  // If category is 'pvt_ltd', 'dsc' is forbidden
        })
    }).required()  // Ensure 'formData' is required
});

const customerIdSchema = Joi.object({
    id: Joi.number().integer().required(),  // Validate 'id' as a required string
});

const updateDocStatusSchema = Joi.object({
    id: Joi.number().integer().required(),  // Validate 'id' as a required string
    status: Joi.string().required(),
});


const companyCategriesSchema = Joi.object({
    groupid: Joi.string().required(),  // Validate 'groupid' as a required string
});

const createCustomerSchema = Joi.object({
    assigned_to: Joi.string().allow(''),
    blacklist: Joi.boolean().required(),
    blocked: Joi.boolean().required(),
    blood_group: Joi.string().allow(''),
    category: Joi.string().valid(
        'pvt_ltd',
        'public_ltd',
        'mnc',
        'partnership',
        'propreitorship',
        'govt_semi_govt_enterprise',
        'other'
    ).required(), // Example categories
    created_by: Joi.string().required(),
    created_on: Joi.date().iso().required(),
    demography: Joi.string().allow(''),
    dob: Joi.date().iso().allow('', null), // ISO date format
    edited_by: Joi.string().required(),
    edited_on: Joi.date().iso().required(),
    email1: Joi.string().email().required(),
    email2: Joi.string().email().allow('', null),
    fax: Joi.string().allow(''),
    full_name: Joi.string().min(1).required(),
    gst: Joi.string().min(5).required(), // Example GST pattern
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(), // Ensure 10 digits
    mobile_others: Joi.string().allow('', null),
    organization: Joi.string().allow(''),
    owner: Joi.string().allow('', 'N/A'),
    pan: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(), // PAN format 
    profile_code: Joi.string().max(10).allow('', null),
    remarks: Joi.string().allow('', null),
    tags: Joi.string().allow('', null),
    website: Joi.string().uri().allow('', null),

});

const updateCustomerSchema = Joi.object({
    assigned_to: Joi.string().allow(''),
    blacklist: Joi.boolean().required(),
    blocked: Joi.boolean().required(),
    blood_group: Joi.string().allow(''),
    category: Joi.string().valid(
        'pvt_ltd',
        'public_ltd',
        'mnc',
        'partnership',
        'propreitorship',
        'govt_semi_govt_enterprise',
        'other'
    ).required(), // Example categories
    demography: Joi.string().allow(''),
    dob: Joi.date().iso().allow('', null), // ISO date format
    edited_by: Joi.string().required(),
    edited_on: Joi.date().iso().required(),
    email1: Joi.string().email().required(),
    email2: Joi.string().email().allow('', null),
    fax: Joi.string().allow(''),
    full_name: Joi.string().min(1).required(),
    gst: Joi.string().min(5).required(), // Example GST pattern
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(), // Ensure 10 digits
    mobile_others: Joi.string().allow('', null),
    organization: Joi.number().integer().required(),
    owner: Joi.string().allow('', 'N/A'),
    pan: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(), // PAN format 
    profile_code: Joi.string().max(10).allow('', null),
    remarks: Joi.string().allow('', null),
    tags: Joi.string().allow('', null),
    website: Joi.string().uri().allow('', null),
    company_id: Joi.number().integer().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    id: Joi.number().integer().required(), // 'id' is required for updates
    type: Joi.string().valid('customer', 'vendor').required(),
    guid: Joi.string().allow('', null),
    groupuid: Joi.string().allow('', null),
    loginid: Joi.string().allow('', null),
    designation: Joi.string().allow('', null),
    department: Joi.string().allow('', null),
    sub_category: Joi.string().allow('', null),
    vendor_type: Joi.string().valid('general', 'specific').allow('', null),
    status: Joi.string().allow('', null),
    phone1: Joi.string().allow('', null),
    phone2: Joi.string().allow('', null),
    nationality: Joi.string().allow('', null),
    zipcode: Joi.string().allow('', null),
    avatar: Joi.string().allow('', null),
    branch: Joi.string().allow('', null),
});

// Validation schema for the upload request
const uploadSchema = Joi.object({
    id: Joi.number().integer().required(), // or Joi.number().integer().required() if ID is a number
    field: Joi.string().required(),
    file: Joi.object().keys({
        filepath: Joi.string().required(),
        originalFilename: Joi.string().required(),
    }).required(),
});

// Middleware for validation
const validate = (schema, target = 'body') => (req, res, next) => {
    console.log("body",req.body);
    
    const { error } = schema.validate(req[target]);
    if (error) {
        return res.status(400).json({ status: "error", message: error.details[0].message });
    }
    next();
};

module.exports = {
    validate,
    customerIdSchema,
    createCustomerSchema,
    companyCategriesSchema,
    updateCustomerSchema,
    infoFormSchema,
    updateCustomerInfoSchema,
    uploadSchema,
    updateDocStatusSchema

}