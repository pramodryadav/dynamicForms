const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const {
    fetchMainForm,
    fetchCompanyCategories,
    insertCustomerData,
    fetchInfoForm,
    fetchDocForm,
    fetchAllCustomers,
    fetchCustomerByID,
    updateCustomerInfo,
    fetchCustomerInfoByID,
    updateCustomerData,
    fetchFilesByCustomerId,
    uploadFileService,
    updateDocStatus,
    fetchDocsStatus
} = require("../services/auditService");

const { uploadSchema } = require("../validations/validationSchema")

const getDocsStatus = async (req, res) => {
    try {

        const docsStatus = await fetchDocsStatus();
        res.status(200).json({ status: "success", data: docsStatus });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
}

const getMainForm = async (req, res) => {

    try {

        const auditForm = await fetchMainForm();
        res.status(200).json({ status: "success", data: auditForm });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
};


const getAllCustomers = async (req, res) => {
    try {

        const result = await fetchAllCustomers();
        res.status(200).json({ status: "success", data: result });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
};

const getCustomerByID = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await fetchCustomerByID(id);
        res.status(200).json({ status: "success", data: result });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { status: "error", message: 'Internal Server Error' });
    }
}


const getCustomerInfoByID = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await fetchCustomerInfoByID(id);
        res.status(200).json({ status: "success", data: result });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { status: "error", message: 'Internal Server Error' });
    }
}



const getInfoForm = async (req, res) => {

    try {

        const { id, category } = req.query;
        const infoForm = await fetchInfoForm(id, category);
        res.status(200).json({ status: "success", data: infoForm });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { status: 'error', message: 'Internal Server Error' });
    }
};

const getDocForm = async (req, res) => {

    try {

        const { id, category } = req.query;
        const docForm = await fetchDocForm(id, category);
        res.status(200).json({ status: "success", data: docForm });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { status: "error", message: 'Internal Server Error' });
    }
};


const getCompanyCategories = async (req, res) => {

    try {
        const { groupid } = req.query;
        const data = await fetchCompanyCategories(groupid);
        res.status(200).json({ status: "success", data: data });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const handleMainFormSubmission = async (req, res) => {
    try {
        const formData = req.body; // Assuming form data is in the request body;

        // Call the service to insert the data
        const result = await insertCustomerData(formData);

        // Send a success response
        res.status(201).json({ status: "success", message: 'Customer data inserted successfully', data: result });
    } catch (error) {
        // Send an error response
        res.status(500).json({ status: "error", message: `Error: ${error.message}` });
    }
};

const handleUpdateMainForm = async (req, res) => {
    try {
        const formData = req.body; // Assuming form data is in the request body;
        // Call the service to insert the data
        const result = await updateCustomerData(formData);

        // Send a success response
        res.status(201).json({ status: "success", message: 'Customer data updated successfully', data: result });
    } catch (error) {
        // Send an error response
        res.status(500).json({ status: "error", message: `Error: ${error.message}` });
    }
};



const handleUpdateInfoForm = async (req, res) => {
    try {
        const { id, category, formData } = req.body; // Assuming data is in the request body
        // Call the service to update the data
        const result = await updateCustomerInfo(id, category, formData);
        // Send a success response
        res.status(200).json(result);
    } catch (error) {
        // Send an error response
        res.status(500).json({ status: "error", message: `Error: ${error.message}` });
    }
};


const updateDocumentStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const result = await updateDocStatus(id, status);
        // Send a success response
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ status: "error", message: `Error: ${error.message}` });
    }
}



const uploadFile = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '..', 'customerdata');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ status: "error", error: err.message });
        }

        const file = files?.file?.[0];
        const id = fields?.id?.[0];
        const field = fields?.field?.[0];
        const { error } = uploadSchema.validate({
            id,
            field,
            file: {
                filepath: files?.file?.[0]?.filepath,
                originalFilename: files?.file?.[0]?.originalFilename,
            },
        });


        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        if (!file || !file.filepath || !file.originalFilename) {
            return res.status(400).json({ error: 'File is required' });
        }

        try {
            const result = await uploadFileService(file, id, field);
            res.status(200).json({ status: "success", data: result });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    });
};





const getCustomerFiles = async (req, res) => {
    try {

        const { id } = req.query;
        const docForm = await fetchFilesByCustomerId(id);
        res.status(200).json({ status: "success", data: docForm });

    } catch (error) {
        // Check if error has a custom status or message
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || 'Internal Server Error';

        res.status(statusCode).json({ status: "error", message: errorMessage });
    }

}



module.exports = {
    getMainForm,
    getCompanyCategories,
    handleMainFormSubmission,
    getInfoForm,
    handleUpdateInfoForm,
    getDocForm,
    uploadFile,
    getAllCustomers,
    getCustomerByID,
    handleUpdateMainForm,
    getCustomerInfoByID,
    getCustomerFiles,
    updateDocumentStatus,
    getDocsStatus
};